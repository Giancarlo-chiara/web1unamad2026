import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

// Layout de las páginas públicas: Navbar público + contenido + footer.
export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} CarWash Ingenium · Puerto Maldonado, Perú · Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}
