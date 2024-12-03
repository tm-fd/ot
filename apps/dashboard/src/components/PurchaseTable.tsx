'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
  SortDescriptor,
  Button,
  Spinner,
} from '@nextui-org/react';

import { Purchase, columns, renderCell } from '../app/purchases/columns';
import { SearchIcon } from './icons';
import usePurchaseStore from '../app/store/zustandStore';

export default function PurchaseTable({ data }) {
  const { currentPage, setCurrentPage, purchases, isLoading, error } = usePurchaseStore();
  const [filterValue, setFilterValue] = useState('');
  const [selectionBehavior, setSelectionBehavior] = useState('replace');

  const hasSearchFilter = Boolean(filterValue);

  const searchPurchase = (purchase: Purchase, value: string) => {
    const lowerFilterValue = value.toString().toLowerCase();

    const searchInObject = (obj: any) => {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          if (searchInObject(obj[key])) return true;
        } else if (Array.isArray(obj[key])) {
          for (const item of obj[key]) {
            if (searchInObject(item)) return true;
          }
        } else if (obj[key]?.toString().toLowerCase().includes(lowerFilterValue)) {
          return true;
        }
      }
      return false;
    };

    return searchInObject(purchase);
  };

  const filteredItems = useMemo(() => {
    let filteredPurchases = [...purchases];

    if (hasSearchFilter) {
      filteredPurchases = filteredPurchases.filter((purchase) => searchPurchase(purchase, filterValue));
    }

    return filteredPurchases;
  }, [purchases, filterValue, hasSearchFilter]);

  const rowsPerPage = 20;
  const [page, setPage] = useState(1);
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'date',
    direction: 'descending',
  });

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Purchase, b: Purchase) => {
      const first = a[sortDescriptor.column as keyof Purchase] as string;
      const second = b[sortDescriptor.column as keyof Purchase] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const handleNextPage = () => {
    setPage((prev) => (prev < pages ? prev + 1 : prev))
    setCurrentPage(currentPage - 1);
  };

  const handlePreviousPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev))
    setCurrentPage(currentPage + 1);
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by anything..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onClear]);

  const handlePaginationChange = (page) => {
    console.log(page)
    setPage(page)
  }

  if (isLoading) {
    return <Spinner label="Loading..." size="lg" color='secondary' />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Table
        isStriped
        aria-label="Purchase table"
        topContent={topContent}
        topContentPlacement="outside"
        bottomContent={
          <div className="flex w-full justify-center">
            {/* <Button size="sm" variant="flat" color="secondary" isDisabled={currentPage === 8} onPress={handlePreviousPage}>
              Previous
            </Button> */}
            <Pagination isCompact showShadow color="secondary" page={page} total={pages} onChange={handlePaginationChange} showControls />
            <div className="flex gap-2">
              {/* <Button size="sm" variant="flat" color="secondary" isDisabled={currentPage === 1} onPress={handleNextPage}>
                Next
              </Button> */}
            </div>
          </div>
        }
        bottomContentPlacement="outside"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        classNames={{
          wrapper: 'min-h-[222px]',
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} {...(column.key === 'date' ? { allowsSorting: true } : {})}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={sortedItems} emptyContent={'No purchases to display.'}>
          {(purchase) => (
            <TableRow key={purchase.id}>
              {(columnKey) => <TableCell>{renderCell(purchase, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
