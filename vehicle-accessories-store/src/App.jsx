import { useState } from 'react'
import "./components/Signin"
import UpperNavbar from './components/UpperNavbar'
import './App.css'
import Card from './components/card'
import LowerNavbar from './components/LowerNavbar'
import Signin from './components/Signin'
import VehicleSelection from './components/VehicleSelection'
// import Signin from './components/Signin'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
    {/* <Navbar/> */}
    <UpperNavbar/>
    <VehicleSelection/>
    <LowerNavbar/>
    <Card/>
    {/* <Signin/> */}
    
      
    {/* <Signin/> */}.
    <Footer/>
    
    </>
  );
}

