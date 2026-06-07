import type { PageDefinition, PageId } from '../types/navigation'

export const pages: Record<PageId, PageDefinition> = {
  overview: {
    id: 'overview',
    title: 'Overview',
    description: 'Monitor your business performance',
  },
  analytics: {
    id: 'analytics',
    title: 'Analytics',
    description: 'Explore performance and audience insights',
  },
  orders: {
    id: 'orders',
    title: 'Orders',
    description: 'Review and manage customer orders',
  },
  products: {
    id: 'products',
    title: 'Products',
    description: 'Manage products and catalog information',
  },
  customers: {
    id: 'customers',
    title: 'Customers',
    description: 'Review customer profiles and activity',
  },
}

export const isPageId = (value: string): value is PageId => value in pages

export const isRouteId = (value: string): value is 'login' | PageId =>
  value === 'login' || isPageId(value)
