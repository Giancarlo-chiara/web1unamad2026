import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Lock, ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'

// Página LOGIN (/login) — inicio de sesión del personal (mock).
export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const destino = location.state?.from?.pathname || '/dashboard'

  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const res = login({ usuario, password })
    if (res.ok) {
      navigate(destino, { replace: true })
    } else {
      setError(res.error)
    }
  }

  const inputClase =
    'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500'

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
            <Lock size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Acceso del personal</h1>
          <p className="mt-1 text-sm text-slate-500">Ingresa con tu usuario y contraseña.</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Usuario</label>
            <input
              className={inputClase}
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="admin"
              autoFocus
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Contraseña</label>
            <input
              type="password"
              className={inputClase}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="submit" size="lg" className="w-full">Ingresar</Button>
        </form>

        {/* Separador */}
        <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          o
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        {/*
          Botón visual "Iniciar sesión con Google" para clientes.
          A FUTURO: aquí se integrará el OAuth de Google. Por ahora es solo visual.
        */}
        <button
          type="button"
          onClick={() => alert('Inicio de sesión con Google — próximamente (OAuth pendiente).')}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/>
            <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"/>
          </svg>
          Iniciar sesión con Google
        </button>
        <p className="mt-2 text-center text-xs text-slate-400">
          (Para clientes — función disponible próximamente)
        </p>

        {/* Credenciales de prueba */}
        <div className="mt-6 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
          <p className="font-semibold text-slate-600">Usuarios de prueba:</p>
          <p className="mt-1">Administrador → <code>admin</code> / <code>admin123</code></p>
          <p>Recepcionista → <code>recepcion</code> / <code>recepcion123</code></p>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-brand-600 hover:underline">
            <ArrowLeft size={14} /> Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
