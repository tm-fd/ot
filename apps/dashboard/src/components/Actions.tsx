import React from 'react'
import UserPurchaseDetails from './UserPurchaseDetails';
import { ZPurchase } from '../app/store/zustandStore';

export default function Actions({ purchase }: { purchase: ZPurchase }) {
  return <UserPurchaseDetails purchase={purchase}/>
}