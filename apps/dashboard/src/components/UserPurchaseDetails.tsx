// UserPurchaseDetails.tsx
'use client';
import React, { useState } from 'react';
import { useDisclosure } from '@nextui-org/react';
import { EditIcon, EyeIcon } from './icons';
import { SharedModal } from './SharedModal';
import { EditPurchase } from './EditPurchase';
import OrderDetails from './OrderDetails';
import { PurchaseObj } from '../app/store/purchaseStore';

interface UserPurchaseDetailsProps {
  purchase: PurchaseObj;
}

export default function UserPurchaseDetails({ purchase }: UserPurchaseDetailsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);

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
        title={isEditing ? "Edit Purchase" : "Purchase Details"}
      >
        {isEditing ? (
          <EditPurchase purchase={purchase} onClose={handleCloseModal} />
        ) : (
          <OrderDetails purchase={purchase} />
        )}
      </SharedModal>
    </>
  );
}