import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { revenueData } from '../../data/dashboard'

export function RevenueChart() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-950">
            Revenue overview
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Monthly revenue compared with target
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-blue-600" />
            Revenue
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-slate-300" />
            Target
          </span>
        </div>
      </div>
      <div className="mt-5 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueData}
            margin={{ top: 10, right: 5, left: -22, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              formatter={(value) => `$${Number(value).toLocaleString()}`}
              contentStyle={{
                borderRadius: 12,
                borderColor: '#e2e8f0',
                boxShadow: '0 8px 30px rgba(15,23,42,.08)',
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#cbd5e1"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="transparent"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={2.5}
              fill="url(#revenueFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
