import { Link } from 'react-router-dom'
import { Car, Zap, Droplets, CalendarDays } from 'lucide-react'
import { servicios } from '../data/mockData'
import Card from '../components/Card'
import Button from '../components/Button'

// Página INICIO (/) — landing del negocio.
export default function Inicio() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-900 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-sm">
              Puerto Maldonado · Perú
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
              Tu auto reluciente en manos expertas
            </h1>
            <p className="mt-4 text-lg text-brand-100">
              En <strong>CarWash Ingenium</strong> combinamos rapidez, cuidado y
              productos de calidad para que tu vehículo luzca como nuevo. Reserva
              en línea y evita las colas.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/reservar">
                <Button size="lg" variant="secondary">Reservar ahora</Button>
              </Link>
              <Link to="/servicios">
                <Button size="lg" className="bg-white/15 hover:bg-white/25">Ver servicios</Button>
              </Link>
            </div>
          </div>
          <div className="hidden justify-center md:flex">
            <div className="flex h-64 w-64 items-center justify-center rounded-full bg-white/10">
              <Car size={140} strokeWidth={1.25} className="text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-2xl font-bold text-slate-800">¿Por qué elegirnos?</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            { icon: Zap, titulo: 'Rápido', texto: 'Servicios ágiles sin sacrificar la calidad del acabado.' },
            { icon: Droplets, titulo: 'Cuidado', texto: 'Productos que protegen la pintura y el interior de tu auto.' },
            { icon: CalendarDays, titulo: 'Reserva fácil', texto: 'Agenda tu cita en línea y llega a la hora exacta.' },
          ].map((b) => {
            const Icono = b.icon
            return (
              <Card key={b.titulo} className="text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icono size={28} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">{b.titulo}</h3>
                <p className="mt-1 text-sm text-slate-500">{b.texto}</p>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Servicios destacados */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Nuestros servicios</h2>
            <Link to="/servicios" className="text-sm font-medium text-brand-600 hover:underline">
              Ver todos →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {servicios.map((s) => (
              <Card key={s.id}>
                <h3 className="font-semibold text-slate-800">{s.nombre}</h3>
                <p className="mt-1 text-sm text-slate-500">{s.descripcion}</p>
                <p className="mt-3 text-2xl font-bold text-brand-700">S/ {s.precio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-2xl bg-brand-600 px-6 py-10 text-center text-white">
          <h2 className="text-2xl font-bold">¿Listo para dejar tu auto impecable?</h2>
          <p className="mt-2 text-brand-100">Reserva tu cita en menos de un minuto.</p>
          <div className="mt-5 flex justify-center gap-3">
            <Link to="/reservar">
              <Button size="lg" variant="secondary">Reservar</Button>
            </Link>
            <Link to="/login">
              <Button size="lg" className="bg-brand-800 hover:bg-brand-900">Soy personal</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
