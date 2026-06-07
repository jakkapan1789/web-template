import { ChevronLeft, X } from 'lucide-react'
import type { PageId } from '../../types/navigation'
import { SidebarContent } from './SidebarContent'

interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  currentPage: PageId
  submenus: Record<string, boolean>
  onCollapse: () => void
  onMobileClose: () => void
  onNavigate: (page: PageId) => void
  onSubmenuToggle: (key: string) => void
}

export function Sidebar({
  collapsed,
  mobileOpen,
  currentPage,
  submenus,
  onCollapse,
  onMobileClose,
  onNavigate,
  onSubmenuToggle,
}: SidebarProps) {
  return (
    <>
      <aside
        className={`fixed bottom-0 left-0 top-17 z-40 hidden border-r border-slate-200 bg-white transition-[width] duration-300 ease-in-out lg:flex lg:flex-col ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <SidebarContent
          collapsed={collapsed}
          currentPage={currentPage}
          submenus={submenus}
          onNavigate={onNavigate}
          onSubmenuToggle={onSubmenuToggle}
        />
        <button
          type="button"
          onClick={onCollapse}
          className="absolute -right-3 top-5 grid size-6 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:text-blue-600"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft
            className={`size-3 transition-transform duration-300 ease-in-out ${
              collapsed ? 'rotate-180' : ''
            }`}
          />
        </button>
      </aside>

      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-x-0 bottom-0 top-17 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
          aria-label="Close navigation"
        />
      )}
      <aside
        className={`fixed bottom-0 left-0 top-17 z-50 flex w-72 flex-col bg-white shadow-2xl transition-transform lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          type="button"
          onClick={onMobileClose}
          className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
          aria-label="Close navigation"
        >
          <X className="size-5" />
        </button>
        <SidebarContent
          collapsed={false}
          currentPage={currentPage}
          submenus={submenus}
          onNavigate={(page) => {
            onNavigate(page)
            onMobileClose()
          }}
          onSubmenuToggle={onSubmenuToggle}
        />
      </aside>
    </>
  )
}
