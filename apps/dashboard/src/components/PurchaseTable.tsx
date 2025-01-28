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
  Checkbox,
  Tooltip,
} from '@nextui-org/react';

import { Purchase, columns, renderCell } from '../app/purchases/columns';
import { SearchIcon } from './icons';
import usePurchaseStore from '../app/store/purchaseStore';

export default function PurchaseTable() {
  const { purchases } = usePurchaseStore();
  const [filterValue, setFilterValue] = useState('');
  const [showHidden, setShowHidden] = useState(false);

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
        } else if (
          obj[key]?.toString().toLowerCase().includes(lowerFilterValue)
        ) {
          return true;
        }
      }
      return false;
    };

    return searchInObject(purchase);
  };

  const groupedPurchases = useMemo(() => {
    // Group purchases by email
    const grouped = purchases.reduce((acc, purchase) => {
      const email = purchase.email.toLowerCase(); // normalize email
      if (!acc[email]) {
        acc[email] = [];
      }
      acc[email].push(purchase);
      return acc;
    }, {} as Record<string, Purchase[]>);

    // For each group, find the most recent purchase and collect old purchases
    return Object.entries(grouped).map(([email, group]) => {
      // Sort purchases by date in descending order
      const sortedPurchases = [...group].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      // Get the most recent purchase
      const recentPurchase = sortedPurchases[0];

      // Get all other purchases as old purchases
      const oldPurchases = sortedPurchases.slice(1);

      return { recentPurchase, oldPurchases };
    });
  }, [purchases]);

  const filteredItems = useMemo(() => {
    let filteredPurchases = [...groupedPurchases];
    // Apply hidden filter
    if (!showHidden) {
      filteredPurchases = filteredPurchases.filter(({ recentPurchase }) => {
        const isHidden = recentPurchase.additionalInfo?.some(
          (info) => info.is_hidden
        );
        return !isHidden;
      });
    }

    // Apply search filter
    if (hasSearchFilter) {
      filteredPurchases = filteredPurchases.filter(({ recentPurchase }) =>
        searchPurchase(recentPurchase, filterValue)
      );
    }

    return filteredPurchases;
  }, [groupedPurchases, filterValue, hasSearchFilter, showHidden]);

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
    return [...items].sort((a, b) => {
      const first = a.recentPurchase[
        sortDescriptor.column as keyof Purchase
      ] as string;
      const second = b.recentPurchase[
        sortDescriptor.column as keyof Purchase
      ] as string;
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
          <Checkbox
            isSelected={showHidden}
            onValueChange={setShowHidden}
            color="secondary"
          >
            Show Hidden Purchases
          </Checkbox>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onClear, showHidden]);

  const handlePaginationChange = (page) => {
    setPage(page);
  };

  return (
    <div>
      <Table
        isStriped
        aria-label="Purchase table"
        topContent={topContent}
        topContentPlacement="outside"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={handlePaginationChange}
              showControls
            />
            <div className="flex gap-2"></div>
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
            <TableColumn
              key={column.key}
              {...(column.key === 'date' ? { allowsSorting: true } : {})}
            >
              <div className="flex items-center gap-2">
                {column.label}
                {column.key === 'actions' && (
                  <Tooltip
                    content={
                      <div className="px-1 py-2">
                        <div className="text-tiny">
                          <p>
                            <span className="inline-block w-3 h-3 rounded-full bg-yallow-500 mr-2"></span>
                            Activation code is sent / Is activated & VR not
                            delivered
                          </p>
                          <p>
                            <span className="inline-block w-3 h-3 rounded-full bg-pink-500 mr-2"></span>
                            Is activated & VR delivered
                          </p>
                          <p>
                            <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                            Started training
                          </p>
                          <p>
                            <span className="inline-block w-3 h-3 rounded-full bg-zinc-300 mr-2"></span>
                            Inactive
                          </p>
                          <p>
                            <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                            All other cases
                          </p>
                        </div>
                      </div>
                    }
                    placement="right"
                  >
                    <div className="cursor-help text-default-400 text-small">
                      ⓘ
                    </div>
                  </Tooltip>
                )}
              </div>
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={sortedItems}
          emptyContent={'No purchases to display.'}
        >
          {(item) => (
            <TableRow key={item.recentPurchase.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(
                    item.recentPurchase,
                    columnKey,
                    item.oldPurchases
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
