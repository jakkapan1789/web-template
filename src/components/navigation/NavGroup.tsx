import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { Icon } from '../../types'
import type { PageId, SubmenuItem } from '../../types/navigation'

interface NavGroupProps {
  icon: Icon
  label: string
  collapsed: boolean
  open: boolean
  activePage: PageId
  items: SubmenuItem[]
  onToggle: () => void
  onNavigate: (page: PageId) => void
}

export function NavGroup({
  icon: Icon,
  label,
  collapsed,
  open,
  activePage,
  items,
  onToggle,
  onNavigate,
}: NavGroupProps) {
  const groupActive = items.some((item) => item.id === activePage)
  const [flyoutOpen, setFlyoutOpen] = useState(false)
  const [flyoutTop, setFlyoutTop] = useState(0)
  const flyoutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!flyoutOpen) return

    const closeFlyout = (event: PointerEvent) => {
      if (!flyoutRef.current?.contains(event.target as Node)) {
        setFlyoutOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeFlyout)
    return () => document.removeEventListener('pointerdown', closeFlyout)
  }, [flyoutOpen])

  const handleGroupClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (collapsed) {
      const rect = event.currentTarget.getBoundingClientRect()
      const flyoutHeight = 12 + items.length * 44
      const centeredTop = rect.top + rect.height / 2 - flyoutHeight / 2
      setFlyoutTop(
        Math.max(
          12,
          Math.min(
            centeredTop,
            window.innerHeight - flyoutHeight - 12,
          ),
        ),
      )
      setFlyoutOpen((value) => !value)
      return
    }

    setFlyoutOpen(false)
    onToggle()
  }

  return (
    <div ref={flyoutRef}>
      <button
        type="button"
        title={collapsed ? label : undefined}
        onClick={handleGroupClick}
        aria-expanded={collapsed ? flyoutOpen : open}
        aria-haspopup={collapsed ? 'menu' : undefined}
        className={`group relative flex h-10 items-center overflow-hidden rounded-xl text-sm font-medium transition-all duration-300 ease-in-out ${
          collapsed ? 'mx-auto w-11 px-3.5' : 'w-full px-3'
        } ${
          groupActive || flyoutOpen
            ? 'bg-blue-50 text-blue-700'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
        }`}
      >
        <Icon
          className={`size-4 shrink-0 ${
            groupActive || flyoutOpen
              ? 'text-blue-600'
              : 'text-slate-400 group-hover:text-slate-600'
          }`}
        />
        <span
          className={`truncate transition-[max-width,margin,opacity] duration-200 ease-in-out ${
            collapsed
              ? 'ml-0 max-w-0 opacity-0'
              : 'ml-3 max-w-40 opacity-100 delay-100'
          }`}
        >
          {label}
        </span>
        <ChevronDown
          className={`ml-auto size-4 shrink-0 text-slate-400 transition-[max-width,opacity,transform] duration-200 ${
            collapsed
              ? 'max-w-0 opacity-0'
              : 'max-w-4 opacity-100 delay-100'
          } ${open ? 'rotate-180' : ''}`}
        />
        <ChevronRight
          className={`absolute right-0.5 size-2.5 transition-opacity duration-150 ${
            collapsed ? 'opacity-100 delay-150' : 'opacity-0'
          } ${
            groupActive || flyoutOpen
              ? 'text-blue-500'
              : 'text-slate-400'
          }`}
        />
      </button>

      {collapsed && flyoutOpen && (
        <div
          role="menu"
          aria-label={`${label} submenu`}
          className="fixed left-20 z-50 ml-3 w-56 rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.28)]"
          style={{ top: flyoutTop }}
        >
          <span className="absolute -left-1.5 top-1/2 size-3 -translate-y-1/2 rotate-45 border-b border-l border-slate-200/80 bg-white" />

          <div className="space-y-1">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                onClick={() => {
                  onNavigate(item.id)
                  setFlyoutOpen(false)
                }}
                aria-current={activePage === item.id ? 'page' : undefined}
                className={`group/item relative flex h-10 w-full items-center rounded-xl px-3 text-left text-[13px] font-medium transition ${
                  activePage === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                {activePage === item.id && (
                  <span className="absolute left-0 h-5 w-0.5 rounded-r-full bg-blue-600" />
                )}
                <span>{item.label}</span>
                <span
                  className={`ml-auto size-1.5 rounded-full transition ${
                    activePage === item.id
                      ? 'bg-blue-600'
                      : 'bg-slate-300 group-hover/item:bg-slate-400'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {!collapsed && open && (
        <div>
          <div className="ml-5 mt-1 space-y-1 border-l border-slate-200 pl-5">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={activePage === item.id ? 'page' : undefined}
                className={`block h-8 w-full rounded-lg px-2 text-left text-[13px] font-medium transition ${
                  activePage === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-blue-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
