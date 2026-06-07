import { CommerceListPage } from './CommerceListPage'

export function ProductsPage() {
  return (
    <CommerceListPage
      title="Products"
      description="Manage products and catalog information."
      actionLabel="Add product"
      columns={['Product', 'Category', 'Price', 'Stock']}
      filterColumn={1}
      filterLabel="All categories"
      rows={[
        ['Wireless Headphones', 'Electronics', '$129.00', '84'],
        ['Minimal Desk Lamp', 'Home', '$79.00', '42'],
        ['Everyday Backpack', 'Accessories', '$98.00', '67'],
        ['Mechanical Keyboard', 'Electronics', '$149.00', '25'],
        ['Portable Speaker', 'Electronics', '$89.00', '53'],
        ['Linen Throw Pillow', 'Home', '$42.00', '91'],
        ['Leather Card Holder', 'Accessories', '$55.00', '38'],
        ['Standing Desk Mat', 'Office', '$68.00', '46'],
        ['USB-C Charging Hub', 'Electronics', '$72.00', '114'],
        ['Ceramic Coffee Set', 'Home', '$64.00', '32'],
        ['Canvas Weekend Bag', 'Accessories', '$118.00', '19'],
        ['Ergonomic Footrest', 'Office', '$49.00', '61'],
      ]}
    />
  )
}
