'use client';
import { useState, useEffect } from 'react';
import { use } from 'react';
import { useDisclosure } from '@nextui-org/react';
import { EditIcon, EyeIcon } from './icons';
import { SharedModal } from './SharedModal';
import { EditPurchase } from './EditPurchase';
import OrderDetails from './OrderDetails';
import usePurchaseStore, { PurchaseObj }  from '@/app/store/purchaseStore';
import { useActivationStore } from '@/app/store/purchaseActivactionsStore';
import axios from 'axios';
import Loading from '@/app/loading';


interface UserPurchaseDetailsProps {
  purchase: PurchaseObj;
}

export default function UserPurchaseDetails({
  purchase,
}: UserPurchaseDetailsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { purchaseStatuses, setPurchaseStatus } = usePurchaseStore();
  const { fetchActivationRecord, clearActivationRecords, activationRecords } = useActivationStore();
  const purchaseStatus = purchaseStatuses[Number(purchase.id)];

  useEffect(() => {
    const fetchActivations = async () => {
      try {
        await fetchActivationRecord(Number(purchase.id));
      } catch (err) {
        console.error('Error fetching activation record:', err);
      }
    };

    fetchActivations();

    // Clear activation records when component unmounts
    return () => {
      clearActivationRecords();
    };
  }, [purchase, fetchActivationRecord, clearActivationRecords]);

  useEffect(() => {
    const fetchAllData = async () => {
      // If we already have the data, don't fetch again
      if (purchaseStatus) {
        return;
      }

      setIsLoading(true);
      try {
        // Fetch order status
        const orderStatusRes = await fetch(
          `${process.env.CLOUDRUN_DEV_URL}/purchases/order-status/${purchase.orderNumber}`,
          { cache: 'no-store' }
        );
        const orderStatus = orderStatusRes.ok ? await orderStatusRes.json() : null;

        // Fetch order email
        const emailRes = await fetch('/api/handleOrdersEmail', {
          cache: 'no-store',
        });
        let orderEmail = null;
        if (emailRes.ok) {
          const emailData = await emailRes.json();
          const sentEmails = emailData.filter(
            (emailObj) => emailObj.ContactAlt === purchase.email.toLowerCase()
          );
          orderEmail = sentEmails.find(
            (email) =>
              email.Subject === 'Tack för din order från imvi labs!' ||
              email.Subject.includes('förnyelseorder')
          )?.Status;
        }

        // Fetch shipping info
        const shippingRes = await fetch(
          `${process.env.CLOUDRUN_DEV_URL}/purchases/shipping-info/${purchase.id}`,
          { cache: 'no-store' }
        );
        
        let shippingInfo = null;
        if (shippingRes.ok) {
          const shippingData = await shippingRes.json();
          
          if (shippingData?.tracking_number) {
            if (shippingData.tracking_number.startsWith('UU')) {
              try {
                const pnResponse = await axios.get(
                  'https://api2.postnord.com/rest/shipment/v5/trackandtrace/findByIdentifier.json',
                  {
                    params: {
                      apikey: process.env.PN_API_KEY,
                      id: shippingData.tracking_number,
                      locale: 'en',
                    },
                  }
                );
                if (pnResponse.data?.TrackingInformationResponse?.shipments?.[0]) {
                  shippingInfo = pnResponse.data.TrackingInformationResponse.shipments[0];
                }
              } catch (pnError) {
                console.error('PostNord API error:', pnError);
              }
            } else {
              try {
                const myHeaders = new Headers();
                myHeaders.append('DHL-API-Key', process.env.DHL_API_KEY);
                const dhlRes = await fetch(
                  `https://api-eu.dhl.com/track/shipments?trackingNumber=${shippingData.tracking_number}`,
                  {
                    method: 'GET',
                    headers: myHeaders,
                  }
                );
                if (dhlRes.ok) {
                  const dhlData = await dhlRes.json();
                  if (dhlData?.shipments?.[0]) {
                    shippingInfo = dhlData.shipments[0];
                  }
                }
              } catch (dhlError) {
                console.error('DHL API error:', dhlError);
              }
            }
          }
        }

        // Calculate completion status
        const isComplete = Boolean(
          orderStatus && 
          orderEmail && 
          (shippingInfo || purchase.shippable === false)
        );

        // Store the results in Zustand
        setPurchaseStatus(Number(purchase.id), {
          orderStatus,
          orderEmail,
          shippingInfo,
          isComplete
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [purchase.id, purchase.orderNumber, purchase.email, purchaseStatus, setPurchaseStatus]);

  useEffect(() => {
    if (purchaseStatus && activationRecords.length > 0) {
      const isComplete = Boolean(
        purchaseStatus.orderStatus && 
        purchaseStatus.orderEmail && 
        (purchaseStatus.shippingInfo || purchase.shippable === false) &&
        activationRecords.length > 0
      );

      if (isComplete !== purchaseStatus.isComplete) {
        setPurchaseStatus(Number(purchase.id), {
          ...purchaseStatus,
          isComplete
        });
      }
    }
  }, [activationRecords.length, purchaseStatus, purchase.id, setPurchaseStatus, purchase.shippable]);

  const handleEditClick = () => {
    setIsEditing(true);
    onOpen();
  };

  const handleViewClick = () => {
    setIsEditing(false);
    onOpen();
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    onClose();
  };
  

  return (
    <>
      <div className="relative flex items-center gap-2">
      <div className="flex space-x-1 w-5">
        {isLoading ? (
          <Loading style_inline={{width: "20px"}} />
        ) : (
          <div className={`w-3 h-3 rounded-full ${
            purchaseStatus?.isComplete ? 'bg-green-500' : 'bg-default-300'
          }`} />
        )}
      </div>
        <span
          onClick={handleViewClick}
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
        >
          <EyeIcon />
        </span>
        <span
          onClick={handleEditClick}
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
        >
          <EditIcon />
        </span>
      </div>
      <SharedModal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title={isEditing ? 'Edit Purchase' : 'Purchase Details'}
      >
        {isEditing ? (
          <EditPurchase purchase={purchase} onClose={handleCloseModal} />
        ) : (
          <OrderDetails
            purchase={purchase}
            onStatusComplete={setIsComplete}
          />
        )}
      </SharedModal>
    </>
  );
}
