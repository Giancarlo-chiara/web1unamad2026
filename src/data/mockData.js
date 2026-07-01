// Todo vive en arrays en memoria. No hay backend ni base de datos.

// Usuarios del personal (para simular el login)

export const usuarios = [
  {
    id: 1,
    usuario: 'admin',
    password: 'admin123',
    nombre: 'Giancarlo Chiara Quispe',
    rol: 'administrador',
  },
  {
    id: 2,
    usuario: 'recepcion',
    password: 'recepcion123',
    nombre: 'María Huamán',
    rol: 'recepcionista',
  },
]

// Servicios ofrecidos
export const servicios = [
  { id: 1, nombre: 'Lavado completo', precio: 25, descripcion: 'Exterior e interior, secado y brillo.', duracion: '40 min' },
  { id: 2, nombre: 'Encerado', precio: 20, descripcion: 'Cera protectora de carrocería.', duracion: '30 min' },
  { id: 3, nombre: 'Aspirado', precio: 15, descripcion: 'Aspirado profundo de tapices y alfombras.', duracion: '20 min' },
  { id: 4, nombre: 'Lavado de motor', precio: 30, descripcion: 'Limpieza y desengrase del motor.', duracion: '35 min' },
]

// Clientes
export const clientes = [
  { id: 1, nombres: 'Juan', apellidos: 'Pérez Rojas', telefono: '987654321', email: 'juan.perez@gmail.com', vehiculo: 'Toyota Corolla', placa: 'ABC-123' },
  { id: 2, nombres: 'Rosa', apellidos: 'Flores Mamani', telefono: '912345678', email: 'rosa.flores@gmail.com', vehiculo: 'Kia Rio', placa: 'DEF-456' },
  { id: 3, nombres: 'Miguel', apellidos: 'Torres Quispe', telefono: '998877665', email: 'miguel.torres@hotmail.com', vehiculo: 'Hyundai Accent', placa: 'GHI-789' },
  { id: 4, nombres: 'Lucía', apellidos: 'Ramírez Ccama', telefono: '955443322', email: 'lucia.ramirez@gmail.com', vehiculo: 'Nissan Versa', placa: 'JKL-012' },
  { id: 5, nombres: 'Pedro', apellidos: 'Vargas Huanca', telefono: '944556677', email: 'pedro.vargas@gmail.com', vehiculo: 'Volkswagen Gol', placa: 'MNO-345' },
  { id: 6, nombres: 'Carmen', apellidos: 'Sánchez Apaza', telefono: '933221100', email: 'carmen.sanchez@outlook.com', vehiculo: 'Chevrolet Sail', placa: 'PQR-678' },
]

// Reservas (8 de ejemplo, con distintos estados)
// Estados posibles: 'pendiente' | 'en proceso' | 'terminado'
export const reservas = [
  { id: 1, clienteId: 1, cliente: 'Juan Pérez Rojas',      placa: 'ABC-123', servicios: [1],    servicioNombre: 'Lavado completo',              fecha: '2026-06-30', hora: '08:00', estado: 'terminado',  total: 25 },
  { id: 2, clienteId: 2, cliente: 'Rosa Flores Mamani',    placa: 'DEF-456', servicios: [1, 2], servicioNombre: 'Lavado completo, Encerado',    fecha: '2026-06-30', hora: '08:40', estado: 'terminado',  total: 45 },
  { id: 3, clienteId: 3, cliente: 'Miguel Torres Quispe',  placa: 'GHI-789', servicios: [3],    servicioNombre: 'Aspirado',                     fecha: '2026-06-30', hora: '09:20', estado: 'en proceso', total: 15 },
  { id: 4, clienteId: 4, cliente: 'Lucía Ramírez Ccama',   placa: 'JKL-012', servicios: [4],    servicioNombre: 'Lavado de motor',              fecha: '2026-06-30', hora: '10:00', estado: 'en proceso', total: 30 },
  { id: 5, clienteId: 5, cliente: 'Pedro Vargas Huanca',   placa: 'MNO-345', servicios: [1, 3], servicioNombre: 'Lavado completo, Aspirado',    fecha: '2026-06-30', hora: '10:40', estado: 'pendiente',  total: 40 },
  { id: 6, clienteId: 6, cliente: 'Carmen Sánchez Apaza',  placa: 'PQR-678', servicios: [2],    servicioNombre: 'Encerado',                     fecha: '2026-06-30', hora: '11:20', estado: 'pendiente',  total: 20 },
  { id: 7, clienteId: 1, cliente: 'Juan Pérez Rojas',      placa: 'ABC-123', servicios: [4],    servicioNombre: 'Lavado de motor',              fecha: '2026-06-30', hora: '12:00', estado: 'pendiente',  total: 30 },
  { id: 8, clienteId: 3, cliente: 'Miguel Torres Quispe',  placa: 'GHI-789', servicios: [1],    servicioNombre: 'Lavado completo',              fecha: '2026-06-30', hora: '12:40', estado: 'terminado',  total: 25 },
]

// Pagos
export const pagos = [
  { id: 1, reservaId: 1, cliente: 'Juan Pérez Rojas',     monto: 25, metodo: 'Efectivo', fecha: '2026-06-30', estado: 'pagado' },
  { id: 2, reservaId: 2, cliente: 'Rosa Flores Mamani',   monto: 45, metodo: 'Yape',     fecha: '2026-06-30', estado: 'pagado' },
  { id: 3, reservaId: 8, cliente: 'Miguel Torres Quispe', monto: 25, metodo: 'Tarjeta',  fecha: '2026-06-30', estado: 'pagado' },
  { id: 4, reservaId: 3, cliente: 'Miguel Torres Quispe', monto: 15, metodo: 'Efectivo', fecha: '2026-06-30', estado: 'pendiente' },
  { id: 5, reservaId: 4, cliente: 'Lucía Ramírez Ccama',  monto: 30, metodo: 'Plin',     fecha: '2026-06-30', estado: 'pendiente' },
]

// Métricas del dashboard
export const metricas = {
  reservasHoy: 8,
  pendientes: 3,
  ingresosHoy: 210,
}
