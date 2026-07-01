import { useState } from 'react'
import { Trash2, Plus } from 'lucide-react'
import { clientes as clientesMock } from '../../data/mockData'
import Card from '../../components/Card'
import Table from '../../components/Table'
import Button from '../../components/Button'

// Página CLIENTES (/admin/clientes) — tabla de clientes + alta simple.
export default function Clientes() {
  const [clientes, setClientes] = useState(clientesMock)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [form, setForm] = useState({ nombres: '', apellidos: '', telefono: '', email: '', placa: '' })

  const cambiar = (campo) => (e) => setForm((f) => ({ ...f, [campo]: e.target.value }))

  const guardar = (e) => {
    e.preventDefault()
    const nuevoId = Math.max(0, ...clientes.map((c) => c.id)) + 1
    setClientes((prev) => [...prev, { id: nuevoId, vehiculo: '', ...form }])
    setForm({ nombres: '', apellidos: '', telefono: '', email: '', placa: '' })
    setMostrarForm(false)
  }

  const eliminar = (id) => {
    if (confirm('¿Eliminar este cliente?')) {
      setClientes((prev) => prev.filter((c) => c.id !== id))
    }
  }

  const columns = [
    { key: 'nombres', label: 'Nombres' },
    { key: 'apellidos', label: 'Apellidos' },
    { key: 'telefono', label: 'Teléfono' },
    { key: 'email', label: 'Email' },
    { key: 'placa', label: 'Placa', render: (c) => <span className="font-mono">{c.placa}</span> },
    {
      key: 'acciones',
      label: 'Acciones',
      render: (c) => (
        <button onClick={() => eliminar(c.id)} className="rounded-md p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600" title="Eliminar"><Trash2 size={16} /></button>
      ),
    },
  ]

  const inputClase =
    'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500'

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Clientes</h1>
          <p className="text-sm text-slate-500">Directorio de clientes registrados.</p>
        </div>
        {!mostrarForm && <Button onClick={() => setMostrarForm(true)}><Plus size={16} /> Nuevo cliente</Button>}
      </div>

      {mostrarForm && (
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Nuevo cliente</h2>
          <form onSubmit={guardar} className="grid gap-4 sm:grid-cols-2">
            <input className={inputClase} placeholder="Nombres" value={form.nombres} onChange={cambiar('nombres')} required />
            <input className={inputClase} placeholder="Apellidos" value={form.apellidos} onChange={cambiar('apellidos')} required />
            <input className={inputClase} placeholder="Teléfono" value={form.telefono} onChange={cambiar('telefono')} required />
            <input className={inputClase} type="email" placeholder="Email" value={form.email} onChange={cambiar('email')} required />
            <input className={inputClase} placeholder="Placa (ABC-123)" value={form.placa} onChange={(e) => setForm((f) => ({ ...f, placa: e.target.value.toUpperCase() }))} />
            <div className="flex gap-3 sm:col-span-2">
              <Button type="submit">Guardar cliente</Button>
              <Button type="button" variant="secondary" onClick={() => setMostrarForm(false)}>Cancelar</Button>
            </div>
          </form>
        </Card>
      )}

      <Table columns={columns} data={clientes} />
    </div>
  )
}
