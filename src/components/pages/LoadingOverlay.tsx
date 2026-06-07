import { LoaderCircle } from 'lucide-react'

export function LoadingOverlay() {
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-white/45 backdrop-blur-[1px]"
      role="status"
      aria-live="polite"
      aria-label="Processing"
    >
      <div className="grid size-14 place-items-center rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
        <LoaderCircle className="size-6 animate-spin text-blue-600" />
      </div>
    </div>
  )
}
