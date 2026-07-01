import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// ProtectedRoute — protege rutas privadas.
//  - Si no hay sesión -> redirige a /login.
//  - Si se pasa `roles`, valida que el rol del usuario esté permitido;
//    si no lo está -> redirige al /dashboard.
export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, rol } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // Guardamos de dónde venía para (a futuro) poder regresar tras el login.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (roles && !roles.includes(rol)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
