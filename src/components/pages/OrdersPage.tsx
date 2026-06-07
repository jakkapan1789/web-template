import { MoreHorizontal, Plus } from 'lucide-react'
import { FeatureTable } from '../table/FeatureTable'

const orders = [
  ['#ORD-1048', 'Olivia Martin', 'Paid', 'Jun 7, 2026', '$2,499.00', 'actions'],
  ['#ORD-1047', 'Jackson Lee', 'Paid', 'Jun 6, 2026', '$1,750.00', 'actions'],
  ['#ORD-1046', 'Sophia Brown', 'Pending', 'Jun 5, 2026', '$890.00', 'actions'],
  ['#ORD-1045', 'Noah Williams', 'Paid', 'Jun 4, 2026', '$3,200.00', 'actions'],
  ['#ORD-1044', 'Emma Davis', 'Refunded', 'Jun 3, 2026', '$420.00', 'actions'],
  ['#ORD-1043', 'Liam Wilson', 'Pending', 'Jun 2, 2026', '$1,190.00', 'actions'],
  ['#ORD-1042', 'Ava Thompson', 'Paid', 'Jun 1, 2026', '$4,280.00', 'actions'],
  ['#ORD-1041', 'Ethan Moore', 'Cancelled', 'May 31, 2026', '$760.00', 'actions'],
  ['#ORD-1040', 'Mia Anderson', 'Paid', 'May 30, 2026', '$2,150.00', 'actions'],
  ['#ORD-1039', 'Lucas Taylor', 'Pending', 'May 29, 2026', '$980.00', 'actions'],
  ['#ORD-1038', 'Isabella Clark', 'Paid', 'May 28, 2026', '$3,640.00', 'actions'],
  ['#ORD-1037', 'Mason Lewis', 'Refunded', 'May 27, 2026', '$540.00', 'actions'],
]

const statusStyles: Record<string, string> = {
  Paid: 'bg-emerald-50 text-emerald-700',
  Pending: 'bg-amber-50 text-amber-700',
  Refunded: 'bg-blue-50 text-blue-700',
  Cancelled: 'bg-rose-50 text-rose-700',
}

export function OrdersPage() {
  return (
    <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Commerce</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Orders
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Review and manage customer orders.
          </p>
        </div>
        <button
          type="button"
          className="flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
        >
          <Plus className="size-4" />
          Create order
        </button>
      </div>

      <FeatureTable
        title="All orders"
        description={`${orders.length} total orders`}
        columns={[
          { label: 'Order' },
          { label: 'Customer' },
          { label: 'Status' },
          { label: 'Date' },
          { label: 'Total', align: 'right' },
          { label: '', align: 'right', sortable: false },
        ]}
        rows={orders}
        searchPlaceholder="Search orders or customers..."
        filterColumn={2}
        filterLabel="All statuses"
        renderCell={(value, columnIndex, row) => {
          if (columnIndex === 0) {
            return <span className="font-semibold text-blue-600">{value}</span>
          }

          if (columnIndex === 2) {
            return (
              <span
                className={`inline-flex h-5 items-center rounded-full px-2 text-[10px] font-semibold leading-none ${statusStyles[value]}`}
              >
                {value}
              </span>
            )
          }

          if (columnIndex === 5) {
            return (
              <button
                type="button"
                className="ml-auto grid size-7 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label={`Actions for ${row[0]}`}
              >
                <MoreHorizontal className="size-4" />
              </button>
            )
          }

          return value
        }}
      />
    </main>
  )
}
