import { Zap } from 'lucide-react'

export function Logo() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
        <Zap className="size-5 fill-current" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold tracking-tight text-slate-950">
          Web Template
        </p>
        <p className="truncate text-[11px] font-medium text-slate-400">
          React dashboard
        </p>
      </div>
    </div>
  )
}
