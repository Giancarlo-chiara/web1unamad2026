import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { reservas as reservasMock, servicios } from '../../data/mockData'
import Card from '../../components/Card'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import FormularioReserva from '../../components/FormularioReserva'

// Nombres de servicios a partir de sus IDs.
const nombresServicios = (ids) =>
  servicios
    .filter((s) => ids.includes(s.id))
    .map((s) => s.nombre)
    .join(', ')

// Página GESTIÓN DE RESERVAS (/admin/reservas) — crear / editar reservas.
export default function Reservas() {
  const location = useLocation()
  const [reservas, setReservas] = useState(reservasMock)
  // Si llegamos desde el dashboard con state.editar, abrimos esa reserva.
  const [editando, setEditando] = useState(
    () => reservasMock.find((r) => r.id === location.state?.editar) ?? null
  )
  const [mostrarForm, setMostrarForm] = useState(Boolean(location.state?.editar))

  const guardar = (datos) => {
    const conNombre = { ...datos, servicioNombre: nombresServicios(datos.servicios) }
    if (datos.id) {
      // Editar existente
      setReservas((prev) => prev.map((r) => (r.id === datos.id ? { ...r, ...conNombre } : r)))
    } else {
      // Crear nueva
      const nuevoId = Math.max(0, ...reservas.map((r) => r.id)) + 1
      setReservas((prev) => [...prev, { ...conNombre, id: nuevoId }])
    }
    cerrarForm()
  }

  const cerrarForm = () => {
    setEditando(null)
    setMostrarForm(false)
  }

  const abrirNueva = () => {
    setEditando(null)
    setMostrarForm(true)
  }

  const abrirEditar = (reserva) => {
    setEditando(reserva)
    setMostrarForm(true)
  }

  const eliminar = (id) => {
    if (confirm('¿Eliminar esta reserva?')) {
      setReservas((prev) => prev.filter((r) => r.id !== id))
    }
  }

  const columns = [
    { key: 'cliente', label: 'Cliente' },
    { key: 'placa', label: 'Placa', render: (r) => <span className="font-mono">{r.placa}</span> },
    { key: 'servicioNombre', label: 'Servicios' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'hora', label: 'Hora' },
    { key: 'total', label: 'Total', render: (r) => `S/ ${r.total}` },
    { key: 'estado', label: 'Estado', render: (r) => <Badge estado={r.estado} /> },
    {
      key: 'acciones',
      label: 'Acciones',
      render: (r) => (
        <div className="flex gap-2">
          <button onClick={() => abrirEditar(r)} className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-brand-600" title="Editar"><Pencil size={16} /></button>
          <button onClick={() => eliminar(r.id)} className="rounded-md p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600" title="Eliminar"><Trash2 size={16} /></button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestión de reservas</h1>
          <p className="text-sm text-slate-500">Crea, edita o elimina reservas.</p>
        </div>
        {!mostrarForm && <Button onClick={abrirNueva}><Plus size={16} /> Nueva reserva</Button>}
      </div>

      {mostrarForm && (
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            {editando ? 'Editar reserva' : 'Nueva reserva'}
          </h2>
          <FormularioReserva
            modo="admin"
            valorInicial={editando}
            onSubmit={guardar}
            onCancel={cerrarForm}
          />
        </Card>
      )}

      <Table columns={columns} data={reservas} />
    </div>
  )
}
