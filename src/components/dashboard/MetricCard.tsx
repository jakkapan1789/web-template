import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import type { Icon } from '../../types'

interface MetricCardProps {
  label: string
  value: string
  change: string
  positive: boolean
  icon: Icon
  tint: string
}

export function MetricCard({
  label,
  value,
  change,
  positive,
  icon: Icon,
  tint,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
        </div>
        <div className={`grid size-10 place-items-center rounded-xl ${tint}`}>
          <Icon className="size-[18px]" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs">
        <span
          className={`flex items-center gap-0.5 font-semibold ${
            positive ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          {positive ? (
            <ArrowUpRight className="size-3.5" />
          ) : (
            <ArrowDownRight className="size-3.5" />
          )}
          {change}
        </span>
        <span className="text-slate-400">from last month</span>
      </div>
    </div>
  )
}
