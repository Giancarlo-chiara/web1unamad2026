import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Car, Menu, LogOut } from 'lucide-react'
import Sidebar from './Sidebar'
import { useAuth } from '../context/AuthContext'

// ============================================================
// Layout de la parte privada: Navbar superior + Sidebar lateral.
// Responsivo: en móvil el sidebar se abre con el botón ☰.
// ============================================================
export default function AdminLayout() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false)
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  const cerrarSesion = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar superior */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4">
        <div className="flex items-center gap-3">
          <button
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            onClick={() => setSidebarAbierto((v) => !v)}
            aria-label="Abrir menú lateral"
          >
            <Menu size={22} />
          </button>
          <span className="flex items-center gap-2 font-bold text-slate-800">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
              <Car size={18} />
            </span>
            CarWash <span className="text-brand-600">Ingenium</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold leading-tight text-slate-700">{usuario?.nombre}</p>
            <p className="text-xs capitalize text-slate-400">{usuario?.rol}</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700">
            {usuario?.nombre?.charAt(0)}
          </div>
          <button
            onClick={cerrarSesion}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            <LogOut size={16} /> Salir
          </button>
        </div>
      </header>

      {/* Cuerpo: sidebar + contenido */}
      <div className="flex">
        <Sidebar abierto={sidebarAbierto} onCerrar={() => setSidebarAbierto(false)} />
        <main className="min-h-[calc(100vh-3.5rem)] flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
