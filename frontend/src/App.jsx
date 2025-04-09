import { useState } from 'react'
import './App.css'
import { SignUp } from './pages/SignUp'
import {SignIn} from './pages/SignIn'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/SendMoney'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp></SignUp>}/>
        <Route path="/signin" element={<SignIn></SignIn>}/>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}/>
        <Route path="/send" element={<SendMoney></SendMoney>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
