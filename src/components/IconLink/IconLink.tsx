import React from 'react'
import './IconLink.css'

export const IconLink = (props) => {
  return (
    <a className='iconLink' href={props.href}>{props.icon}</a>
  )
}
