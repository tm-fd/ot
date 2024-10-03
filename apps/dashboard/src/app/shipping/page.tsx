

async function getShipping(orderNumber: string, orderDate: string): Promise<string[]> {
  const res = await fetch(
    `http://localhost:3000/shipping?orderNumber=${orderNumber}&orderDate=${orderDate}`, { cache: 'no-store'})
    
    
  const data = await res.json()
  console.log("shipping",data)
  return data
}


export default async function Shipping() {
  
  const shipping = await getShipping("alla", "2024-09-23")


  return (
    <section className='py-24'>
      <div className='container'>
        
      </div>
    </section>
  )
}