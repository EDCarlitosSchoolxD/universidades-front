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
            
            <section className="container flex flex-wrap w-full mt-8 justify-center gap-8">


                <Card href="#" className='w-full m-auto max-w-lg'>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Administrar estados
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Area administrativa de los estados
                    </p>
                    <Link className='bg-sky-900 text-zinc-100 text-center w-1/3  p-2 rounded-xl
                    hover:bg-sky-700 transition-all duration-200'
                    to="/admin/estados">Ingresar</Link>
                </Card>

                <Card href="#" className='w-full m-auto max-w-lg'>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Administrar estados
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Area administrativa de los estados
                    </p>
                    <Link className='bg-sky-900 text-zinc-100 text-center w-1/3  p-2 rounded-xl
                    hover:bg-sky-700 transition-all duration-200'
                    to="/admin/estados">Ingresar</Link>
                </Card>

                <Card href="#" className='w-full m-auto max-w-lg'>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Administrar estados
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Area administrativa de los estados
                    </p>
                    <Link className='bg-sky-900 text-zinc-100 text-center w-1/3  p-2 rounded-xl
                    hover:bg-sky-700 transition-all duration-200'
                    to="/admin/estados">Ingresar</Link>
                </Card>
               



            </section>

            



        
        </>

    )
}
