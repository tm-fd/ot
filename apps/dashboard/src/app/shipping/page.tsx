

async function getShipping(orderNumber: string, orderDate: string): Promise<string[]> {
  const res = await fetch(
    `http://localhost:3000/shipping?orderNumber=${orderNumber}&date=${orderDate}`, { cache: 'no-store'})
    
    
  const data = await res.json()
  console.log("shipping",data)
  return data
}


export default async function Shipping() {
  const shipping = await getShipping("27511", "2022-09-23")


  return (
    <section className='py-24'>
      <div className='container'>
        
      </div>
    </section>
  )
}