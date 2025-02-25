import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Card from './components/card'
import LowerNavbar from './components/LowerNavbar'
export default function App() {
  return (
    <>
    <Navbar/>
    <LowerNavbar/>
    <Card/>
    </>
  );
}

