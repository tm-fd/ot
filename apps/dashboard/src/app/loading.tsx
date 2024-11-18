import {
    Spinner,
  } from '@nextui-org/react';

export default function Loading() {
    // Or a custom loading skeleton component
    return <div className='flex justify-center items-center h-screen w-full'><Spinner size="lg" color='secondary' /></div>
  }