'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const EmailVerificationError = () => {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div className="verification-error">
      <h1>Email Verification Failed</h1>
      <p>{error || 'An error occurred during email verification.'}</p>
      <button onClick={() => router.push('/signin')}>
        Go to Login Page
      </button>
    </div>
  );
};

export default EmailVerificationError;