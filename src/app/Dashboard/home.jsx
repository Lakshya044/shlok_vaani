import React from 'react'
import Outer_Navbar from '../../components/Outer_Navbar'
import AuthForm from './auth'
import Dashboard from './dashboard'
import Outer_Footer from '../../components/Outer_Footer'

function Landing_Page() {
  return (
    <div>
      <div id = "dashboard"> <Dashboard/> </div>
      <div id="auth"> <AuthForm/>  </div>
    </div>
  )
}

export default Landing_Page;
