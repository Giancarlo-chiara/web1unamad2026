// Tarjeta contenedora reutilizable.
export default function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 ${className}`}>
      {children}
    </div>
  )
}

// Tarjeta de métrica para el dashboard.
export function StatCard({ label, value, icon, accent = 'brand' }) {
  const accents = {
    brand: 'bg-brand-50 text-brand-700',
    amber: 'bg-amber-50 text-amber-700',
    emerald: 'bg-emerald-50 text-emerald-700',
  }
  return (
    <Card className="flex items-center gap-4">
      <div className={`flex h-12 w-12 items-center justify-center rounded-lg text-2xl ${accents[accent]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </Card>
  )
}
