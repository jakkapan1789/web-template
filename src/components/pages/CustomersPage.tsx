import { CommerceListPage } from './CommerceListPage'

export function CustomersPage() {
  return (
    <CommerceListPage
      title="Customers"
      description="Review customer profiles and activity."
      actionLabel="Add customer"
      columns={['Customer', 'Email', 'Orders', 'Total spent']}
      filterColumn={2}
      filterLabel="Orders placed"
      rows={[
        ['Olivia Martin', 'olivia@northstar.co', '18', '$8,420'],
        ['Jackson Lee', 'jackson@outline.dev', '12', '$5,180'],
        ['Sophia Brown', 'sophia@verve.studio', '9', '$3,940'],
        ['Noah Williams', 'noah@layerlabs.io', '21', '$11,260'],
        ['Emma Davis', 'emma@wildroot.co', '15', '$6,890'],
        ['Liam Wilson', 'liam@craftline.dev', '7', '$2,760'],
        ['Ava Thompson', 'ava@northfield.io', '24', '$13,480'],
        ['Ethan Moore', 'ethan@brightdesk.co', '11', '$4,920'],
        ['Mia Anderson', 'mia@studioform.dev', '6', '$2,140'],
        ['Lucas Taylor', 'lucas@oakandco.io', '19', '$9,870'],
        ['Isabella Clark', 'isabella@clearpath.co', '14', '$6,310'],
        ['Mason Lewis', 'mason@pixelworks.dev', '8', '$3,520'],
      ]}
    />
  )
}
