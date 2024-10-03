import { Chip, Link } from '@nextui-org/react';
import { DeleteIcon, EditIcon, EyeIcon } from '../components/icons';
import Order from '../components/Order';

export type Order = {
  id: number;
  email: string;
  customerName: string;
  date: string;
  confirmationCode: string
  status: string;
  trackingNumber: string;
  trackingStatus: string;
};

export const columns = [
  {
    key: 'id',
    label: 'Order ID',
  },
  {
    key: 'customerName',
    label: 'Name',
  },
  {
    key: '_activation_code',
    label: 'Code',
  },
  // {
  //   key: 'email',
  //   label: 'Email',
  // },
  {
    key: 'date',
    label: 'Date',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: '3pl',
    label: 'Shipping',
  },
];

const statusColorMap = {
  completed: 'success',
  pending: 'warning',
  processing: 'danger',
  canceled: 'light',
};

const shippingStatusTxt = (txt: string) => {
  if (txt === 'Electronic shipping instruction received') {
    return { status: 'Informed', color: 'warning' };
  } else if (txt === 'The shipment has been delivered to the recipient') {
    return { status: 'Delivered', color: 'primary' };
  } else if (txt === 'The shipment is under transportation') {
    return { status: 'Transporting', color: 'secondary' };
  } else {
    return { status: 'Not shippable', color: 'default' };
  }
};

export const renderCell = (order: Order, columnKey: React.Key) => {
  const cellValue = order[columnKey as keyof Order];
  console.log(order);
  switch (columnKey) {
    case 'id':
      return <Order>{order.id}</Order>;
    // case 'email':
    //   return <Order>{order.email}</Order>;
    case 'name':
      return (
        <Order>
          {order.customerName}
        </Order>
      );
    case 'date':
      return <Order>{order.date.replace("T", " ").slice(0, 16)}</Order>;
    case 'status':
      return (
        <Chip
          className="capitalize"
          color={statusColorMap[order.status]}
          size="sm"
          variant="flat"
        >
          {order.status}
        </Chip>
      );
    case '_activation_code':
      return (
        <Order>
          {order.confirmationCode}
        </Order>
      );
    case '3pl':
      return (
        shippingStatusTxt(order.trackingStatus)?.status !== 'Not shippable' && <Chip
          className="capitalize"
          color={shippingStatusTxt(order.trackingStatus)?.color}
          size="sm"
          variant={order.trackingStatus && 'faded'}
        >
          <Link
            isExternal
            color={shippingStatusTxt(order.trackingStatus)?.color}
            href={`https://tracking.postnord.com/en/?id=${order.trackingNumber}`}
            className="text-xs"
          >
            {shippingStatusTxt(order.trackingStatus)?.status}
          </Link>
        </Chip>
        );

    default:
      return cellValue;
  }
};
