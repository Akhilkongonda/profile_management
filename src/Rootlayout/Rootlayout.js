import React from 'react'
import Navigation from '../Components/Navigationbar/Navigation'
import {Outlet} from 'react-router-dom'; 
import './Rootlayout.css'



export default function Rootlayout() {
  return (
    <div className="outlet">
      <Navigation/>
      <Outlet/>
        
    </div>
  )
}
