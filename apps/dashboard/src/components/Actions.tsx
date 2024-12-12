import React from 'react'
import UserPurchaseDetails from './UserPurchaseDetails';
import { PurchaseObj } from '../app/store/purchaseStore';

export default function Actions({ purchase }: { purchase: PurchaseObj }) {
  return <UserPurchaseDetails purchase={purchase} />
}