'use client';
import { useEffect, useState } from 'react';
import { Spinner, Chip, Link, Divider } from '@nextui-org/react';
import { PurchaseObj } from '../app/store/purchaseStore';
import axios from 'axios';
import ActivationRecords from './ActivationRecords';
import { useActivationStore } from '@/app/store/purchaseActivactionsStore';
import { useAdditionalInfo } from '@/app/hooks';

interface OrderStatus {
  id: number;
  order_id: string;
  purchase_id: number | null;
  status: string;
}

interface UserFirestoreData {
  Email?: string;
  FirstName?: string;
}

interface ActivationRecord {
  id: number;
  purchase_id: number;
  activation_date: string;
  updated_at: string;
  user_id: number;
  user: {
    id: number;
    uuid: string;
    registered_on: string;
    starred: boolean;
    type: string;
    deleted: boolean;
  };
  firestoreData?: UserFirestoreData;
}

export type SentEmails = {
  ContactAlt: string;
  ArrivedAt: string;
  Status: string;
  Subject: string;
}[];

interface ShippingStatusInfo {
  status: string;
  color: 'warning' | 'primary' | 'secondary' | 'default';
}

interface AdditionalInfo {
  id: number;
  info: string;
  purchase_id: number;
}

interface OrderDetailsProps {
  purchase: PurchaseObj;
  onStatusComplete?: (isComplete: boolean) => void;
}

// DHL staus mapping
//"delivered","failure","pre-transit","transit","unknown"

const getDHLShippingStatusInfo = (trackingStatus: string): ShippingStatusInfo => {
  const statusMap: Record<string, ShippingStatusInfo> = {
    'pre-transitd': {
      status: 'pre-transit',
      color: 'warning',
    },
    'delivered': {
      status: 'Delivered',
      color: 'primary',
    },
    'transit': {
      status: 'Transporting',
      color: 'secondary',
    },
    'unknown': {
      status: 'Unknown',
      color: 'default',
    },
  };

  return (
    statusMap[trackingStatus] || {
      status: 'Not shippable',
      color: 'default',
    }
  );
};


const getPNShippingStatusInfo = (trackingStatus: string): ShippingStatusInfo => {
  const statusMap: Record<string, ShippingStatusInfo> = {
    'Electronic shipping instruction received': {
      status: 'Informed',
      color: 'warning',
    },
    'The shipment has been delivered to the recipient': {
      status: 'Delivered',
      color: 'primary',
    },
    'The shipment is under transportation': {
      status: 'Transporting',
      color: 'secondary',
    },
  };

  return (
    statusMap[trackingStatus] || {
      status: 'Not shippable',
      color: 'default',
    }
  );
};

const emailStatusColorMap = {
  delivered: 'secondary',
  opened: 'primary',
  sent: 'secondary',
  blocked: 'danger',
  queued: 'warning',
  processed: 'warning',
  clicked: 'primary',
};

const statusColorMap = {
  completed: 'success',
  pending: 'warning',
  processing: 'danger',
  canceled: 'light',
};

export default function OrderDetails({ purchase, onStatusComplete }: OrderDetailsProps) {
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [postNordShipping, setPostNordShipping] = useState<string | null>(null);
  const [dhlShipping, setDHLShipping] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatusError, setOrderStatusError] = useState<string | null>(null);
  const [shippingError, setShippingError] = useState<string | null>(null);
  const [orderEmail, setOrderEmail] = useState<string | null>(null);
  const [orderEmailError, setOrderEmailError] = useState<string | null>(null);
  const { fetchActivationRecord, clearActivationRecords } =
    useActivationStore();

  const {
    additionalInfos,
    setEditedAdditionalInfos,
    error: additionalInfoError,
  } = useAdditionalInfo(purchase.id);

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
        // Fetch order emails
        await fetchOrderSentEmail();
      } catch (err) {
        console.error('Error fetching order information:', err);
      }
      try {
        // Fetch shipping information
        await fetchOrderShipping();
      } catch (err) {
        console.error('Error fetching shipping information:', err);
      }
      try {
        // Fetch activation record
        await fetchActivationRecord(Number(purchase.id));
      } catch (err) {
        console.error('Error fetching activation record:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderInformation();

    return () => {
      clearActivationRecords();
    };
  }, [purchase, fetchActivationRecord, clearActivationRecords]);

  useEffect(() => {
    // Check if all required statuses are present
    const isComplete = Boolean(
      orderStatus && 
      orderEmail && 
      (postNordShipping || dhlShipping)
    );
    // Notify parent component
     onStatusComplete?.(isComplete);
  }, [orderStatus, orderEmail, postNordShipping, dhlShipping]);

  // Fetch order status
  const fetchOrderStatus = async () => {
    try {
      const orderId = Number(purchase.orderNumber);
      const res = await fetch(
        `${process.env.CLOUDRUN_DEV_URL}/purchases/order-status/${orderId}`,
        {
          cache: 'no-store',
        }
      );

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
      const res = await fetch(
        `${process.env.CLOUDRUN_DEV_URL}/purchases/shipping-info/${purchaseId}`,
        {
          cache: 'no-store',
        }
      );

      if (!res.ok) {
        throw new Error(
          `No shipping information found for purchase ID ${purchaseId}`
        );
      }

      const response = await res.json();
      if (response?.tracking_number) {
        if (response.tracking_number.startsWith('UU')) {
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
          const trackingStatus =
            pnResponse.data.TrackingInformationResponse.shipments[0];
            setPostNordShipping(trackingStatus);
        } else {
          const myHeaders = new Headers();
          myHeaders.append('DHL-API-Key', process.env.DHL_API_KEY);
          const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
          };

          fetch(
            `https://api-eu.dhl.com/track/shipments?trackingNumber=${response.tracking_number}`,
            requestOptions
          )
            .then((response) => response.json())
            .then((result) => setDHLShipping(result.shipments[0]))
            .catch((error) => console.error(error));
        }
      }
    } catch (err: any) {
      setShippingError(err.message);
    }
  };

  const fetchOrderSentEmail = async () => {
    try {
      const response = await fetch('/api/handleOrdersEmail', {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch emails');
      }

      const data = await response.json();
      const sentEmails = data.filter(
        (emailObj) => emailObj.ContactAlt === purchase.email.toLowerCase()
      );
      if (sentEmails.length === 0) {
        setOrderEmailError('No emails found');
      }
      const emailStatus = sentEmails.find(
        (email) =>
          email.Subject === 'Tack för din order från imvi labs!' ||
          email.Subject.includes('förnyelseorder')
      )?.Status;
      setOrderEmail(emailStatus);
    } catch (error) {
      console.log('Error:', error);
      setOrderEmailError(error.message);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <Spinner
        label="Loading..."
        size="lg"
        color="secondary"
        style={{ height: '50vh' }}
      />
    );
  }

  return (
    <section className="pb-12">
      <div className="container flex flex-col items-start justify-start">
        {/* Additional Info Section */}
        {additionalInfoError ? (
          <p className="text-red-500 mb-4">{additionalInfoError}</p>
        ) : (
          additionalInfos.length > 0 && (
            <div className="flex flex-col items-start justify-center mb-4">
              <h4 className="text-lg font-semibold mb-2">
                Additional Information:
              </h4>
              {additionalInfos.map((pi, index) => (
                <p className="text-sm" key={pi.id}>
                  {pi.info}
                </p>
              ))}
            </div>
          )
        )}
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
        {(orderEmail || orderEmailError) && (
          <div className="flex flex-col items-center justify-center mb-4">
            {orderEmailError ? (
              <p className="text-red-500">{orderEmailError}</p>
            ) : (
              <div>
                Confirmation email:{' '}
                <Chip
                  className="capitalize"
                  color={emailStatusColorMap[orderEmail]}
                  size="sm"
                  variant="flat"
                >
                  {orderEmail === 'sent' ? 'Delivered' : orderEmail}
                </Chip>
              </div>
            )}
          </div>
        )}
        {/* Shipping Information Section */}
        {postNordShipping && (
          <div className="flex flex-col items-center justify-center mb-4">
            {getPNShippingStatusInfo(postNordShipping.statusText.header).status !==
              'Not shippable' && (
              <div>
                Order Shipping:{' '}
                <Chip
                  className="capitalize"
                  color={
                    getPNShippingStatusInfo(postNordShipping.statusText.header).color
                  }
                  size="sm"
                  variant="faded"
                >
                  <Link
                    isExternal
                    color={
                      getPNShippingStatusInfo(postNordShipping.statusText.header)
                        .color
                    }
                    href={`https://tracking.postnord.com/en/?id=${postNordShipping.shipmentId}`}
                    className="text-xs"
                  >
                    {
                      getPNShippingStatusInfo(postNordShipping.statusText.header)
                        .status
                    }
                  </Link>
                </Chip>
              </div>
            )}
          </div>
        )}
        {dhlShipping && (
          <div className="flex flex-col items-center justify-center mb-4">
            {getDHLShippingStatusInfo(dhlShipping.status.statusCode).status !==
              'Not shippable' && (
              <div>
                Order Shipping:{' '}
                <Chip
                  className="capitalize"
                  color={
                    getDHLShippingStatusInfo(dhlShipping.status.statusCode).color
                  }
                  size="sm"
                  variant="faded"
                >
                  <Link
                    isExternal
                    color={
                      getDHLShippingStatusInfo(dhlShipping.status.statusCode)
                        .color
                    }
                    href={`https://www.dhl.com/se-en/home/tracking/tracking-freight.html?submit=1&tracking-id=${dhlShipping.id}`}
                    className="text-xs"
                  >
                    {
                      getDHLShippingStatusInfo(dhlShipping.status.statusCode)
                        .status
                    }
                  </Link>
                </Chip>
              </div>
            )}
          </div>
        )}

        {/* Shipping Error Section */}
        {shippingError && (
          <div className="flex flex-col items-center justify-center mb-8">
            <p className="text-red-500">{shippingError}</p>
          </div>
        )}
        <Divider className="my-4" />
        <ActivationRecords />
      </div>
    </section>
  );
}
