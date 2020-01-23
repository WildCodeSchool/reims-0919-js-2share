import React from 'react'
import {
  NavLink,
} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faListAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons'

const NavBar = (
) => {
  return (
    <nav className="flex:row flex-main:space-around">
      <NavLink to="/events" className="navLink"><FontAwesomeIcon icon={ faCalendarAlt } size="3x" color="#0155A6"/><br />Agenda</NavLink>
      <NavLink to="/todos" className="navLink"><FontAwesomeIcon icon={ faListAlt } size="3x" color="#0155A6"/><br />Tâches</NavLink>
      <NavLink to="/families" className="navLink"><FontAwesomeIcon icon={ faUserFriends } size="3x" color="#0155A6"/><br />Familles</NavLink>
    </nav>
  )
}

export default NavBar;