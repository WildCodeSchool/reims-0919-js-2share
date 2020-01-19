import React from 'react'
import {
  NavLink,
} from 'react-router-dom'

const NavBar = (
) => {
  return (
    <nav>
      <NavLink to="/events">events</NavLink>
      <NavLink to="/todos">todos</NavLink>
      <NavLink to="/families">families</NavLink>
    </nav>
  )
}

export default NavBar