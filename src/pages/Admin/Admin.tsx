import React from 'react'
import { Navegacion } from '../../components/Navegacion/Navegacion'
import { Link } from 'react-router-dom'
import './admin.css'
import { Card } from 'flowbite-react'

export const Admin = () => {

    console.log(process.env.API)

  return (
        <>
            <Navegacion/>
            
            <section className="container flex flex-wrap  w-full mt-8  gap-8">


                <Card href="/admin/estados" className='w-11/12 m-auto max-w-2xl py-8 flex justify-center items-center flex-col'>
                    <h5 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Administrar estados
                    </h5>
                    <p className="font-normal text-2xl text-gray-700 dark:text-gray-400">
                        Area administrativa de los estados
                    </p>
                    <Link className='bg-sky-900 w-full text-2xl text-zinc-100 text-center   p-2 rounded-xl
                    hover:bg-sky-700 transition-all duration-200'
                    to="/admin/estados">Ingresar</Link>
                </Card>

                <Card href="/admin/municipios" className='w-11/12 m-auto max-w-2xl py-8 flex justify-center items-center flex-col'>
                    <h5 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Administrar Municipios
                    </h5>
                    <p className="font-normal text-2xl text-gray-700 dark:text-gray-400">
                        Area administrativa de los municipios
                    </p>
                    <Link className='bg-sky-900 w-full text-2xl text-zinc-100 text-center   p-2 rounded-xl
                    hover:bg-sky-700 transition-all duration-200'
                    to="/admin/municipios">Ingresar</Link>
                </Card>

                <Card href="/admin/universidades" className='w-11/12 m-auto max-w-2xl py-8 flex justify-center items-center flex-col'>
                    <h5 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Administrar Universidades
                    </h5>
                    <p className="font-normal text-2xl text-gray-700 dark:text-gray-400">
                        Area administrativa de las universidades
                    </p>
                    <Link className='bg-sky-900 w-full text-2xl text-zinc-100 text-center   p-2 rounded-xl
                    hover:bg-sky-700 transition-all duration-200'
                    to="/admin/universidades">Ingresar</Link>
                </Card>

               

                
               



            </section>

            



        
        </>

    )
}
