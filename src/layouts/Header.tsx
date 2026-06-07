import { useEffect, useRef, useState } from 'react'
import {
  Building2,
  ChevronDown,
  LogOut,
  Mail,
  Menu,
  Settings,
  UserRound,
} from 'lucide-react'
import { Logo } from '../components/branding/Logo'

interface HeaderProps {
  onMenuOpen: () => void
}

export function Header({ onMenuOpen }: HeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!profileOpen) return

    const closeProfileMenu = (event: PointerEvent) => {
      if (!profileRef.current?.contains(event.target as Node)) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeProfileMenu)
    return () => document.removeEventListener('pointerdown', closeProfileMenu)
  }, [profileOpen])

  const handleLogout = () => {
    setProfileOpen(false)
    window.dispatchEvent(new CustomEvent('app:logout'))
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-17 items-center border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="flex h-full items-center gap-2 px-4 sm:px-5 lg:w-64">
        <button
          type="button"
          onClick={onMenuOpen}
          className="grid size-10 shrink-0 place-items-center rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </button>
        <Logo />
      </div>

      <div ref={profileRef} className="relative ml-auto mr-4 sm:mr-6 lg:mr-8">
        <button
          type="button"
          onClick={() => setProfileOpen((value) => !value)}
          className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-100"
          aria-expanded={profileOpen}
          aria-haspopup="menu"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-xs font-bold text-white">
            AK
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-xs font-semibold text-slate-900">
              Alex Kim
            </span>
            <span className="block text-[10px] text-slate-400">
              Administrator
            </span>
          </span>
          <ChevronDown
            className={`hidden size-4 text-slate-400 transition-transform sm:block ${
              profileOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {profileOpen && (
          <div
            role="menu"
            aria-label="Profile menu"
            className="absolute right-0 top-12 w-[min(21rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.28)]"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-5 pb-5 pt-6 text-white">
              <div
                className="absolute -right-10 -top-12 size-36 rounded-full border border-white/10 bg-white/5"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-12 right-12 size-24 rounded-full bg-cyan-400/10 blur-xl"
                aria-hidden="true"
              />
              <div className="relative flex items-center gap-3.5">
                <div className="relative shrink-0">
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 text-sm font-bold shadow-lg shadow-blue-950/40 ring-1 ring-white/20">
                    AK
                  </span>
                  <span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-blue-900 bg-emerald-400" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-bold">Alex Kim</p>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-blue-100">
                      Admin
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-blue-200">
                    System Administrator
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[10px] font-medium text-emerald-300">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    Active now
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                  <Building2 className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Department
                  </p>
                  <p className="mt-0.5 truncate text-xs font-semibold text-slate-700">
                    Information Technology
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-cyan-50 text-cyan-600">
                  <Mail className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Email
                  </p>
                  <p className="mt-0.5 truncate text-xs font-semibold text-slate-700">
                    alex.kim@example.com
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3">
              <button
                type="button"
                role="menuitem"
                onClick={() => setProfileOpen(false)}
                className="flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-50 px-3 text-xs font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                <UserRound className="size-3.5" />
                View profile
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => setProfileOpen(false)}
                className="flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-50 px-3 text-xs font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                <Settings className="size-3.5" />
                Settings
              </button>
            </div>

            <div className="border-t border-slate-100 p-2">
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex h-9 w-full items-center gap-2 rounded-xl px-3 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
              >
                <LogOut className="size-3.5" />
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
