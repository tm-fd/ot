'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EmailVerificationSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/signin');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="verification-success">
      <h1>Email Verified Successfully!</h1>
      <p>Redirecting to login page...</p>
    </div>
  );
};

export default EmailVerificationSuccess;