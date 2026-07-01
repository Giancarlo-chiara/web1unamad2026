import Card from '../components/Card'
import FormularioReserva from '../components/FormularioReserva'

// Página RESERVAR (/reservar) — formulario público para clientes.
export default function Reservar() {
  const handleReserva = (datos) => {
    // Sin backend: solo mostramos en consola para la demo.
    console.log('Nueva reserva (demo):', datos)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800">Reserva en línea</h1>
        <p className="mt-2 text-slate-500">
          Completa tus datos, elige tus servicios y agenda tu cita.
        </p>
      </div>

      <Card className="mt-8">
        <FormularioReserva modo="publico" onSubmit={handleReserva} />
      </Card>
    </div>
  )
}
