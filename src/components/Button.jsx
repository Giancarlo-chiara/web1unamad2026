// Botón reutilizable con variantes de color.
const variantes = {
  primary: 'bg-brand-600 hover:bg-brand-700 text-white',
  secondary: 'bg-white hover:bg-slate-100 text-brand-700 border border-brand-600',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  ghost: 'bg-transparent hover:bg-slate-100 text-slate-700',
  success: 'bg-emerald-600 hover:bg-emerald-700 text-white',
}

const tamanos = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ${variantes[variant]} ${tamanos[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
