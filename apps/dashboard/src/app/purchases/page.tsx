'use client';
import { useEffect, useState } from 'react';
import PurchaseTable from '../../components/PurchaseTable';
import { ZPurchase } from '../store/zustandStore';
import { Spinner } from '@nextui-org/react';
import AddPurchase from '../../components/AddPurchase';
import usePurchaseStore from '../store/zustandStore';
import { useRouter } from 'next/navigation';
import { usePurchasesData } from '../hooks';

export default function Purshases() {
  const { purchases, setPurchases, setError, currentPage, setCurrentPage } =
    usePurchaseStore();
  const { data, isLoading, error, mutate } = usePurchasesData({
    limit: 370,
    page: currentPage,
  });
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    if (data) {
      setPurchases(data.purchases);
      if (data.currentPage !== 1) {
        setCurrentPage(data.currentPage - 1);
      }
    }
  }, [setPurchases, isLoading, setError, data, currentPage]);

  return (
    <section className="py-24">
      <div className="container flex flex-col items-center justify-center">
        <div className="ml-auto">
          <AddPurchase />
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
