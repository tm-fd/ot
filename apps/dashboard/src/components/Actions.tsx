import React from 'react'
import UserPurchaseDetails from './UserPurchaseDetails';
import { PurchaseObj } from '../app/store/zustandStore';

export default function Actions({ purchase }: { purchase: PurchaseObj }) {
  return <UserPurchaseDetails purchase={purchase} />
}