import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import PublicLayout from './components/PublicLayout'
import AdminLayout from './components/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'

// Páginas públicas
import Inicio from './pages/Inicio'
import Servicios from './pages/Servicios'
import Reservar from './pages/Reservar'
import Login from './pages/Login'

// Páginas privadas
import Dashboard from './pages/Dashboard'
import Reservas from './pages/admin/Reservas'
import Clientes from './pages/admin/Clientes'
import Pagos from './pages/admin/Pagos'
import Reportes from './pages/admin/Reportes'

export default function App() {
  return (
    <Routes>
      {/* ---------- Rutas públicas ---------- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/reservar" element={<Reservar />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* ---------- Rutas privadas (personal) ---------- */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/reservas" element={<Reservas />} />
        <Route path="/admin/clientes" element={<Clientes />} />
        <Route path="/admin/pagos" element={<Pagos />} />
        {/* Reportes: solo administrador */}
        <Route
          path="/admin/reportes"
          element={
            <ProtectedRoute roles={['administrador']}>
              <Reportes />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Cualquier otra ruta -> inicio */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
