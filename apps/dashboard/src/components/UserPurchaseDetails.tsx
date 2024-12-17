'use client';
import { useCallback, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
  Input,
} from '@nextui-org/react';
import { motion, AnimatePresence } from 'framer-motion';
import OrderDetails from './OrderDetails';
import { PurchaseObj } from '../app/store/purchaseStore';
import { EditIcon, DeleteIcon, EyeIcon } from './icons';
import { useEditPurchase } from '@/app/hooks';
import { mutate } from 'swr';
import { useAdditionalInfo } from '@/app/hooks';


export default function UserPurchaseDetails({
  purchase,
}: {
  purchase: PurchaseObj;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errorMessage, setErorrMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editedPurchase, setEditedPurchase] = useState(purchase);
  const { updatePurchase } = useEditPurchase();

  const {
    additionalInfos,
    editAdditionalInfo,
    saveAdditionalInfo
  } = useAdditionalInfo(purchase.id);

  

  const handleEditClick = () => {
    onOpen();
    setIsEditing(true);
  };

  const handleViewClick = () => {
    onOpen();
    setIsViewing(true);
  };

  const handleInputChange = (field: keyof PurchaseObj, value: any) => {
    setEditedPurchase((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedPurchase = await updatePurchase(purchase.id, editedPurchase);
        console.log(additionalInfos, editedPurchase)
      // Update additional info
      if (additionalInfos.length > 0) {
        await saveAdditionalInfo();
      }

      if (updatedPurchase) {
        setIsSubmitted(true);
        setErorrMessage('The purchase has been updated successfully');
        mutate(['/purchases', params]);
        setTimeout(() => {
          setErorrMessage(null);
          setIsSubmitted(false);
          setIsEditing(false);
          onClose();
        }, 4000);
      }
    } catch (error) {
      console.error('Failed to update purchase:', error);
      setErorrMessage(`Failed to update purchase: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedPurchase(purchase);
    onClose();
    setIsEditing(false);
    setIsViewing(false);
  };

  const onOpenChange = useCallback(() => {
    setIsEditing(false);
    setIsViewing(false);
    onClose();
  }, []);
 

  return (
    <>
      <div className="relative flex items-center gap-2">
        <span
          onClick={handleViewClick}
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
        >
          <EyeIcon />
        </span>
        <span
          onClick={handleEditClick}
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
        >
          <EditIcon />
        </span>
        {/* <span className="text-lg text-danger cursor-pointer active:opacity-50">
            <DeleteIcon />
          </span> */}
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
        scrollBehavior={'inside'}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {isEditing && (
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
              )}
              <ModalBody className="pt-14">
                <>
                  {isViewing && <OrderDetails purchase={purchase} />}
                  {isEditing && (
                    <div className="flex flex-col gap-4 w-full">
                      <div className="grid grid-cols-2 gap-4">
                        {/* <Input
                              label="First Name"
                              value={editedPurchase.first_name}
                              onChange={(e) => handleInputChange('first_name', e.target.value)}
                            />
                            <Input
                              label="Last Name"
                              value={editedPurchase.last_name}
                              onChange={(e) => handleInputChange('last_name', e.target.value)}
                            /> */}
                        <Input
                          label="Email"
                          value={editedPurchase.email}
                          onChange={(e) =>
                            handleInputChange('email', e.target.value)
                          }
                        />
                        <Input
                          label="Code"
                          value={editedPurchase.confirmationCode}
                          onChange={(e) =>
                            handleInputChange(
                              'confirmationCode',
                              e.target.value
                            )
                          }
                        />
                        <Input
                          type="number"
                          label="Duration"
                          value={editedPurchase.duration.toString()}
                          onChange={(e) =>
                            handleInputChange(
                              'duration',
                              parseInt(e.target.value)
                            )
                          }
                        />
                        <Input
                          type="number"
                          label="Number of Licenses"
                          value={editedPurchase.numberOfLicenses.toString()}
                          onChange={(e) =>
                            handleInputChange(
                              'numberOfLicenses',
                              parseInt(e.target.value)
                            )
                          }
                        />
                        {/* <Input
                          type="number"
                          label="Number of VR Glasses"
                          value={editedPurchase.number_of_vr_glasses.toString()}
                          onChange={(e) => handleInputChange('number_of_vr_glasses', parseInt(e.target.value))}
                        /> */}
                        <Input
                          label="Order Number"
                          value={editedPurchase.orderNumber}
                          onChange={(e) =>
                            handleInputChange('orderNumber', e.target.value)
                          }
                        />
                        {/* <Checkbox
                        isSelected={editedPurchase.is_subscription}
                        onChange={(checked) => handleInputChange('is_subscription', checked)}
                      >
                        Is Subscription
                      </Checkbox> */}
                      {additionalInfos.map((pi, index) => (
                        <Input
                        key={index}
                        label="Additional info"
                        value={pi.info}
                        onChange={(e) =>
                          editAdditionalInfo(pi.id, e.target.value)
                        }
                      />  
                   ))}
                      </div>
                    </div>
                  )}
                </>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  disabled={loading}
                  variant="flat"
                  onPress={handleCancel}
                >
                  {isEditing ? 'Cancel' : 'Close'}
                </Button>
                {isEditing && (
                  <Button
                    disabled={loading}
                    onClick={handleSave}
                    isLoading={loading}
                    className="bg-blue-700"
                  >
                    Save
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
