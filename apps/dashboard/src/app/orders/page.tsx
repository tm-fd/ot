import OrderTable from '@/app/components/OrderTable'
import { Order } from './columns'


async function getOrders(page: number): Promise<Order[]> {
  const res = await fetch(
    `http://localhost:3000/orders?ordersPage=${page}`, { cache: 'no-store'})
    
  const data = await res.json()
  return data
}

async function getShipping(orderNumber: string, orderDate: string): Promise<string[]> {
  const res = await fetch(
    `http://localhost:3000/shipping?orderNumber=${orderNumber}&orderDate=${orderDate}`, { cache: 'no-store'})
  const data = await res.json()
  console.log("shipping",data)
  return data
}


export default async function Orders() {
  const orders = await getOrders(60)


  return (
    <section className='py-24'>
      <div className='container'>
        {orders.length < 0 ? <p>Loading...</p> : <OrderTable orders={orders}  />}
      </div>
    </section>
  )
}