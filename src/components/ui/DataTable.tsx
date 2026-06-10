import { useState } from 'react'
import { ChevronLeft, ChevronRight, Download, Eye, Pencil, Trash2 } from 'lucide-react'
import StatusBadge from './StatusBadge'

export interface Column<T> {
  key: keyof T | string
  label: string
  render?: (row: T) => React.ReactNode
  status?: boolean
}

interface DataTableProps<T extends { id: string }> {
  data: T[]
  columns: Column<T>[]
  searchKeys?: (keyof T)[]
  filters?: { key: keyof T; label: string; options: string[] }[]
  pageSize?: number
  showActions?: boolean
}

export default function DataTable<T extends { id: string }>({
  data,
  columns,
  searchKeys = [],
  filters = [],
  pageSize = 8,
  showActions = true,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [filterValues, setFilterValues] = useState<Record<string, string>>({})
  const [page, setPage] = useState(0)

  let filtered = data.filter((row) => {
    const matchSearch =
      !search ||
      searchKeys.some((key) =>
        String(row[key]).toLowerCase().includes(search.toLowerCase())
      )
    const matchFilters = filters.every((f) => {
      const val = filterValues[String(f.key)]
      return !val || String(row[f.key]) === val
    })
    return matchSearch && matchFilters
  })

  const totalPages = Math.ceil(filtered.length / pageSize)
  const paginated = filtered.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <div className="glass-card overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-200/80 p-4 dark:border-slate-700">
        <input
          type="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0) }}
          className="input-field max-w-xs"
        />
        {filters.map((f) => (
          <select
            key={String(f.key)}
            value={filterValues[String(f.key)] || ''}
            onChange={(e) => {
              setFilterValues((v) => ({ ...v, [String(f.key)]: e.target.value }))
              setPage(0)
            }}
            className="select-field"
          >
            <option value="">{f.label}</option>
            {f.options.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        ))}
        <div className="ml-auto flex gap-2">
          <button className="btn-secondary text-xs">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/50">
              {columns.map((col) => (
                <th key={String(col.key)} className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-400">
                  {col.label}
                </th>
              ))}
              {showActions && (
                <th className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-400">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-100 transition hover:bg-primary-50/30 dark:border-slate-800 dark:hover:bg-slate-800/50"
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3 text-slate-700 dark:text-slate-300">
                    {col.render
                      ? col.render(row)
                      : col.status
                      ? <StatusBadge status={String(row[col.key as keyof T])} />
                      : String(row[col.key as keyof T] ?? '')}
                  </td>
                ))}
                {showActions && (
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-primary-600 dark:hover:bg-slate-700">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-primary-600 dark:hover:bg-slate-700">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200/80 px-4 py-3 dark:border-slate-700">
        <p className="text-xs text-slate-500">
          Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, filtered.length)} of {filtered.length}
        </p>
        <div className="flex gap-1">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-40 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-40 dark:hover:bg-slate-800"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
