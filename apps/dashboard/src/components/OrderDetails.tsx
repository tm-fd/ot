'use client'
import { useEffect, useState } from 'react';
import { Spinner } from '@nextui-org/react';
import { ZPurchase } from '../app/store/zustandStore';

type OrderStatus = {
    id: number,
    order_id: string,
    purchase_id: number | null,
    status: string,
};

export default function OrderDetails({purchase}: {purchase: ZPurchase}) {
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      setIsLoading(true);
      setError(null); // Clear any previous errors
      try {
        const orderId = Number(purchase.orderNumber);
        const res = await fetch(`${process.env.CLOUDRUN_DEV_URL}/purchases/order-status/${orderId}`, { cache: 'no-store' });
        if (!res.ok) {
          setError(`There is no order status for this order ${orderId}`);
        } else {
          const response = await res.json();
          setOrderStatus(response);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderStatus();
  }, [purchase]);

  return (
    <section className="py-24">
      <div className="container flex flex-col items-center justify-center">
        {isLoading ? (
          <Spinner label="Loading..." size="lg" color='secondary' style={{height: '50vh'}} />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="flex flex-col items-center justify-center">
            {orderStatus && orderStatus.status}
          </div>
        )}
      </div>
    </section>
  );
}
