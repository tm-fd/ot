'use client';

import React, { useState, useEffect } from 'react';
import {
  Input,
  Button,
  Spinner,
  Form,
  Card,
  CardBody,
  CardHeader,
} from '@nextui-org/react';
import { EyeSlashFilledIcon, EyeFilledIcon } from '@/components/icons';
import { doCredentialLogin } from '@/actions';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import usePurchaseStore from '@/app/store/purchaseStore';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SignIn() {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();
  const { reset } = usePurchaseStore();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/purchases');
    }
  }, [status, session, router]);

  const handleCredentialLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    reset();
    try {
      const formData = new FormData(event.currentTarget);
      startTransition(async () => {
        const response = await doCredentialLogin(formData);
        console.log(response);

        if (response.error) {
          setError(response.error);
        } else if (response.success) {
          // Force a router refresh to update the session
          router.refresh();
          router.push('/purchases');
        }
      });
    } catch (err) {
      console.error(err);
      setError('Check your Credentials');
    }
  };

  if (status === 'loading') {
    return <Spinner size="lg" color="secondary" />;
  }

  return (
    <div className="flex justify-center items-center flex-col p-4 mt-24 bg-default-50 rounded-lg shadow-lg max-[600px]:w-full">
      <Card className="flex justify-center items-center flex-col p-4 bg-default-50 shadow-lg max-[600px]:w-full">
        <CardHeader className="flex gap-3">
          <h1 className="text-xl font-bold">Sign in</h1>
        </CardHeader>
        <CardBody>
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.3,
                    ease: 'easeOut',
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  transition: {
                    duration: 0.2,
                    ease: 'easeIn',
                  },
                }}
                className="text-md text-red-500 p-2g mb-4 text-center"
              >
                <motion.span
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="inline-block mr-2"
                >
                  ⚠️
                </motion.span>
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          <Form
            className="flex flex-col gap-4 max-[600px]:w-full"
            validationErrors={error}
            onSubmit={handleCredentialLogin}
          >
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
              className="lg:w-96 sm:w-64"
            />
            <Input
              name="password"
              label="Password"
              variant="bordered"
              placeholder="Enter password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  aria-label="toggle password visibility"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? 'text' : 'password'}
              className="lg:w-96 sm:w-64"
            />

            <Button
              color="secondary"
              type="submit"
              className={`
                            text-white 
                            lg:w-96 
                            sm:w-64 
                            transition-all 
                            duration-300
                            ${isPending ? 'opacity-75 cursor-not-allowed' : ''}
                          `}
              disabled={isPending}
            >
              Sign in
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
