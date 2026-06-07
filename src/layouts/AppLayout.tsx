import { useState, type ReactNode } from 'react'
import { Sidebar } from '../components/navigation/Sidebar'
import { usePersistentState } from '../hooks/usePersistentState'
import type { PageId } from '../types/navigation'
import { Header } from './Header'

interface AppLayoutProps {
  children: ReactNode
  currentPage: PageId
  onNavigate: (page: PageId) => void
}

export function AppLayout({
  children,
  currentPage,
  onNavigate,
}: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = usePersistentState(
    'lumina-sidebar-collapsed',
    false,
  )
  const [submenus, setSubmenus] = usePersistentState<Record<string, boolean>>(
    'lumina-sidebar-submenus',
    { commerce: true },
  )
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleSubmenu = (key: string) => {
    setSubmenus((current) => ({ ...current, [key]: !current[key] }))
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        currentPage={currentPage}
        submenus={submenus}
        onCollapse={() => setSidebarCollapsed((value) => !value)}
        onMobileClose={() => setMobileMenuOpen(false)}
        onNavigate={onNavigate}
        onSubmenuToggle={toggleSubmenu}
      />
      <Header
        onMenuOpen={() => setMobileMenuOpen(true)}
      />
      <div
        className={`min-h-screen pt-17 transition-[padding] duration-300 ease-in-out ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
