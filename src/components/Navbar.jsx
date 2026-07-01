import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Car, Menu, X } from 'lucide-react'

// ============================================================
// Navbar público — visible en las páginas públicas.
// Responsivo: menú hamburguesa en móvil.
// ============================================================
const enlaces = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/servicios', label: 'Servicios' },
  { to: '/reservar', label: 'Reservar' },
]

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)

  const linkClase = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-brand-700 hover:bg-slate-100'
    }`

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Car size={20} />
          </span>
          <span className="text-lg font-bold text-slate-800">
            CarWash <span className="text-brand-600">Ingenium</span>
          </span>
        </Link>

        {/* Enlaces desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {enlaces.map((e) => (
            <NavLink key={e.to} to={e.to} end={e.end} className={linkClase}>
              {e.label}
            </NavLink>
          ))}
          <Link
            to="/login"
            className="ml-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            Iniciar sesión
          </Link>
        </div>

        {/* Botón hamburguesa móvil */}
        <button
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          onClick={() => setAbierto((v) => !v)}
          aria-label="Abrir menú"
        >
          {abierto ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Menú móvil desplegable */}
      {abierto && (
        <div className="border-t border-slate-200 bg-white px-4 py-2 md:hidden">
          <div className="flex flex-col gap-1">
            {enlaces.map((e) => (
              <NavLink
                key={e.to}
                to={e.to}
                end={e.end}
                className={linkClase}
                onClick={() => setAbierto(false)}
              >
                {e.label}
              </NavLink>
            ))}
            <Link
              to="/login"
              onClick={() => setAbierto(false)}
              className="mt-1 rounded-lg bg-brand-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-brand-700"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
