import React from 'react'
import './BotonVerde.css'
export const BotonMasInformacion = (props) => {
  return (
        <a  className='boton-verde' href={props.href}>{props.texto}</a>    
  )
}
