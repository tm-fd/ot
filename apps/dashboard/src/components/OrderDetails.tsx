"use client"
import { useEffect, useState } from 'react';
import { Spinner, Chip, Link } from '@nextui-org/react';
import { PurchaseObj } from '../app/store/zustandStore';
import axios from 'axios';

// Type definitions (unchanged from previous version)
interface OrderStatus {
  id: number;
  order_id: string;
  purchase_id: number | null;
  status: string;
}

interface OrderShipping {
  id: number;
  purchase_id: number | null;
  shipping_date: string;
  tracking_number: string;
  tracking_status: string;
}

interface ShippingStatusInfo {
  status: string;
  color: 'warning' | 'primary' | 'secondary' | 'default';
}

// Utility function to map shipping status (unchanged)
const getShippingStatusInfo = (trackingStatus: string): ShippingStatusInfo => {
  const statusMap: Record<string, ShippingStatusInfo> = {
    'Electronic shipping instruction received': { 
      status: 'Informed', 
      color: 'warning' 
    },
    'The shipment has been delivered to the recipient': { 
      status: 'Delivered', 
      color: 'primary' 
    },
    'The shipment is under transportation': { 
      status: 'Transporting', 
      color: 'secondary' 
    }
  };

  return statusMap[trackingStatus] || { 
    status: 'Not shippable', 
    color: 'default' 
  };
};

export default function OrderDetails({ purchase }: { purchase: PurchaseObj }) {
  // State management
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [orderShipping, setOrderShipping] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatusError, setOrderStatusError] = useState<string | null>(null);
  const [shippingError, setShippingError] = useState<string | null>(null);

  // Fetch order status and shipping information
  useEffect(() => {
    const fetchOrderInformation = async () => {
      setIsLoading(true);
      setOrderStatusError(null);
      setShippingError(null);

      try {
        // Fetch order status
        await fetchOrderStatus();
      } catch (err) {
        console.error('Error fetching order information:', err);
      }

      try {
        // Fetch shipping information
        await fetchOrderShipping();
      } catch (err) {
        console.error('Error fetching shipping information:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderInformation();
  }, [purchase]);

  // Fetch order status
  const fetchOrderStatus = async () => {
    try {
      const orderId = Number(purchase.orderNumber);
      const res = await fetch(`${process.env.CLOUDRUN_DEV_URL}/purchases/order-status/${orderId}`, { 
        cache: 'no-store' 
      });

      if (!res.ok) {
        throw new Error(`No purchase status found for ID ${orderId}`);
      }

      const response = await res.json();
      setOrderStatus(response);
    } catch (err: any) {
      setOrderStatusError(err.message);
    }
  };

  // Fetch order shipping information
  const fetchOrderShipping = async () => {
    try {
      const purchaseId = Number(purchase.id);
      const res = await fetch(`${process.env.CLOUDRUN_DEV_URL}/purchases/shipping-info/${purchaseId}`, { 
        cache: 'no-store' 
      });

      if (!res.ok) {
        throw new Error(`No shipping information found for purchase ID ${purchaseId}`);
      }

      const response = await res.json();
      if (response?.tracking_number) {
        const pnResponse = await axios.get(
          'https://api2.postnord.com/rest/shipment/v5/trackandtrace/findByIdentifier.json', 
          {
            params: {
              apikey: process.env.PN_API_KEY,
              id: response.tracking_number,
              locale: 'en',
            },
          }
        );
console.log(pnResponse.data);
        const trackingStatus = 
          pnResponse.data.TrackingInformationResponse.shipments[0];
        setOrderShipping(trackingStatus);
      }
    } catch (err: any) {
      setShippingError(err.message);
    }
  };

  // Render loading state
  if (isLoading) {
    return <Spinner label="Loading..." size="lg" color='secondary' style={{height: '50vh'}} />;
  }

  // Render component
  return (
    <section className="py-24">
      <div className="container flex flex-col items-center justify-center">
        {/* Order Status Section */}
        {(orderStatus || orderStatusError) && (
          <div className="flex flex-col items-center justify-center mb-4">
            {orderStatusError ? (
              <p className="text-red-500">{orderStatusError}</p>
            ) : (
              <p className="font-medium">Order Status: {orderStatus?.status}</p>
            )}
          </div>
        )}

        {/* Shipping Information Section */}
        {orderShipping && (
          <div className="flex flex-col items-center justify-center">
            {getShippingStatusInfo(orderShipping.statusText.header).status !== 'Not shippable' && (
              <div>
              Order Shipping: <Chip
                className="capitalize"
                color={getShippingStatusInfo(orderShipping.statusText.header).color}
                size="sm"
                variant="faded"
              >
                <Link
                  isExternal
                  color={getShippingStatusInfo(orderShipping.statusText.header).color}
                  href={`https://tracking.postnord.com/en/?id=${orderShipping.shipmentId}`}
                  className="text-xs"
                >
                  {getShippingStatusInfo(orderShipping.statusText.header).status}
                </Link>
              </Chip>
              </div>
            )}
          </div>
        )}

        {/* Shipping Error Section */}
        {shippingError && (
          <div className="flex flex-col items-center justify-center mt-4">
            <p className="text-red-500">{shippingError}</p>
          </div>
        )}
      </div>
    </section>
  );
}