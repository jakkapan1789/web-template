import {
  Activity,
  LayoutDashboard,
  ShoppingBag,
} from 'lucide-react'
import type { PageId } from '../../types/navigation'
import { NavGroup } from './NavGroup'
import { NavItem } from './NavItem'

interface SidebarContentProps {
  collapsed: boolean
  currentPage: PageId
  submenus: Record<string, boolean>
  onNavigate: (page: PageId) => void
  onSubmenuToggle: (key: string) => void
}

export function SidebarContent({
  collapsed,
  currentPage,
  submenus,
  onNavigate,
  onSubmenuToggle,
}: SidebarContentProps) {
  const navigate = (page: PageId) => {
    onNavigate(page)
  }

  return (
    <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {!collapsed && (
          <p className="mb-2 px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Workspace
          </p>
        )}
        <NavItem
          icon={LayoutDashboard}
          label="Overview"
          page="overview"
          active={currentPage === 'overview'}
          collapsed={collapsed}
          onClick={() => navigate('overview')}
        />
        <NavItem
          icon={Activity}
          label="Analytics"
          page="analytics"
          active={currentPage === 'analytics'}
          collapsed={collapsed}
          onClick={() => navigate('analytics')}
        />
        <NavGroup
          icon={ShoppingBag}
          label="Commerce"
          collapsed={collapsed}
          open={submenus.commerce}
          activePage={currentPage}
          onToggle={() => onSubmenuToggle('commerce')}
          onNavigate={navigate}
          items={[
            { id: 'orders', label: 'Orders' },
            { id: 'products', label: 'Products' },
            { id: 'customers', label: 'Customers' },
          ]}
        />
    </nav>
  )
}
