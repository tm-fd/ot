'use client';
import { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Select,
  SelectSection,
  SelectItem,
} from '@nextui-org/react';
import { MailIcon, LockIcon } from './icons';
import axios from 'axios';

export default function AddOrder() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [purchaseType, setPurchaseType] = useState(false);
  const durations = [
    {
      key: '84',
      label: 'Start package',
    },
    {
      key: '30',
      label: 'Subscription',
    },
  ];
  const { duration, setDuration } = useState(new Set([]));
  const [email, setEmail] = useState(null);
  const [firstName, setFistname] = useState(null);
  const [lastName, setLastname] = useState(null);
  const [code, setCode] = useState(null);
  const [numberOfVrGlasses, setNumberOfVrGlasses] = useState(null);
  const [numberOfLicenses, setNumberOfLicenses] = useState(null);
  const [isSubscription, setIsSubscription] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErorrMessage] = useState(null);

  useEffect(() => {
    console.log(email);
  }, [email]);

  const submitPurchse = async () => {
    const purchaseObj = {
        email,
        firstName,
        lastName,
        code,
        numberOfVrGlasses,
        numberOfLicenses,
        isSubscription,
        duration,
        orderNumber,
      }        
console.log(purchaseObj)
    const res = await axios.post(`http://localhost:3000/add-order`, 
      purchaseObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    if (res.status !== 200) {
      setErorrMessage("Error: Somthing went wrong, please retry..." + res.status);
    }else{
        const data = await res.json();
        setIsSubmitted(true);
        console.log(data);
    }
  };

  return (
    <>
      <Button onPress={onOpen} className="bg-blue-700">
        Add purshase
      </Button>
      <Modal
        size="full"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {errorMessage && <ModalHeader className="flex flex-col gap-1 bg-warning-100 text-warning-700">{errorMessage}</ModalHeader>}
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  variant="bordered"
                  errorMessage="Please enter a valid email"
                  value={email}
                  onValueChange={setEmail}
                />
                <Input
                  autoFocus
                  label="First name"
                  variant="bordered"
                  value={firstName}
                  onValueChange={setFistname}
                />
                <Input
                  autoFocus
                  label="Last name"
                  variant="bordered"
                  value={lastName}
                  onValueChange={setLastname}
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Confirmation code"
                  variant="bordered"
                  value={code}
                  onValueChange={setCode}
                />
                <Input
                  autoFocus
                  label="Number of VR glasses"
                  variant="bordered"
                  value={numberOfVrGlasses}
                  onValueChange={setNumberOfVrGlasses}
                />
                <Input
                  autoFocus
                  label="Number of Licenses"
                  variant="bordered"
                  value={numberOfLicenses}
                  onValueChange={setNumberOfLicenses}
                />
                <Checkbox
                  autoFocus
                  isSelected={isSubscription}
                  onValueChange={setIsSubscription}
                >
                  Is Subscription
                </Checkbox>
                <Select
                  label="Duration"
                  placeholder="Select an duration"
                  defaultSelectedKeys={['84']}
                  selectedKeys={duration}
                  className="max-w-xs"
                  onSelectionChange={setDuration}
                >
                  {durations.map((d: any) => (
                    <SelectItem key={d.key}>{d.label}</SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={submitPurchse}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
