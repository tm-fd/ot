'use client';

import React, { useEffect, useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { EyeSlashFilledIcon, EyeFilledIcon } from '@/components/icons';
import { doCredentialLogin } from '@/actions';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import usePurchaseStore from '@/app/store/zustandStore';

export default function SignIn() {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter()
  const [error, setError] = useState("");
  const [ isPending, startTransition ] = useTransition();
  const { reset } = usePurchaseStore();
  


   const handleCredentialLogin = async (event) => {
    event.preventDefault();
    reset();
    try {
      const formData = new FormData(event.currentTarget);
      startTransition( async () => {
        const response = await doCredentialLogin(formData)
        
      if (!response) {
        setError("Check your email or password");
      }else{
         router.replace('/purchases')
      }
      })
    } catch (err) {
      console.error(err)
      setError("Check your Credentials");
    }
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
