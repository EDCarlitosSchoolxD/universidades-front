import React from 'react'
import { Navegacion } from '../../components/Navegacion/Navegacion'
import { Link } from 'react-router-dom'
import './admin.css'

export const Admin = () => {

    console.log(process.env.API)

  return (
        <>
            <Navegacion/>
            
            <section className="container admin-administrar">

                <div className='administrar--item'>
                    <h2>Administrar Estados de Mexico</h2>
                    <Link to="/admin/estados">Administrar</Link>
                </div>

                <div className='admin-administrar--item'>
                    <h2>Administrar Municipios de Mexico</h2>
                    <Link to="/admin/municipios">Administrar</Link>
                </div>

                <div className='admin-administrar--item'>
                    <h2>Administrar Universidades de Mexico</h2>
                    <Link to="/admin/universidades">Administrar</Link>
                </div>

                


            </section>

            



        
        </>

    )
}
