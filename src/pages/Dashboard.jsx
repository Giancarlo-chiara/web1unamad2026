import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Clock, Wallet, Pencil, Trash2, Search, Plus } from 'lucide-react'
import { reservas as reservasMock, metricas } from '../data/mockData'
import { StatCard } from '../components/Card'
import Table from '../components/Table'
import Badge from '../components/Badge'
import Button from '../components/Button'

// Página DASHBOARD (/dashboard) — panel con métricas y tabla de reservas.
export default function Dashboard() {
  const [reservas, setReservas] = useState(reservasMock)
  const [busqueda, setBusqueda] = useState('')

  // Filtro por placa o cliente.
  const filtradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    if (!q) return reservas
    return reservas.filter(
      (r) =>
        r.placa.toLowerCase().includes(q) ||
        r.cliente.toLowerCase().includes(q)
    )
  }, [reservas, busqueda])

  const eliminar = (id) => {
    if (confirm('¿Eliminar esta reserva?')) {
      setReservas((prev) => prev.filter((r) => r.id !== id))
    }
  }

  const columns = [
    { key: 'cliente', label: 'Cliente' },
    { key: 'placa', label: 'Vehículo (placa)', render: (r) => <span className="font-mono">{r.placa}</span> },
    { key: 'servicioNombre', label: 'Servicio' },
    { key: 'hora', label: 'Hora' },
    { key: 'estado', label: 'Estado', render: (r) => <Badge estado={r.estado} /> },
    {
      key: 'acciones',
      label: 'Acciones',
      render: (r) => (
        <div className="flex gap-2">
          <Link
            to="/admin/reservas"
            state={{ editar: r.id }}
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-brand-600"
            title="Editar"
          >
            <Pencil size={16} />
          </Link>
          <button
            onClick={() => eliminar(r.id)}
            className="rounded-md p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
            title="Eliminar"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500">Resumen del día de hoy.</p>
        </div>
        <Link to="/admin/reservas">
          <Button><Plus size={16} /> Nueva reserva</Button>
        </Link>
      </div>

      {/* Métricas */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Reservas del día" value={metricas.reservasHoy} icon={<CalendarDays size={24} />} accent="brand" />
        <StatCard label="Pendientes" value={metricas.pendientes} icon={<Clock size={24} />} accent="amber" />
        <StatCard label="Ingresos del día" value={`S/ ${metricas.ingresosHoy}`} icon={<Wallet size={24} />} accent="emerald" />
      </div>

      {/* Tabla de reservas */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-800">Reservas de hoy</h2>
          <div className="relative w-full sm:w-72">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="Buscar por placa o cliente…"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>
        <Table columns={columns} data={filtradas} emptyText="No se encontraron reservas." />
      </div>
    </div>
  )
}
