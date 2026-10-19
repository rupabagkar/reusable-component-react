import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import './DataTable.css'

export type Column<T> = {
  key: keyof T & string
  header: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  render?: (value: T[keyof T], row: T) => ReactNode
}

export type DataTableProps<T> = {
  data: T[]
  columns: Column<T>[]
  rowKey: keyof T & string
  title?: string
  searchable?: boolean
  pageSize?: number
  emptyMessage?: string
  onRowClick?: (row: T) => void
}

type SortState<T> = { key: keyof T & string; direction: 'asc' | 'desc' } | null

function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0
  if (a == null) return -1
  if (b == null) return 1
  if (typeof a === 'number' && typeof b === 'number') return a - b
  if (typeof a === 'boolean' && typeof b === 'boolean') return Number(a) - Number(b)
  return String(a).localeCompare(String(b), undefined, { numeric: true })
}

export function DataTable<T extends object>({
  data,
  columns,
  rowKey,
  title,
  searchable = true,
  pageSize = 5,
  emptyMessage = 'No records found',
  onRowClick,
}: DataTableProps<T>) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortState<T>>(null)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return data
    return data.filter((row) =>
      columns.some((col) => String(row[col.key] ?? '').toLowerCase().includes(q)),
    )
  }, [data, columns, query])

  const sorted = useMemo(() => {
    if (!sort) return filtered
    const factor = sort.direction === 'asc' ? 1 : -1
    return [...filtered].sort((a, b) => compareValues(a[sort.key], b[sort.key]) * factor)
  }, [filtered, sort])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageRows = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const toggleSort = (key: keyof T & string) => {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, direction: 'asc' }
      if (prev.direction === 'asc') return { key, direction: 'desc' }
      return null
    })
  }

  const sortIndicator = (key: string) => {
    if (sort?.key !== key) return '↕'
    return sort.direction === 'asc' ? '▲' : '▼'
  }

  return (
    <div className="data-table">
      {(title || searchable) && (
        <div className="data-table__toolbar">
          {title && <h2 className="data-table__title">{title}</h2>}
          {searchable && (
            <input
              type="search"
              className="data-table__search"
              placeholder="Search..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setPage(1)
              }}
              aria-label="Search table"
            />
          )}
        </div>
      )}

      <div className="data-table__wrapper">
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ textAlign: col.align ?? 'left' }}
                  className={col.sortable ? 'sortable' : undefined}
                  onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                  aria-sort={
                    sort?.key === col.key
                      ? sort.direction === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                >
                  {col.header}
                  {col.sortable && <span className="sort-icon">{sortIndicator(col.key)}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="data-table__empty">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pageRows.map((row) => (
                <tr
                  key={String(row[rowKey])}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={onRowClick ? 'clickable' : undefined}
                >
                  {columns.map((col) => (
                    <td key={col.key} style={{ textAlign: col.align ?? 'left' }}>
                      {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="data-table__footer">
        <span>
          Showing {pageRows.length} of {sorted.length} record(s)
        </span>
        <div className="data-table__pagination">
          <button type="button" onClick={() => setPage(currentPage - 1)} disabled={currentPage <= 1}>
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default DataTable
