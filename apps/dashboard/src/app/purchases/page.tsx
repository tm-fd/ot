import PurchaseTable from '@/app/components/PurchaseTable';
import { Purchase } from './columns';
import {Spinner} from "@nextui-org/react";
import AddPurchase from '@/app/components/AddPurchase';


const getOrderStatus = async (status: string) => {
  const res = await fetch(`${process.env.CLOUDRUN_DEV_URL}/purchases/all-purchases`, {cache: 'no-store'});
  const response = await res.json();
  console.log(response)
}


export const getPurchases = async () => {
  const res = await fetch(`${process.env.CLOUDRUN_DEV_URL}/purchases/all-purchases`, {cache: 'no-store'});
   const response = await res.json();
   
   const customData = response.purchases.map((obj: Purchase) => {
    return {
      id: obj.id,
      orderNumber: obj.order_number,
      email: obj.email,
      customerName: obj.first_name + ' ' + obj.last_name,
      date: obj.created_at,
      updatedDate: obj.updated_at, 
      confirmationCode: obj.code,
      numberOfVrGlasses: obj.number_of_vr_glasses,
      numberOfLicenses: obj.number_of_licenses,
      isSubscription: obj.is_subscription,
      duration: obj.duration,
    };
  });
   return customData.reverse()
}




export default async function Purshases() {
  const purchases = await getPurchases();
  
  
  return (
    <section className="py-24">
      <div className="container flex flex-col	">
        <div className="ml-auto">
          <AddPurchase />
        </div>
        {!purchases || purchases.length === 0 ? <Spinner label="Loading..." color="primary" /> : <PurchaseTable purchases={purchases} />}
      </div>
    </section>
  );
}
