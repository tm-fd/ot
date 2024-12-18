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
  Checkbox,
  Input,
  Select,
  SelectSection,
  SelectItem,
  Spinner,
} from '@nextui-org/react';
import axios from 'axios';
import cryptoRandomString from 'crypto-random-string';
import Joi from 'joi';
import { motion, AnimatePresence } from 'framer-motion';
import { useSWRConfig } from 'swr';

export default function AddPurchase({ currentPage }) {
  const { mutate } = useSWRConfig();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [duration, setDuration] = useState('');
  const startPackage = [
    {
      key: '84',
      label: '12 weeks',
    },
    {
      key: '30',
      label: 'Subscription',
    },
  ];

  const continueTraining = [
    {
      key: '42',
      label: '6 weeks',
    },
    {
      key: '8 4',
      label: '12 weeks',
    },
    {
      key: '180',
      label: '6 months',
    },
    {
      key: '360',
      label: '12 months',
    },
  ];
  const [email, setEmail] = useState('');
  const [firstName, setFistname] = useState('');
  const [lastName, setLastname] = useState('');
  const [numberOfVrGlasses, setNumberOfVrGlasses] = useState('');
  const [numberOfLicenses, setNumberOfLicenses] = useState('');
  const [isSubscription, setIsSubscription] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelectionChange = (e: any) => {
    setDuration(e.target.value);
  };

  function JoiValidatePurchase(obj: any) {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: false } })
        .required()
        .trim()
        .messages({
          'string.email': `Email must be valid`,
          'string.required': `Email is required`,
        }),
      firstName: Joi.string().required().messages({
        'string.required': `First Name is required`,
      }),
      lastName: Joi.string().required().messages({
        'string.required': `Last Name is required`,
      }),
      numberOfVrGlasses: Joi.number().min(0).max(1000).required().messages({
        'number.min': `Number of VR glasses must be greater than or equal to 0`,
        'number.required': `Number of VR glasses is required`,
      }),
      numberOfLicenses: Joi.number().min(1).max(1000).required().messages({
        'number.required': `Number of Licenses is required`,
        'number.min': `Number of Licenses must be greater than or equal to 1`,
      }),
      duration: Joi.number().min(1).required().messages({
        'number.min': `Duration is required`,
      }),
      code: Joi.string().required(),
      orderNumber: Joi.string().required(),
      isSubscription: Joi.boolean().required(),
      additionalInfo: Joi.string().allow('').optional(),
    });
    // returns the schema and validates whatever obj we put in
    return schema.validate(obj);
  }

  const submitPurchase = useCallback(async () => {
    const orderNumber = cryptoRandomString({ length: 10, type: 'numeric' });
    const code = cryptoRandomString({ length: 4, type: 'alphanumeric' });

    const purchaseObj = {
      email,
      firstName,
      lastName,
      code,
      numberOfVrGlasses: numberOfVrGlasses ? Number(numberOfVrGlasses) : -1,
      numberOfLicenses: Number(numberOfLicenses),
      isSubscription,
      duration: Number(duration),
      orderNumber,
    };
    const { error } = JoiValidatePurchase(purchaseObj);

    if (error) {
      setErrorMessage(error.details[0].message);
      return;
    } else {
      setErrorMessage(null);
      setLoading(true);
    }

    try {
      const purchaseRes = await axios.post(
        `${process.env.CLOUDRUN_DEV_URL}/purchases/addPurchase`,
        purchaseObj
      );

      if (purchaseRes.status === 200) {
        const purchaseId = purchaseRes.data.id;

        if (additionalInfo) {
          console.log('additionalInfo:', additionalInfo, purchaseId);
          try {
            const additionalInfoRes = await axios.post(
              `${process.env.CLOUDRUN_DEV_URL}/purchases/additional-info/${purchaseId}`,
              { info: additionalInfo }
            );
            console.log(additionalInfoRes);
            if (
              additionalInfoRes.status !== 200 &&
              additionalInfoRes.status !== 201
            ) {
              throw new Error('Failed to add additional info');
            }
          } catch (additionalInfoError) {
            console.error('Error adding additional info:', additionalInfoError);
            setErrorMessage(
              'Purchase added, but failed to add additional info. Please try updating the purchase later.'
            );
            setLoading(false);
            return;
          }
        }

        setLoading(false);
        setIsSubmitted(true);
        mutate([
          '/purchases',
          {
            limit: 370,
            page: currentPage,
          },
        ]);
        setErrorMessage('The purchase has been added successfully');

        // Clear form fields
        setEmail('');
        setFistname('');
        setLastname('');
        setNumberOfVrGlasses('');
        setNumberOfLicenses('');
        setIsSubscription(false);
        setDuration('');
        setAdditionalInfo('');

        setTimeout(() => {
          setErrorMessage(null);
          setIsSubmitted(false);
          setAdditionalInfo(''); // Clear the additional info field
        }, 4000);
      } else {
        throw new Error(
          `Error: Something went wrong, response status code ${purchaseRes.status}`
        );
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setErrorMessage(
          `Error: ${error.response.data.message || 'Server error'}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage(
          'Error: No response from server. Please check your internet connection.'
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage(`Error: ${error.message}`);
      }
    }
  }, [
    email,
    firstName,
    lastName,
    numberOfVrGlasses,
    numberOfLicenses,
    isSubscription,
    duration,
    additionalInfo,
    mutate,
  ]);

  const handleInputChange = (e) => {
    setErrorMessage(null);
  };

  return (
    <>
      <Button onPress={onOpen} className="bg-blue-700">
        Add user
      </Button>
      {loading && (
        <Modal
          backdrop="blur"
          isOpen={isOpen}
          onClose={onClose}
          placement="top-center"
          classNames={{ closeButton: 'hidden' }}
          className="bg-transparent shadow-none"
          isDismissable={false}
          shadow="sm"
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
        size="lg"
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
              <ModalBody className="pt-5">
                <Input
                  autoFocus
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
                  onChange={handleInputChange}
                />
                <Input
                  autoFocus
                  label="Additional Info"
                  variant="bordered"
                  value={additionalInfo}
                  onValueChange={setAdditionalInfo}
                  onChange={handleInputChange}
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
                  selectedKeys={[duration]}
                  onChange={handleSelectionChange}
                  className="max-w-xs"
                >
                  <SelectSection showDivider title="Start Package">
                    {startPackage.map((d) => (
                      <SelectItem key={d.key}>{d.label}</SelectItem>
                    ))}
                  </SelectSection>
                  <SelectSection title="Continue Training">
                    {continueTraining.map((d) => (
                      <SelectItem key={d.key}>{d.label}</SelectItem>
                    ))}
                  </SelectSection>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-blue-700" onPress={submitPurchase}>
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
