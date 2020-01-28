import React from 'react'
import {
  NavLink,
} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faListAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons'

const NavBar = (
) => {
  return (
    <nav className="flex:row flex-main:space-around border-top:1">
      <NavLink to="/events" className="navLink flex:1 space:inset text:center"><FontAwesomeIcon icon={ faCalendarAlt } size="2x" /><br />Agenda</NavLink>
      <NavLink to="/todos" className="navLink flex:1 space:inset text:center"><FontAwesomeIcon icon={ faListAlt } size="2x" /><br />Tâches</NavLink>
      <NavLink to="/families" className="navLink flex:1 space:inset text:center"><FontAwesomeIcon icon={ faUserFriends } size="2x" /><br />Familles</NavLink>
    </nav>
  )
}

export default NavBar;