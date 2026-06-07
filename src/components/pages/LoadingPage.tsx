import { LoaderCircle } from 'lucide-react'
import { Logo } from '../branding/Logo'

export function LoadingPage() {
  return (
    <main
      className="grid min-h-screen place-items-center bg-slate-50 px-4"
      role="status"
      aria-live="polite"
      aria-label="Loading application"
    >
      <div className="flex flex-col items-center">
        <Logo />
        <LoaderCircle className="mt-6 size-6 animate-spin text-blue-600" />
        <p className="mt-3 text-xs font-medium text-slate-500">
          Loading workspace...
        </p>
      </div>
    </main>
  )
}
