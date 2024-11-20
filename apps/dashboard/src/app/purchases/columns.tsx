import { Chip, Link } from '@nextui-org/react';
import { DeleteIcon, EditIcon, EyeIcon } from '../components/icons';
import Purchase from '../components/Purchase';
import Actions from '../components/Actions';

export type Purchase = {
  id: number;
  email: string;
  customerName: string;
  date: string;
  updatedDate: string;
  confirmationCode: string;
  numberOfVrGlasses: number;
  numberOfLicenses: number;
  isSubscription: boolean;
  duration: number;
  orderNumber: number;
};

export const columns = [
  {
    key: 'orderNumber',
    label: 'Order Id',
  },
  {
    key: 'customerName',
    label: 'Name',
  },
  {
    key: 'confirmationCode',
    label: 'Code',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'date',
    label: 'Created date',
  },
  {
    key: 'numberOfVrGlasses',
    label: 'VR Glasses',
  },
  {
    key: 'numberOfLicenses',
    label: 'Licenses',
  },
  {
    key: 'isSubscription',
    label: 'Subscription',
  },
  {
    key: 'duration',
    label: 'Duration',
  },
  {
    key: 'actions',
    label: 'Actions',
  },
];

export const renderCell = (purchase: Purchase, columnKey: React.Key) => {
  console.log(purchase)
  const cellValue = purchase[columnKey as keyof Purchase];
  switch (columnKey) {
    case 'orderNumber':
      return <Purchase>{purchase.orderNumber}</Purchase>;
    case 'email':
      return <Purchase>{purchase.email}</Purchase>;
    case 'name':
      return <Purchase>{purchase.customerName}</Purchase>;
    case 'date':
      return <Purchase>{purchase.date.replace('T', ' ').slice(0, 16)}</Purchase>
    case 'updatedDate':
      return <Purchase>{purchase.updatedDate.replace('T', ' ').slice(0, 16)}</Purchase>
    case 'confirmationCode':
      return <Purchase>{purchase.confirmationCode}</Purchase>;
    case 'numberOfVrGlasses':
      return <Purchase>{purchase.numberOfVrGlasses}</Purchase>;
    case 'numberOfLicenses':
      return <Purchase>{purchase.numberOfLicenses}</Purchase>;
    case 'isSubscription':
      return <Purchase>{purchase.isSubscription ? 'Yes' : 'No'}</Purchase>;
    case 'duration':
      return <Purchase>{purchase.duration}</Purchase>;
      case "actions":
        return (
          <Actions />
        );

    default:
      return cellValue;
  }
};
