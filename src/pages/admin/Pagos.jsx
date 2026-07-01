import { useMemo, useState } from 'react'
import { CheckCircle2, Clock } from 'lucide-react'
import { pagos as pagosMock } from '../../data/mockData'
import { StatCard } from '../../components/Card'
import Table from '../../components/Table'
import Badge from '../../components/Badge'
import Button from '../../components/Button'

// Página PAGOS (/admin/pagos) — registro de pagos de las reservas.
export default function Pagos() {
  const [pagos, setPagos] = useState(pagosMock)

  const totales = useMemo(() => {
    const cobrado = pagos.filter((p) => p.estado === 'pagado').reduce((a, p) => a + p.monto, 0)
    const porCobrar = pagos.filter((p) => p.estado !== 'pagado').reduce((a, p) => a + p.monto, 0)
    return { cobrado, porCobrar }
  }, [pagos])

  // Marca un pago pendiente como pagado.
  const marcarPagado = (id) => {
    setPagos((prev) => prev.map((p) => (p.id === id ? { ...p, estado: 'pagado' } : p)))
  }

  const columns = [
    { key: 'reservaId', label: '# Reserva', render: (p) => `#${p.reservaId}` },
    { key: 'cliente', label: 'Cliente' },
    { key: 'monto', label: 'Monto', render: (p) => `S/ ${p.monto}` },
    { key: 'metodo', label: 'Método' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'estado', label: 'Estado', render: (p) => <Badge estado={p.estado} /> },
    {
      key: 'acciones',
      label: 'Acciones',
      render: (p) =>
        p.estado !== 'pagado' ? (
          <Button size="sm" variant="success" onClick={() => marcarPagado(p.id)}>
            Marcar pagado
          </Button>
        ) : (
          <span className="text-xs text-slate-400">—</span>
        ),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Pagos</h1>
        <p className="text-sm text-slate-500">Registro y estado de los pagos.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Cobrado" value={`S/ ${totales.cobrado}`} icon={<CheckCircle2 size={24} />} accent="emerald" />
        <StatCard label="Por cobrar" value={`S/ ${totales.porCobrar}`} icon={<Clock size={24} />} accent="amber" />
      </div>

      <Table columns={columns} data={pagos} />
    </div>
  )
}
