'use client';

import React, { useState, useEffect } from 'react';
import { Input, Button, Spinner } from '@nextui-org/react';
import { EyeSlashFilledIcon, EyeFilledIcon } from '@/components/icons';
import { doCredentialLogin } from '@/actions';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import usePurchaseStore from '@/app/store/purchaseStore';
import { useSession } from 'next-auth/react';



export default function SignIn() {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const { reset } = usePurchaseStore();
  const { data: session, status } = useSession();
  
  
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/purchases');
    }
  }, [status, session, router]);


   const handleCredentialLogin = async (event) => {
    event.preventDefault();
    reset();
    try {
      const formData = new FormData(event.currentTarget);
      startTransition( async () => {
        const response = await doCredentialLogin(formData)
        console.log(response)
      if (!response) {
        setError("Check your email or password");
      }else{
        //  router.push('/purchases')
      }
      })
    } catch (err) {
      console.error(err)
      setError("Check your Credentials");
    }
  }

  if (status === 'loading') {
    return <Spinner size="lg" color='secondary' />;
  }
  

  return (
    <div className="flex justify-center items-center flex-col p-4 mt-24 bg-default-50 rounded-lg shadow-lg max-[600px]:w-full">
      <h3 className="pt-4">Sign in</h3>
      <div className="text-md text-red-500">{error}</div>
      <form onSubmit={handleCredentialLogin} className="flex flex-col gap-4 p-3 max-[600px]:w-full">
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

        <Button color="secondary" type="submit" className='text-white' disabled={isPending}>
          sign in
        </Button>
      </form>
    </div>
  );
}
