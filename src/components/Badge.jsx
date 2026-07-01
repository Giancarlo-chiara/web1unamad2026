// Badge de color según el estado de la reserva o pago.
const estilos = {
  pendiente: 'bg-amber-100 text-amber-800',
  'en proceso': 'bg-blue-100 text-blue-800',
  terminado: 'bg-emerald-100 text-emerald-800',
  pagado: 'bg-emerald-100 text-emerald-800',
  default: 'bg-slate-100 text-slate-700',
}

export default function Badge({ estado }) {
  const clave = String(estado).toLowerCase()
  const clase = estilos[clave] ?? estilos.default
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${clase}`}>
      {estado}
    </span>
  )
}
