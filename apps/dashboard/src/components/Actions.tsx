import React from 'react'
import UserPurchaseDetails from './UserPurchaseDetails';
import { ZPurchase } from '../store/zustandStore';

export default function Actions({ purchase }: { purchase: ZPurchase }) {
  return <UserPurchaseDetails purchase={purchase}/>
}