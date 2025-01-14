'use client';
import React, { useState, useEffect } from 'react';
import { use } from 'react';
import { useDisclosure } from '@nextui-org/react';
import { EditIcon, EyeIcon } from './icons';
import { SharedModal } from './SharedModal';
import { EditPurchase } from './EditPurchase';
import OrderDetails from './OrderDetails';
import { PurchaseObj } from '../app/store/purchaseStore';
import axios from 'axios';

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

  const [orderStatus, setOrderStatus] = useState(null);
  const [orderEmail, setOrderEmail] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);

useEffect(() => {
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      // Fetch order status
      const orderId = Number(purchase.orderNumber);
      const orderStatusRes = await fetch(
        `${process.env.CLOUDRUN_DEV_URL}/purchases/order-status/${orderId}`,
        { cache: 'no-store' }
      );
      if (orderStatusRes.ok) {
        const orderStatusData = await orderStatusRes.json();
        setOrderStatus(orderStatusData);
      }

      // Fetch order email
      const emailRes = await fetch('/api/handleOrdersEmail', {
        cache: 'no-store',
      });
      if (emailRes.ok) {
        const emailData = await emailRes.json();
        const sentEmails = emailData.filter(
          (emailObj) => emailObj.ContactAlt === purchase.email.toLowerCase()
        );
        const emailStatus = sentEmails.find(
          (email) =>
            email.Subject === 'Tack för din order från imvi labs!' ||
            email.Subject.includes('förnyelseorder')
        )?.Status;
        setOrderEmail(emailStatus);
      }

      // Fetch shipping info
      const shippingRes = await fetch(
        `${process.env.CLOUDRUN_DEV_URL}/purchases/shipping-info/${purchase.id}`,
        { cache: 'no-store' }
      );
      
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
                setShippingInfo(pnResponse.data.TrackingInformationResponse.shipments[0]);
              }
            } catch (pnError) {
              console.error('PostNord API error:', pnError);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchAllData();
}, [purchase]);

// Update completion status whenever the data changes
useEffect(() => {
  const complete = Boolean(
    orderStatus && 
    orderEmail && 
    (shippingInfo || purchase.shippable === false) // Consider non-shippable items
  );
  setIsComplete(complete);
  console.log(orderStatus, orderEmail, shippingInfo, complete )
}, [orderStatus, orderEmail, shippingInfo, purchase.shippable]);

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
      <div className="flex space-x-1 w-12">
        {isLoading ? (
          <>
            <div className="w-2 h-2 bg-default-300 rounded-full animate-bounce" style={{ animationDelay: '-0.32s' }} />
            <div className="w-2 h-2 bg-default-300 rounded-full animate-bounce" style={{ animationDelay: '-0.16s' }} />
            <div className="w-2 h-2 bg-default-300 rounded-full animate-bounce" />
          </>
        ) : (
          <div className={`w-3 h-3 rounded-full ${
            isComplete ? 'bg-green-500' : 'bg-default-300'
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
