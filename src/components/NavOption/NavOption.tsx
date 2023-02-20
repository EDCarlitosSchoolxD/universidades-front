import React from 'react'
import { Link } from 'react-router-dom'
import './NavOption.css'
export const NavOption = (props) => {
  return (
    <Link className='nav-option'  to={props.href} >{props.text}</Link>

  )
}
