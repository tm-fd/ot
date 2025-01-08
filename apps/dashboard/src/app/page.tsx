import { Button } from '@nextui-org/button'
import { Card, CardBody } from '@nextui-org/card'
import Image from 'next/image'
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <section className='py-36'>
      <div className='container flex items-center justify-center'>
      </div>
    </section>
  );
}
