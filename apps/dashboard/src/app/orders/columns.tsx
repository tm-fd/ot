import { Tooltip, Chip } from '@nextui-org/react'
import { DeleteIcon, EditIcon, EyeIcon } from '../components/icons'
import Order from '../components/Order'

export type Order = {
  id: string,
  billing: {
    email: string,
    first_name: string,
    last_name: string,
  },
  date_created: string,
  meta_data: { id: number, key: string, value: string }[],
  status: string,
  line_items: string
}

export const columns = [
  {
    key: 'id',
    label: 'Order ID'
  },
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: '_activation_code',
    label: 'Code'
  },
  {
    key: 'email',
    label: 'Email'
  },
  {
    key: 'date',
    label: 'Date'
  },
  {
    key: 'status',
    label: 'Status'
  },
  {
    key: '3pl',
    label: 'Shipping'
  }
]

const statusColorMap = {
  completed: "success",
  pending: "warning",
  processing: "danger",
  canceled: "light",
};


export const renderCell = (order: Order, columnKey: React.Key) => {
  const cellValue = order[columnKey as keyof Order]
  switch (columnKey) {
    case 'id':
      return (
        <Order>
          {order.id}
        </Order>
      )
      case 'email':
      return (
        <Order>
          {order.billing.email}
        </Order>
      )
      case 'name':
      return (
        <Order>
          {order.billing.first_name} { order.billing.last_name}
        </Order>
      )
      case 'date':
      return (
        <Order>
          {order.date_created}
        </Order>
      )
      case 'status':
      return (
        <Chip className="capitalize" color={statusColorMap[order.status]} size="sm" variant="flat">
          {order.status}
        </Chip>
      )
      case '_activation_code':
      return (
        <Order>
          {order.meta_data.find(o => o.key === '_activation_code')?.value}
        </Order>
      )
    // case 'lastSeen':
    //   return <span>{new Date(cellValue).toLocaleDateString()}</span>
    // case 'actions':
    //   return (
    //     <div className='relative flex items-center gap-4'>
    //       <Tooltip content='Details'>
    //         <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
    //           <EyeIcon />
    //         </span>
    //       </Tooltip>
    //       <Tooltip content='Edit order'>
    //         <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
    //           <EditIcon />
    //         </span>
    //       </Tooltip>
    //       <Tooltip color='danger' content='Delete order'>
    //         <span className='cursor-pointer text-lg text-danger active:opacity-50'>
    //           <DeleteIcon />
    //         </span>
    //       </Tooltip>
    //     </div>
      // )
    default:
      return cellValue
  }
}