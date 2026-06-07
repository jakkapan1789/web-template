import type { Transaction } from '../types'

export const revenueData = [
  { month: 'Jan', revenue: 28000, target: 24000 },
  { month: 'Feb', revenue: 32000, target: 27000 },
  { month: 'Mar', revenue: 29500, target: 31000 },
  { month: 'Apr', revenue: 41000, target: 34000 },
  { month: 'May', revenue: 38500, target: 37000 },
  { month: 'Jun', revenue: 48000, target: 40000 },
  { month: 'Jul', revenue: 52500, target: 43000 },
  { month: 'Aug', revenue: 49500, target: 46000 },
  { month: 'Sep', revenue: 58000, target: 49000 },
  { month: 'Oct', revenue: 63000, target: 52000 },
  { month: 'Nov', revenue: 60500, target: 55000 },
  { month: 'Dec', revenue: 72000, target: 59000 },
]

export const channelData = [
  { name: 'Direct', value: 46 },
  { name: 'Organic', value: 38 },
  { name: 'Referral', value: 29 },
  { name: 'Social', value: 22 },
  { name: 'Email', value: 17 },
]

export const transactions: Transaction[] = [
  {
    customer: 'Olivia Martin',
    email: 'olivia@northstar.co',
    amount: '$2,499.00',
    status: 'Completed',
    date: 'Jun 6, 2026',
    initials: 'OM',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    customer: 'Jackson Lee',
    email: 'jackson@outline.dev',
    amount: '$1,750.00',
    status: 'Completed',
    date: 'Jun 5, 2026',
    initials: 'JL',
    color: 'bg-sky-100 text-sky-700',
  },
  {
    customer: 'Sophia Brown',
    email: 'sophia@verve.studio',
    amount: '$890.00',
    status: 'Pending',
    date: 'Jun 5, 2026',
    initials: 'SB',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    customer: 'Noah Williams',
    email: 'noah@layerlabs.io',
    amount: '$3,200.00',
    status: 'Completed',
    date: 'Jun 4, 2026',
    initials: 'NW',
    color: 'bg-emerald-100 text-emerald-700',
  },
]
