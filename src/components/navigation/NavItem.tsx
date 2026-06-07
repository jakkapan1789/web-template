import type { Icon } from '../../types'
import type { PageId } from '../../types/navigation'

interface NavItemProps {
  icon: Icon
  label: string
  collapsed: boolean
  page?: PageId
  active?: boolean
  badge?: string
  onClick?: () => void
}

export function NavItem({
  icon: Icon,
  label,
  active,
  collapsed,
  page,
  badge,
  onClick,
}: NavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={collapsed ? label : undefined}
      aria-current={active && page ? 'page' : undefined}
      className={`group flex h-10 items-center overflow-hidden rounded-xl text-sm font-medium transition-all duration-300 ease-in-out ${
        collapsed ? 'mx-auto w-11 px-3.5' : 'w-full px-3'
      } ${
        active
          ? 'bg-blue-50 text-blue-700'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
      }`}
    >
      <Icon
        className={`size-4 shrink-0 ${
          active
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
      {!collapsed && badge && (
        <span className="ml-auto rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
          {badge}
        </span>
      )}
    </button>
  )
}
