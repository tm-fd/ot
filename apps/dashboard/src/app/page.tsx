import { Button } from '@nextui-org/button'
import { Card, CardBody } from '@nextui-org/card'
import Image from 'next/image'
import { auth } from "@/auth";

import AuthButton from "./AuthButton.server";

export default async function Home() {
  const session = await auth();

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <section className='py-36'>
      <div className='container flex items-center justify-center'>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <AuthButton />
      </div>
    </section>
  );
}
