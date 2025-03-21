import React from 'react'
import Outer_Navbar from '../Outer_Navbar'
import AuthForm from './auth'
import Dashboard from './dashboard'
import Outer_Footer from '../Outer_Footer'

function Landing_Page() {
  return (
    <div>
      <Outer_Navbar />
      <div id = "dashboard"> <Dashboard/> </div>
      <div id="auth"> <AuthForm/>  </div>
      <Outer_Footer/>
    </div>
  )
}

export default Landing_Page;
