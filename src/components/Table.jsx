// Tabla reutilizable y responsiva.
// Props:
//  - columns: [{ key, label, render? }]
//  - data: array de filas
//  - rowKey: función que devuelve la clave de cada fila
export default function Table({ columns, data, rowKey = (r) => r.id, emptyText = 'Sin registros.' }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl ring-1 ring-slate-200">
      <table className="min-w-full divide-y divide-slate-200 bg-white text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="whitespace-nowrap px-4 py-3 font-semibold text-slate-600"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-400">
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={rowKey(row)} className="hover:bg-slate-50">
                {columns.map((col) => (
                  <td key={col.key} className="whitespace-nowrap px-4 py-3 text-slate-700">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
