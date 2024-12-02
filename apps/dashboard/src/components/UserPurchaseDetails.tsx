'use client';
import { useCallback, useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tooltip
} from '@nextui-org/react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { VerticalDotsIcon } from './VerticalDotsIcon';
import OrderDetails from './OrderDetails';
import { PurchaseObj } from '../app/store/zustandStore';
import { EditIcon, DeleteIcon, EyeIcon } from "./icons";

export default function UserPurchaseDetails({
  purchase,
}: {
  purchase: PurchaseObj;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [errorMessage, setErorrMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      
        <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span onClick={onOpen} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon  />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
      {loading && (
        <Modal
          backdrop="blur"
          isOpen={isOpen}
          onClose={onClose}
          placement="top-center"
          classNames={{ closeButton: 'hidden' }}
          className="bg-transparent shadow-none"
          isDismissable={false}
          shadow="nonoe"
          isKeyboardDismissDisabled={true}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody className="flex flex-col h-20">
                  <Spinner size="lg" color="secondary" />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
      <Modal
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <div className="h-20">
                <AnimatePresence initial={false} mode="wait">
                  {errorMessage && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 50, scale: 0.3 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0.5,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <ModalHeader
                        className={`flex flex-col gap-1 ${
                          isSubmitted
                            ? 'bg-green-500 text-green-50'
                            : 'bg-warning-100 text-warning-700'
                        }`}
                      >
                        {errorMessage}
                      </ModalHeader>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <ModalBody className="pt-14">
                <OrderDetails purchase={purchase} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
