'use client'
import { useEffect } from 'react';
import PurchaseTable from '../../components/PurchaseTable';
import { ZPurchase } from '../store/zustandStore';
import { Spinner } from '@nextui-org/react';
import AddPurchase from '../../components/AddPurchase';
import usePurchaseStore from '../store/zustandStore';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';


export const fetchPurchases = async () => {
  try {
    const res = await fetch(`${process.env.CLOUDRUN_DEV_URL}/purchases/all-purchases`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const response = await res.json();
    const customData = response.purchases.map((obj: ZPurchase) => ({
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
    }));
    return customData.reverse()
  } catch (err: any) {
    console.error(err.message);
  } 
};
export default function Purshases() {
  const { purchases, setPurchases, setError } = usePurchaseStore();
  const { data, error, isLoading } = useSWR('/purchases', fetchPurchases);
  const router = useRouter()
  // useEffect(() => {
  //   window.location.reload();
  // }, []);

  useEffect(() => {
    router.refresh();
    if (data) {
      setPurchases(data);
    }
  }, [setPurchases, isLoading, setError, data]);

  return (
    <section className="py-24">
      <div className="container flex flex-col items-center justify-center">
      <div className="ml-auto">
          <AddPurchase />
        </div>
        {isLoading || !purchases || purchases.length === 0 ? (
          <Spinner label="Loading..." size="lg" color='secondary' style={{height: '50vh'}} />
        ) : error ? (
          <p className="text-red-500">Failed to load</p>
        ) : (
          <PurchaseTable />
        )}
      </div>
    </section>
  );
}
