import { NavLink } from 'react-router-dom'
import { LayoutDashboard, CalendarDays, Users, Wallet, BarChart3 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// Sidebar — barra lateral de la parte privada (administración).
// Cada enlace declara qué roles pueden verlo.

const enlaces = [
  { to: '/dashboard',       label: 'Dashboard', icon: LayoutDashboard, roles: ['administrador', 'recepcionista'] },
  { to: '/admin/reservas',  label: 'Reservas',  icon: CalendarDays,    roles: ['administrador', 'recepcionista'] },
  { to: '/admin/clientes',  label: 'Clientes',  icon: Users,           roles: ['administrador', 'recepcionista'] },
  { to: '/admin/pagos',     label: 'Pagos',     icon: Wallet,          roles: ['administrador', 'recepcionista'] },
  { to: '/admin/reportes',  label: 'Reportes',  icon: BarChart3,       roles: ['administrador'] },
]

export default function Sidebar({ abierto, onCerrar }) {
  const { rol } = useAuth()
  const visibles = enlaces.filter((e) => e.roles.includes(rol))

  const linkClase = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-600 text-white'
        : 'text-slate-600 hover:bg-brand-50 hover:text-brand-700'
    }`

  return (
    <>
      {/* Overlay móvil */}
      {abierto && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 md:hidden"
          onClick={onCerrar}
        />
      )}

      <aside
        className={`fixed z-40 h-[calc(100vh-3.5rem)] w-64 transform border-r border-slate-200 bg-white transition-transform md:static md:h-auto md:translate-x-0 ${
          abierto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-1 p-4">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Administración
          </p>
          {visibles.map((e) => {
            const Icono = e.icon
            return (
              <NavLink key={e.to} to={e.to} className={linkClase} onClick={onCerrar}>
                <Icono size={18} />
                {e.label}
              </NavLink>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
