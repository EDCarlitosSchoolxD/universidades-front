import React from 'react'
import { BotonMasInformacion, BotonVerde } from '../BotonMasInformacion/BotonMasInformacion'
import './CardUniversidad.css'

export const Card = (props) => {
  return (
        <div className='card'>
            <img src={props.image} alt={props.universidad} />

            <div className='card-informacion'>
                <h2>{props.titulo}</h2>

                {props.children}
                <BotonMasInformacion texto={props.texto} href=""/>
            </div>
            
        </div>

  )
}
