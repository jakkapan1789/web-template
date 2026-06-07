import type { ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'

export type Icon = ComponentType<LucideProps>

export interface Transaction {
  customer: string
  email: string
  amount: string
  status: 'Completed' | 'Pending'
  date: string
  initials: string
  color: string
}
