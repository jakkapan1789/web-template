export type PageId =
  | 'overview'
  | 'analytics'
  | 'orders'
  | 'products'
  | 'customers'
export type RouteId = 'login' | PageId

export interface PageDefinition {
  id: PageId
  title: string
  description: string
}

export interface SubmenuItem {
  id: PageId
  label: string
}
