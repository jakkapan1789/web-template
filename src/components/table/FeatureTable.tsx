import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  X,
} from 'lucide-react'

export interface TableColumn {
  label: string
  align?: 'left' | 'right'
  sortable?: boolean
}

interface FeatureTableProps {
  title: string
  description: string
  columns: TableColumn[]
  rows: string[][]
  searchPlaceholder: string
  filterColumn?: number
  filterLabel?: string
  renderCell?: (value: string, columnIndex: number, row: string[]) => ReactNode
}

type SortDirection = 'asc' | 'desc'

function sortableValue(value: string) {
  const trimmedValue = value.trim()
  const parsedDate = /^[A-Z][a-z]{2} \d{1,2}, \d{4}$/.test(trimmedValue)
    ? Date.parse(trimmedValue)
    : Number.NaN

  if (!Number.isNaN(parsedDate)) return parsedDate

  const numericText = trimmedValue.replace(/[^0-9.-]+/g, '')
  if (numericText && /^-?\d+(\.\d+)?$/.test(numericText)) {
    return Number(numericText)
  }

  return trimmedValue.toLowerCase()
}

export function FeatureTable({
  title,
  description,
  columns,
  rows,
  searchPlaceholder,
  filterColumn,
  filterLabel = 'All',
  renderCell,
}: FeatureTableProps) {
  const [query, setQuery] = useState('')
  const [filterValue, setFilterValue] = useState('all')
  const [sortColumn, setSortColumn] = useState(0)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filterOpen, setFilterOpen] = useState(false)
  const [pageSizeOpen, setPageSizeOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)
  const pageSizeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!filterOpen && !pageSizeOpen) return

    const closeDropdowns = (event: PointerEvent) => {
      if (!filterRef.current?.contains(event.target as Node)) {
        setFilterOpen(false)
      }
      if (!pageSizeRef.current?.contains(event.target as Node)) {
        setPageSizeOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeDropdowns)
    return () => document.removeEventListener('pointerdown', closeDropdowns)
  }, [filterOpen, pageSizeOpen])

  const filterOptions = useMemo(() => {
    if (filterColumn === undefined) return []
    return [...new Set(rows.map((row) => row[filterColumn]))].sort()
  }, [filterColumn, rows])

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return rows
      .filter((row) => {
        const matchesSearch =
          !normalizedQuery ||
          row.some((cell) => cell.toLowerCase().includes(normalizedQuery))
        const matchesFilter =
          filterColumn === undefined ||
          filterValue === 'all' ||
          row[filterColumn] === filterValue

        return matchesSearch && matchesFilter
      })
      .sort((first, second) => {
        const firstValue = sortableValue(first[sortColumn])
        const secondValue = sortableValue(second[sortColumn])
        const comparison =
          typeof firstValue === 'number' && typeof secondValue === 'number'
            ? firstValue - secondValue
            : String(firstValue).localeCompare(String(secondValue))

        return sortDirection === 'asc' ? comparison : -comparison
      })
  }, [filterColumn, filterValue, query, rows, sortColumn, sortDirection])

  const pageCount = Math.max(1, Math.ceil(filteredRows.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const pageRows = filteredRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  )
  const firstResult =
    filteredRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const lastResult = Math.min(currentPage * pageSize, filteredRows.length)
  const ghostRowCount = Math.max(0, pageSize - pageRows.length)

  const handleSort = (columnIndex: number) => {
    if (columns[columnIndex].sortable === false) return

    if (sortColumn === columnIndex) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(columnIndex)
      setSortDirection('asc')
    }
    setPage(1)
  }

  const resetFilters = () => {
    setQuery('')
    setFilterValue('all')
    setPage(1)
  }

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 p-3.5 sm:px-4 sm:py-3.5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-950">{title}</h2>
            <p className="mt-0.5 text-[11px] text-slate-400">{description}</p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative min-w-0 sm:w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setPage(1)
                }}
                className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-9 text-xs text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
                placeholder={searchPlaceholder}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setPage(1)
                  }}
                  className="absolute right-2 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-md text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </label>

            {filterColumn !== undefined && (
              <div ref={filterRef} className="relative sm:w-44">
                <button
                  type="button"
                  onClick={() => {
                    setFilterOpen((current) => !current)
                    setPageSizeOpen(false)
                  }}
                  className={`flex h-9 w-full items-center gap-2 rounded-lg border pl-3 pr-2.5 text-left text-xs font-semibold outline-none transition ${
                    filterOpen
                      ? 'border-blue-300 bg-white text-blue-700 ring-4 ring-blue-50'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                  aria-haspopup="listbox"
                  aria-expanded={filterOpen}
                >
                  <Filter
                    className={`size-3.5 shrink-0 ${
                      filterValue !== 'all' ? 'text-blue-600' : 'text-slate-400'
                    }`}
                  />
                  <span className="min-w-0 flex-1 truncate">
                    {filterValue === 'all' ? filterLabel : filterValue}
                  </span>
                  <ChevronDown
                    className={`size-3.5 shrink-0 text-slate-400 transition-transform ${
                      filterOpen ? 'rotate-180 text-blue-500' : ''
                    }`}
                  />
                </button>

                {filterOpen && (
                  <div
                    role="listbox"
                    aria-label={filterLabel}
                    className="absolute right-0 top-10 z-30 min-w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-[0_12px_32px_-10px_rgba(15,23,42,0.28)]"
                  >
                    {[
                      { value: 'all', label: filterLabel },
                      ...filterOptions.map((option) => ({
                        value: option,
                        label: option,
                      })),
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        role="option"
                        aria-selected={filterValue === option.value}
                        onClick={() => {
                          setFilterValue(option.value)
                          setPage(1)
                          setFilterOpen(false)
                        }}
                        className={`flex h-8 w-full items-center justify-between gap-3 rounded-lg px-2.5 text-left text-[11px] font-semibold transition ${
                          filterValue === option.value
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span className="truncate">{option.label}</span>
                        {filterValue === option.value && (
                          <span className="size-1.5 shrink-0 rounded-full bg-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="h-9 border-b border-slate-100 bg-slate-50/60 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {columns.map((column, columnIndex) => {
                const activeSort = sortColumn === columnIndex
                const SortIcon = activeSort
                  ? sortDirection === 'asc'
                    ? ArrowUp
                    : ArrowDown
                  : ArrowUpDown

                return (
                  <th
                    key={column.label}
                    className={`h-9 px-4 py-0 align-middle ${
                      column.align === 'right' ? 'text-right' : ''
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSort(columnIndex)}
                      disabled={column.sortable === false}
                      className={`inline-flex items-center gap-1.5 ${
                        column.align === 'right' ? 'ml-auto' : ''
                      } ${
                        column.sortable === false
                          ? 'cursor-default'
                          : 'transition hover:text-slate-700'
                      } ${activeSort ? 'text-blue-600' : ''}`}
                    >
                      {column.label}
                      {column.sortable !== false && (
                        <SortIcon className="size-3" />
                      )}
                    </button>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, rowIndex) => (
              <tr
                key={`${row[0]}-${rowIndex}`}
                className="h-10 border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                style={{ height: 40 }}
              >
                {row.map((cell, columnIndex) => (
                  <td
                    key={`${cell}-${columnIndex}`}
                    className={`h-10 max-h-10 overflow-hidden px-4 py-0 align-middle text-xs font-medium leading-none text-slate-700 ${
                      columns[columnIndex].align === 'right' ? 'text-right' : ''
                    }`}
                    style={{ height: 40, maxHeight: 40 }}
                  >
                    <div className="flex h-10 items-center overflow-hidden">
                      {renderCell
                        ? renderCell(cell, columnIndex, row)
                        : cell}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            {Array.from({ length: ghostRowCount }, (_, index) => (
              <tr
                key={`ghost-row-${index}`}
                aria-hidden="true"
                className="h-10 border-b border-slate-100 last:border-0"
                style={{ height: 40 }}
              >
                {columns.map((column, columnIndex) => (
                  <td
                    key={`${column.label}-${columnIndex}`}
                    className="h-10 max-h-10 overflow-hidden px-4 py-0 align-middle"
                    style={{ height: 40, maxHeight: 40 }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {pageRows.length === 0 && (
          <div
            className="absolute left-0 top-9 grid min-w-[720px] place-items-center bg-white/95 px-6 text-center"
            style={{ width: '100%', height: pageSize * 40 }}
          >
            <div>
              <span className="mx-auto grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-400">
                <Search className="size-5" />
              </span>
              <p className="mt-3 text-sm font-semibold text-slate-700">
                No records found
              </p>
              <p className="mt-1 text-xs text-slate-400">
                No results match your current search or filter.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 h-8 rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700"
              >
                Clear search and filters
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2.5 border-t border-slate-100 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span>Rows per page</span>
          <div ref={pageSizeRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setPageSizeOpen((current) => !current)
                setFilterOpen(false)
              }}
              className={`flex h-8 min-w-16 items-center justify-between gap-2 rounded-lg border py-0 pl-3 pr-2.5 text-[11px] font-bold outline-none transition ${
                pageSizeOpen
                  ? 'border-blue-300 bg-white text-blue-700 ring-4 ring-blue-50'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white'
              }`}
              aria-label="Rows per page"
              aria-haspopup="listbox"
              aria-expanded={pageSizeOpen}
            >
              {pageSize}
              <ChevronDown
                className={`size-3.5 text-slate-400 transition-transform ${
                  pageSizeOpen ? 'rotate-180 text-blue-500' : ''
                }`}
              />
            </button>

            {pageSizeOpen && (
              <div
                role="listbox"
                aria-label="Rows per page"
                className="absolute bottom-10 left-0 z-30 min-w-20 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-[0_12px_32px_-10px_rgba(15,23,42,0.28)]"
              >
                {[10, 25, 50].map((size) => (
                  <button
                    key={size}
                    type="button"
                    role="option"
                    aria-selected={pageSize === size}
                    onClick={() => {
                      setPageSize(size)
                      setPage(1)
                      setPageSizeOpen(false)
                    }}
                    className={`flex h-7 w-full items-center justify-between gap-3 rounded-lg px-2.5 text-[11px] font-semibold transition ${
                      pageSize === size
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {size}
                    {pageSize === size && (
                      <span className="size-1.5 rounded-full bg-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="hidden sm:inline">
            Showing {firstResult}-{lastResult} of {filteredRows.length}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 sm:justify-end">
          <span className="text-[11px] font-medium text-slate-500">
            Page {currentPage} of {pageCount}
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={currentPage === 1}
              className="grid size-7 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </button>
            {Array.from({ length: pageCount }, (_, index) => index + 1)
              .slice(
                Math.max(0, currentPage - 2),
                Math.min(pageCount, currentPage + 1),
              )
              .map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={`grid size-7 place-items-center rounded-lg text-[11px] font-semibold transition ${
                    currentPage === pageNumber
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            <button
              type="button"
              onClick={() =>
                setPage((current) => Math.min(pageCount, current + 1))
              }
              disabled={currentPage === pageCount}
              className="grid size-7 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
