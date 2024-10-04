import OrderTable from '@/app/components/OrderTable'
import { Order } from './columns'
import AddOrder from '@/app/components/AddOrder'


async function getOrders(page: number): Promise<Order[]> {
  const res = await fetch(
    `http://localhost:3000/orders?ordersPage=${page}`, { cache: 'no-store'})
    
  const data = await res.json()
  const customData = data.map((obj: any) =>{
    return {
      id: obj.id,
  email: obj.billing.email,
  customerName: obj.billing.first_name + " " + obj.billing.last_name,
  date: obj.date_created,
  confirmationCode: obj.meta_data.find((o: any) => o.key === '_activation_code')?.value,
  status: obj.status,
  trackingNumber: obj.trackingInfo?.trackingNumber,
  trackingStatus: obj.trackingInfo?.trackingStatus,
  
    }
  })
  return customData
}

export default async function Orders() {
  const orders = await getOrders(60)
console.log(orders)

  return (
    <section className='py-24'>
      <div className='container flex flex-col	'>
        <div className='ml-auto'><AddOrder /></div>
        {orders.length < 0 ? <p>Loading...</p> : <OrderTable orders={orders}  />}
      </div>
    </section>
  )
}