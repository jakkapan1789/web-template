import { Plus } from 'lucide-react'
import { FeatureTable } from '../table/FeatureTable'

interface CommerceListPageProps {
  title: string
  description: string
  actionLabel: string
  columns: string[]
  rows: string[][]
  filterColumn?: number
  filterLabel?: string
}

export function CommerceListPage({
  title,
  description,
  actionLabel,
  columns,
  rows,
  filterColumn,
  filterLabel,
}: CommerceListPageProps) {
  return (
    <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Commerce</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
        <button
          type="button"
          className="flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
        >
          <Plus className="size-4" />
          {actionLabel}
        </button>
      </div>

      <FeatureTable
        title={`All ${title.toLowerCase()}`}
        description={`${rows.length} total records`}
        columns={columns.map((label, index) => ({
          label,
          align:
            index === columns.length - 1 && title === 'Customers'
              ? 'right'
              : 'left',
        }))}
        rows={rows}
        searchPlaceholder={`Search ${title.toLowerCase()}...`}
        filterColumn={filterColumn}
        filterLabel={filterLabel}
      />
    </main>
  )
}
