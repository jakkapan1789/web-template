import {
  Activity,
  CreditCard,
  Download,
  ShoppingBag,
  Users,
} from 'lucide-react'
import { MetricCard } from './MetricCard'
import { RevenueChart } from './RevenueChart'
import { TrafficChart } from './TrafficChart'
import { TransactionsTable } from './TransactionsTable'

export function Dashboard() {
  return (
    <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Sunday, June 7</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Good morning, Alex
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here’s what’s happening with your business today.
          </p>
        </div>
        <button
          type="button"
          className="flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
        >
          <Download className="size-4" />
          Export report
        </button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total revenue"
          value="$84,298"
          change="12.5%"
          positive
          icon={CreditCard}
          tint="bg-blue-50 text-blue-600"
        />
        <MetricCard
          label="New customers"
          value="1,429"
          change="8.2%"
          positive
          icon={Users}
          tint="bg-sky-50 text-sky-600"
        />
        <MetricCard
          label="Total orders"
          value="3,782"
          change="4.1%"
          positive
          icon={ShoppingBag}
          tint="bg-cyan-50 text-cyan-600"
        />
        <MetricCard
          label="Conversion rate"
          value="3.24%"
          change="1.8%"
          positive={false}
          icon={Activity}
          tint="bg-slate-100 text-slate-600"
        />
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]">
        <RevenueChart />
        <TrafficChart />
      </section>

      <TransactionsTable />
    </main>
  )
}
