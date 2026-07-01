import { useMemo } from 'react'
import { Wallet, CalendarDays, CheckCircle2 } from 'lucide-react'
import { reservas, servicios } from '../../data/mockData'
import Card, { StatCard } from '../../components/Card'
import Table from '../../components/Table'

// Página REPORTES (/admin/reportes) — reporte de ingresos. Solo administrador.
export default function Reportes() {
  // Ingresos por servicio (según las reservas del mock).
  const porServicio = useMemo(() => {
    return servicios.map((s) => {
      const relacionadas = reservas.filter((r) => r.servicios.includes(s.id))
      const total = relacionadas.length * s.precio
      return { id: s.id, nombre: s.nombre, cantidad: relacionadas.length, precio: s.precio, total }
    })
  }, [])

  const ingresoTotal = useMemo(
    () => reservas.reduce((a, r) => a + r.total, 0),
    []
  )
  const maxTotal = Math.max(...porServicio.map((s) => s.total), 1)

  // Distribución por estado.
  const porEstado = useMemo(() => {
    const acc = {}
    reservas.forEach((r) => { acc[r.estado] = (acc[r.estado] ?? 0) + 1 })
    return acc
  }, [])

  const columns = [
    { key: 'nombre', label: 'Servicio' },
    { key: 'cantidad', label: 'Reservas' },
    { key: 'precio', label: 'Precio', render: (s) => `S/ ${s.precio}` },
    { key: 'total', label: 'Ingreso', render: (s) => <span className="font-semibold text-brand-700">S/ {s.total}</span> },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Reportes de ingresos</h1>
        <p className="text-sm text-slate-500">Análisis basado en las reservas registradas.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Ingreso total" value={`S/ ${ingresoTotal}`} icon={<Wallet size={24} />} accent="emerald" />
        <StatCard label="Total reservas" value={reservas.length} icon={<CalendarDays size={24} />} accent="brand" />
        <StatCard label="Terminadas" value={porEstado['terminado'] ?? 0} icon={<CheckCircle2 size={24} />} accent="emerald" />
      </div>

      {/* Gráfico de barras simple (ingreso por servicio) */}
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Ingresos por servicio</h2>
        <div className="space-y-3">
          {porServicio.map((s) => (
            <div key={s.id}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-slate-600">{s.nombre}</span>
                <span className="font-semibold text-slate-700">S/ {s.total}</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-brand-600"
                  style={{ width: `${(s.total / maxTotal) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tabla detalle */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-800">Detalle por servicio</h2>
        <Table columns={columns} data={porServicio} rowKey={(s) => s.id} />
      </div>
    </div>
  )
}
