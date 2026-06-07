import { MoreHorizontal } from 'lucide-react'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { channelData } from '../../data/dashboard'

export function TrafficChart() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-950">
            Traffic channels
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Sessions by acquisition source
          </p>
        </div>
        <button
          type="button"
          className="text-slate-400 hover:text-slate-700"
          aria-label="Traffic chart options"
        >
          <MoreHorizontal className="size-5" />
        </button>
      </div>
      <div className="mt-7 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={channelData}
            layout="vertical"
            margin={{ top: 0, right: 8, left: 0, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={58}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
            />
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{
                borderRadius: 12,
                borderColor: '#e2e8f0',
                fontSize: 12,
              }}
            />
            <Bar
              dataKey="value"
              fill="#3b82f6"
              radius={[0, 6, 6, 0]}
              barSize={12}
              background={{ fill: '#f1f5f9', radius: 6 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs text-slate-400">Total sessions</p>
          <p className="mt-1 text-lg font-bold text-slate-950">42,810</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
          +14.2%
        </span>
      </div>
    </div>
  )
}
