import { Activity, ArrowUpRight, Download, Eye, MousePointerClick, Users } from 'lucide-react'
import { MetricCard } from '../dashboard/MetricCard'
import { RevenueChart } from '../dashboard/RevenueChart'
import { TrafficChart } from '../dashboard/TrafficChart'

export function AnalyticsPage() {
  return (
    <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Performance</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Explore performance and audience insights.
          </p>
        </div>
        <button
          type="button"
          className="flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
        >
          <Download className="size-4" />
          Export analytics
        </button>
      </div>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Page views" value="128.4K" change="14.2%" positive icon={Eye} tint="bg-blue-50 text-blue-600" />
        <MetricCard label="Unique visitors" value="42,810" change="9.8%" positive icon={Users} tint="bg-sky-50 text-sky-600" />
        <MetricCard label="Interactions" value="18,492" change="7.4%" positive icon={MousePointerClick} tint="bg-cyan-50 text-cyan-600" />
        <MetricCard label="Bounce rate" value="32.8%" change="2.1%" positive icon={Activity} tint="bg-slate-100 text-slate-600" />
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]">
        <RevenueChart />
        <TrafficChart />
      </section>

      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
        <ArrowUpRight className="size-4" />
        Traffic increased 14.2% compared with the previous period.
      </div>
    </main>
  )
}
