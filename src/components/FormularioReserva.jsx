import { useMemo, useState } from 'react'
import { servicios as serviciosMock, clientes as clientesMock } from '../data/mockData'
import Button from './Button'

// ============================================================
// FormularioReserva — componente reutilizable.
//
// Props:
//  - modo: 'publico' | 'admin'
//      publico -> el cliente escribe sus datos (nombre, teléfono, placa)
//      admin   -> se elige un cliente existente del mock
//  - valorInicial: reserva a editar (opcional, solo modo admin)
//  - onSubmit: callback(datosReserva) al enviar
//  - onCancel: callback opcional (modo admin)
// ============================================================
export default function FormularioReserva({ modo = 'publico', valorInicial = null, onSubmit, onCancel }) {
  const esAdmin = modo === 'admin'

  const [clienteId, setClienteId] = useState(valorInicial?.clienteId ?? '')
  const [nombre, setNombre] = useState(valorInicial?.cliente ?? '')
  const [telefono, setTelefono] = useState('')
  const [placa, setPlaca] = useState(valorInicial?.placa ?? '')
  const [fecha, setFecha] = useState(valorInicial?.fecha ?? '')
  const [hora, setHora] = useState(valorInicial?.hora ?? '')
  const [seleccionados, setSeleccionados] = useState(valorInicial?.servicios ?? [])
  const [enviado, setEnviado] = useState(false)

  const toggleServicio = (id) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  // Total calculado automáticamente según los servicios marcados.
  const total = useMemo(
    () =>
      serviciosMock
        .filter((s) => seleccionados.includes(s.id))
        .reduce((acc, s) => acc + s.precio, 0),
    [seleccionados]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (seleccionados.length === 0) return

    const clienteSel = clientesMock.find((c) => c.id === Number(clienteId))
    const datos = {
      id: valorInicial?.id,
      clienteId: esAdmin ? Number(clienteId) : null,
      cliente: esAdmin
        ? clienteSel
          ? `${clienteSel.nombres} ${clienteSel.apellidos}`
          : ''
        : nombre,
      telefono: esAdmin ? clienteSel?.telefono : telefono,
      placa: esAdmin ? clienteSel?.placa ?? placa : placa,
      fecha,
      hora,
      servicios: seleccionados,
      total,
      estado: valorInicial?.estado ?? 'pendiente',
    }

    onSubmit?.(datos)
    setEnviado(true)
    if (!esAdmin) {
      // Limpiamos el formulario público tras reservar.
      setNombre(''); setTelefono(''); setPlaca(''); setFecha(''); setHora(''); setSeleccionados([])
    }
  }

  const inputClase =
    'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500'
  const labelClase = 'mb-1 block text-sm font-medium text-slate-700'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Datos del cliente */}
      <div className="grid gap-4 sm:grid-cols-2">
        {esAdmin ? (
          <div className="sm:col-span-2">
            <label className={labelClase}>Cliente</label>
            <select
              className={inputClase}
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
              required
            >
              <option value="">Selecciona un cliente…</option>
              {clientesMock.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombres} {c.apellidos} — {c.placa}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <>
            <div>
              <label className={labelClase}>Nombre completo</label>
              <input
                className={inputClase}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Juan Pérez"
                required
              />
            </div>
            <div>
              <label className={labelClase}>Teléfono</label>
              <input
                className={inputClase}
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="987654321"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClase}>Placa del vehículo</label>
              <input
                className={inputClase}
                value={placa}
                onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                placeholder="ABC-123"
                required
              />
            </div>
          </>
        )}

        <div>
          <label className={labelClase}>Fecha</label>
          <input type="date" className={inputClase} value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        </div>
        <div>
          <label className={labelClase}>Hora</label>
          <input type="time" className={inputClase} value={hora} onChange={(e) => setHora(e.target.value)} required />
        </div>
      </div>

      {/* Servicios con checkboxes y precios */}
      <div>
        <label className={labelClase}>Servicios</label>
        <div className="grid gap-2 sm:grid-cols-2">
          {serviciosMock.map((s) => {
            const activo = seleccionados.includes(s.id)
            return (
              <label
                key={s.id}
                className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2.5 transition-colors ${
                  activo ? 'border-brand-500 bg-brand-50' : 'border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={activo}
                    onChange={() => toggleServicio(s.id)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  {s.nombre}
                </span>
                <span className="text-sm font-semibold text-brand-700">S/ {s.precio}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between rounded-lg bg-slate-100 px-4 py-3">
        <span className="text-sm font-medium text-slate-600">Total a pagar</span>
        <span className="text-xl font-bold text-brand-700">S/ {total}</span>
      </div>

      {/* Mensaje de confirmación (modo público) */}
      {enviado && !esAdmin && (
        <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          ¡Reserva registrada! Nos comunicaremos contigo para confirmar. (Demo sin backend)
        </div>
      )}

      {/* Acciones */}
      <div className="flex gap-3">
        <Button type="submit" size="lg" className="flex-1" disabled={seleccionados.length === 0}>
          {esAdmin ? (valorInicial ? 'Guardar cambios' : 'Crear reserva') : 'Reservar ahora'}
        </Button>
        {esAdmin && onCancel && (
          <Button type="button" variant="secondary" size="lg" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  )
}
