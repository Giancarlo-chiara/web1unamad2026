import { createContext, useContext, useState } from 'react'
import { usuarios } from '../data/mockData'

// AuthContext — simula la sesión y el rol del usuario.
// No hay backend: se valida contra el array `usuarios` del mock.

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // usuario = null  -> invitado (cliente sin sesión)
  const [usuario, setUsuario] = useState(null)

  // Intenta iniciar sesión con usuario/contraseña de prueba.
  // Devuelve { ok: boolean, error?: string }
  const login = ({ usuario: user, password }) => {
    const encontrado = usuarios.find(
      (u) => u.usuario === user && u.password === password
    )
    if (!encontrado) {
      return { ok: false, error: 'Usuario o contraseña incorrectos.' }
    }
    // No guardamos la contraseña en el estado de sesión.
    const { password: _omit, ...datos } = encontrado
    setUsuario(datos)
    return { ok: true }
  }

  const logout = () => setUsuario(null)

  // Helpers de rol
  const isAuthenticated = Boolean(usuario)
  const rol = usuario?.rol ?? null

  const value = {
    usuario,
    rol,
    isAuthenticated,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook de conveniencia
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return ctx
}
