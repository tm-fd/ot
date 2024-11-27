"use server"

import React from 'react';
import { signIn } from "@/auth";
import { Input, Button } from '@nextui-org/react';
import { EyeSlashFilledIcon, EyeFilledIcon } from '@/components/icons';

export default async function SignIn() {
  // const [isVisible, setIsVisible] = React.useState(false);

  // const toggleVisibility = () => setIsVisible(!isVisible);

  const credentialsAction = async (formData: FormData) => {
    "use server";
    try {
      await signIn("credentials", formData)
    } catch (err) {
      console.log("error",err);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col p-4 mt-24 bg-default-50 rounded-lg shadow-lg max-[600px]:w-full">
      <h3 className="pt-4">Sign in</h3>
      <form action={credentialsAction} className="flex flex-col gap-4 p-3 max-[600px]:w-full">
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
            >
              {/* {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )} */}
            </button>
          }
          // type={isVisible ? 'text' : 'password'}
          className="lg:w-96 sm:w-64"
        />

        <Button color="secondary" type="submit">
          sign in
        </Button>
      </form>
    </div>
  );
}
