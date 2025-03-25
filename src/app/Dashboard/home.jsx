"use client";  // ✅ Important for Next.js Client Components
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Correct import
import { getSession } from 'next-auth/react';
import Outer_Navbar from '../../components/Outer_Navbar';
import AuthForm from './auth';
import Dashboard from './dashboard';
import Outer_Footer from '../../components/Outer_Footer';

function Landing_Page() {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.push('/homepage'); // ✅ Correct way to navigate
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
