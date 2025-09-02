"use client"
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SignInPage() {
  const {status,data:session}=useSession()
  console.log(session)
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState(searchParams.get('error'));
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const callbackUrl = searchParams.get('callbackUrl') || '/profile';
      const result = await signIn('google', { 
        callbackUrl,
        redirect: false 
      });
      
      if (result?.error) {
        setError(result.error);
      } else {
        router.push(callbackUrl);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="signin-container">
      {error && (
        <div className="error-message">
          {error === 'AccessDenied' 
            ? "You don't have permission to access this account." 
            : "Authentication failed. Please try again."}
        </div>
      )}
      <div className='flex flex-col items-center justify-center text-white'>
        <div className='flex justify-center items-center shadow-lg shadow-slate-900 rounded-lg p-8 max-w-md w-full text-center'>
          <Image alt='Logo'
          src={'https://res.cloudinary.com/demf8vxpk/image/upload/v1744657916/static_images/z6cg49tnn7utgzd4yrwj.png'}
          width={40}  
          height={40}
          priority
          className="rounded-full"
           />
        </div>
        <h1 className='text-3xl font-semibold'>Welcome Back</h1>
        <p>Sign in to access your account and start your journey</p>
        <button 
        onClick={handleSignIn} 
        disabled={loading}
        className="flex bg-white items-centergap-4 mt-2 shadow-xl rounded-mdpl-3 mx-auto google-signin-button cursor-pointer"
      >
        <Image src={'/google.jpeg'}
        width={60}  
        height={60}
        alt='google logo'
        />
        <span className='bg-blue-500 text-white px-4 py-3 rounded-tr-md rounded-br-md'>{loading ? 'Signing in...' : 'Sign in with Google'}</span>
      </button>
      <div className='mt-6'>
        By signing in you agree to our{' '}
        <Link href={'/tos'} className='text-blue-500 hover:underline'>Terms of service</Link>{'  '}and{'  '}<Link href={'/privacy'}className='text-blue-500 hover:underline'>Privacy policy</Link>
      </div>
      
      </div>
      </div>
  );
}