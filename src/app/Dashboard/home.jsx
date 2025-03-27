"use client"; 
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import AuthForm from './auth';
import Dashboard from './dashboard';

function Landing_Page() {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      console.log("Session is " , session);
      if (session) {
        router.push('/homepage');
      }
    });
  }, []);

  return (
    <div>
      <div id="dashboard"><Dashboard /></div>
      <div id="auth"><AuthForm /></div>
    </div>
  );
}

export default Landing_Page;
