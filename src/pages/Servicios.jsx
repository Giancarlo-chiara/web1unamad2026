import { Link } from 'react-router-dom'
import { SprayCan } from 'lucide-react'
import { servicios } from '../data/mockData'
import Card from '../components/Card'
import Button from '../components/Button'

// Página SERVICIOS (/servicios) — catálogo público con precios.
export default function Servicios() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800">Servicios y precios</h1>
        <p className="mt-2 text-slate-500">
          Elige el servicio que tu vehículo necesita. Precios en soles (S/).
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {servicios.map((s) => (
          <Card key={s.id} className="flex flex-col">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <SprayCan size={24} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">{s.nombre}</h3>
            <p className="mt-1 flex-1 text-sm text-slate-500">{s.descripcion}</p>
            <p className="mt-3 text-xs text-slate-400">Duración aprox. {s.duracion}</p>
            <p className="mt-2 text-3xl font-bold text-brand-700">S/ {s.precio}</p>
            <Link to="/reservar" className="mt-4">
              <Button className="w-full">Reservar este servicio</Button>
            </Link>
          </Card>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-brand-50 px-6 py-8 text-center">
        <h2 className="text-xl font-bold text-slate-800">¿Necesitas varios servicios?</h2>
        <p className="mt-1 text-slate-500">
          Combínalos al reservar y te mostramos el total automáticamente.
        </p>
        <Link to="/reservar" className="mt-4 inline-block">
          <Button size="lg">Ir a reservar</Button>
        </Link>
      </div>
    </div>
  )
}
