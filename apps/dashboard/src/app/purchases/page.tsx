'use client';
import { use, useEffect, useState } from 'react';
import PurchaseTable from '../../components/PurchaseTable';
import { ZPurchase } from '../store/purchaseStore';
import { Spinner } from '@nextui-org/react';
import AddPurchase from '../../components/AddPurchase';
import usePurchaseStore from '../store/purchaseStore';
import { useRouter } from 'next/navigation';
import { usePurchasesData } from '../hooks';
import useSWR from 'swr'



export const fetchPurchases = async (page: number) => {
  try {
    const res = await fetch(`${process.env.CLOUDRUN_DEV_URL}/purchases/all-purchases?limit=370&page=${page}`, { cache: 'no-store' });
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
    const data = {
      purchases: customData.reverse(),
      currentPage: response.currentPage,
      total: response.total,
      totalPages: response.totalPages
    }
    console.log(data)
    return data
  } catch (err: any) {
    console.error(err.message);
  } 
};


export default function Purshases() {
  const { purchases, setPurchases, setError, currentPage, setCurrentPage, reset } =
    usePurchaseStore();
  const { data, isLoading, error, mutate } = usePurchasesData({
    limit: 370,
    page: currentPage,
  });
    // const { data, error, isLoading } = useSWR(`/purchases`, fetchPurchases);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
    if (data) {
      setPurchases(data.purchases);
      console.log("setPurchases")
      if (data.currentPage !== 1) {
        setCurrentPage(data.currentPage - 1);
      }
      
    }
  }, [setPurchases, isLoading, setError, data, currentPage]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <section className="py-24">
      <div className="container flex flex-col items-center justify-center">
        <div className="ml-auto">
          <AddPurchase currentPage={currentPage} />
        </div>
        {isLoading || !data || purchases.length === 0 ? (
          <Spinner
            label="Loading..."
            size="lg"
            color="secondary"
            style={{ height: '50vh' }}
          />
        ) : error ? (
          <p className="text-red-500">Failed to load</p>
        ) : (
          <PurchaseTable />
        )}
      </div>
    </section>
  );
}
