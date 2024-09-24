'use client'

import { useCallback, useMemo, useState } from 'react'
import {Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Pagination,
    SortDescriptor,
    RadioGroup,
  Radio} from "@nextui-org/react";

import { Order, columns, renderCell } from '../orders/columns'
import { SearchIcon } from './icons'

export default function OrderTable({ orders }: { orders: Order[] }) {
    const [filterValue, setFilterValue] = useState('')
    const [selectionBehavior, setSelectionBehavior] = useState('replace');

    const hasSearchFilter = Boolean(filterValue)
  
    const filteredItems = useMemo(() => {
      let filteredOrders = [...orders]
  
      if (hasSearchFilter) {
        filteredOrders = filteredOrders.filter(order =>
          order.id.toLowerCase().includes(filterValue.toLowerCase())
        )
      }
  
      return filteredOrders
    }, [orders, filterValue, hasSearchFilter])
  
    const rowsPerPage = 12
    const [page, setPage] = useState(1)
    const pages = Math.ceil(filteredItems.length / rowsPerPage)
  
    const items = useMemo(() => {
      const start = (page - 1) * rowsPerPage
      const end = start + rowsPerPage
  
      return filteredItems.slice(start, end)
    }, [page, filteredItems])
  
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
      column: 'name',
      direction: 'ascending'
    })
  
    const sortedItems = useMemo(() => {
      return [...items].sort((a: Order, b: Order) => {
        const first = a[sortDescriptor.column as keyof Order] as string
        const second = b[sortDescriptor.column as keyof Order] as string
        const cmp = first < second ? -1 : first > second ? 1 : 0
  
        return sortDescriptor.direction === 'descending' ? -cmp : cmp
      })
    }, [sortDescriptor, items])
  
    const onSearchChange = useCallback((value?: string) => {
      if (value) {
        setFilterValue(value)
        setPage(1)
      } else {
        setFilterValue('')
      }
    }, [])
  
    const onClear = useCallback(() => {
      setFilterValue('')
      setPage(1)
    }, [])
  
    const topContent = useMemo(() => {
      return (
        <div className='flex flex-col gap-4'>
          <div className='flex items-end justify-between gap-3'>
            <Input
              isClearable
              className='w-full sm:max-w-[44%]'
              placeholder='Search by id...'
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          </div>
        </div>
      )
    }, [filterValue, onSearchChange, onClear])
  
    return (
      <div>
      <Table
        aria-label='Orders table'
        topContent={topContent}
        topContentPlacement='outside'
        selectionMode="multiple"
        selectionBehavior={selectionBehavior}
        bottomContent={
          <div className='flex w-full justify-center'>
            <Pagination
              isCompact
              showControls
              showShadow
              color='secondary'
              page={page}
              total={pages}
              onChange={page => setPage(page)}
            />
          </div>
        }
        bottomContentPlacement='outside'
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        classNames={{
          wrapper: 'min-h-[222px]'
        }}
      >
        <TableHeader columns={columns}>
          {column => (
            <TableColumn
              key={column.key}
              {...(column.key === 'name' ? { allowsSorting: true } : {})}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={sortedItems} emptyContent={'No orders to display.'}>
          {order => (
            <TableRow key={order.id}>
              {columnKey => <TableCell>{renderCell(order, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <RadioGroup 
      label="Selection Behavior"
      orientation="horizontal"
      value={selectionBehavior}
      onValueChange={setSelectionBehavior}
    >
      <Radio value="toggle">Toggle</Radio>
      <Radio value="replace">Replace</Radio>
    </RadioGroup> */}
    </div>
    )
  }