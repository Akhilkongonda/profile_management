import React from 'react'
import './Navigation.css'
import { Link, useLocation } from 'react-router-dom'
import { FiUsers } from 'react-icons/fi'
import { FaUsersSlash } from 'react-icons/fa'
import {RiUserShared2Line} from 'react-icons/ri';


function Navigation() {
  const location = useLocation();
  
  //two objects
  const activelink = {
    color: "#c7b4a3",
    fontSize: "1.2rem"
  }
  const inactivelink = {
    color: "white",
    fontSize: "1.2rem"
  }

  const isLinkActive = (path) => {
    return location.pathname === path;
  }

  return (
    <div className='navbar navbarmain'>
      <ul className='nav m-auto'>
      <li className='nav-item'>
          <Link className='nav-link navbarlink mx-4' style={isLinkActive('/') ? activelink : inactivelink} to="/">
            <RiUserShared2Line style={{ marginRight: '0.5rem' }} />
            AddUsers
          </Link>
        </li>
      
        
        <li className='nav-item'>
          <Link className='nav-link navbarlink mx-4' style={isLinkActive('/Users') ? activelink : inactivelink} to="/Users">
            <FiUsers style={{ marginRight: '0.5rem' }} />
            Users
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link navbarlink' style={isLinkActive('/RemovedUsers') ? activelink : inactivelink} to="/RemovedUsers">
            <FaUsersSlash style={{ marginRight: '0.5rem' }} />
            RemovedUsers
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navigation;
