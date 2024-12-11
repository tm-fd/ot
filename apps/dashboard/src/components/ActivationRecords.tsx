'use client';
import { useState, useMemo } from 'react';
import {
  Link,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Input,
} from '@nextui-org/react';
import { SearchIcon } from './icons'; // Make sure to import or create this icon

interface UserFirestoreData {
  Email?: string;
  FirstName?: string;
}

interface ActivationRecord {
  id: number;
  purchase_id: number;
  activation_date: string;
  updated_at: string;
  user_id: number;
  user: {
    id: number;
    uuid: string;
    registered_on: string;
    starred: boolean;
    type: string;
    deleted: boolean;
  };
  firestoreData?: UserFirestoreData;
}

interface ActivationRecordsProps {
  activationRecords: ActivationRecord[];
  activationError: string | null;
  isLoading?: boolean;
}

export default function ActivationRecords({
  activationRecords,
  activationError,
}: ActivationRecordsProps) {
  const [filterValue, setFilterValue] = useState('');
  const columns = [
    { name: 'NAME', uid: 'name' },
    { name: 'EMAIL', uid: 'email' },
    { name: 'ACTIVATION DATE', uid: 'activation_date' },
    { name: 'USER ID', uid: 'user_id' },
  ];

  const filteredItems = useMemo(() => {
    let filteredRecords = [...activationRecords];
    console.log(activationRecords);
    if (filterValue) {
      filteredRecords = filteredRecords.filter((record) => {
        const searchValue = filterValue.toLowerCase();
        if (record) {
          return (
            new Date(record.activation_date)
              .toLocaleDateString()
              .toLowerCase()
              .includes(searchValue) ||
            record.user.uuid.toLowerCase().includes(searchValue) ||
            (record.firestoreData?.FirstName || '')
              .toLowerCase()
              .includes(searchValue) ||
            (record.firestoreData?.Email || '')
              .toLowerCase()
              .includes(searchValue)
          );
        }
      });
    }

    return filteredRecords;
  }, [activationRecords, filterValue]);

  const onSearchChange = (value: string) => {
    setFilterValue(value);
  };

  const renderTopContent = () => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by activation date, user ID, name, or email..."
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            onValueChange={onSearchChange}
            size="sm"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {filteredItems.length} activation records
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mb-4">
      {activationError ? (
        <p className="text-red-500">{activationError}</p>
      ) : (
        <div className="w-full">
          <p className="font-medium mb-2">Activation Details</p>
          <Table
            aria-label="Activation records table"
            isHeaderSticky
            classNames={{
              wrapper: 'min-h-[200px]',
              th: 'bg-gray-50',
              td: 'py-3',
            }}
            topContent={renderTopContent()}
            topContentPlacement="outside"
            selectionMode="none"
            bordered
            shadow="sm"
            hoverable
            // loadingState={isLoading ? "loading" : "idle"}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === 'actions' ? 'center' : 'start'}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={filteredItems}
              emptyContent={'No activation records found'}
            >
              {(record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    {record.firestoreData?.FirstName || '-'}
                  </TableCell>
                  <TableCell>{record.firestoreData?.Email || '-'}</TableCell>
                  <TableCell>
                    {new Date(record.activation_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link
                      isExternal
                      color="primary"
                      href={`${process.env.IMVI_USERS_URL}/${record.user.uuid}`}
                      className="text-xs"
                    >
                      {record.user.uuid}
                    </Link>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
