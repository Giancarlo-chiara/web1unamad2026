# 🚗 CarWash Ingenium

Sistema de gestión para un car wash. **Solo frontend** (React + Vite + TailwindCSS) con datos de prueba (mock) en memoria. No hay backend ni base de datos por ahora.

## Tecnologías
- React 18 + Vite
- React Router 6
- TailwindCSS 3
- Context API (`AuthContext`) para simular sesión y roles

## Cómo correrlo

```bash
npm install
npm run dev
```

Luego abre la URL que muestra Vite (por defecto http://localhost:5173).

## Usuarios de prueba (parte privada)

| Rol            | Usuario     | Contraseña      | Accede a                                  |
|----------------|-------------|-----------------|-------------------------------------------|
| Administrador  | `admin`     | `admin123`      | Todo, incluyendo **Reportes**             |
| Recepcionista  | `recepcion` | `recepcion123`  | Dashboard, Reservas, Clientes, Pagos      |

> El botón "Iniciar sesión con Google" es solo visual. La integración OAuth queda pendiente para el futuro.

## Estructura

```
src/
  context/AuthContext.jsx     Sesión y roles simulados
  data/mockData.js            Datos de prueba (clientes, servicios, reservas, pagos)
  components/                 Navbar, Sidebar, Card, Table, Button, Badge,
                              ProtectedRoute, FormularioReserva, layouts
  pages/                      Páginas públicas (Inicio, Servicios, Reservar, Login)
  pages/admin/               Páginas privadas (Reservas, Clientes, Pagos, Reportes)
```

## Rutas

**Públicas:** `/` · `/servicios` · `/reservar` · `/login`
**Privadas:** `/dashboard` · `/admin/reservas` · `/admin/clientes` · `/admin/pagos` · `/admin/reportes`
