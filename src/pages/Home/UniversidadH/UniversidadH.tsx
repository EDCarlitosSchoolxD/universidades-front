import React, { useEffect, useState } from 'react'
import { Navegacion } from '../../../components/Navegacion/Navegacion'
import { useParams } from 'react-router-dom'
import { Universidad } from '../../../classes/Universidad';
import { Carrera } from '../../../classes/Carrera';
import axios from 'axios';
import { GoogleMapComponent } from '../../../components/GoogleMapComponent/GoogleMapComponent';
import { Tabs } from 'flowbite-react';
import { Footer } from '../../../components/Footer/Footer';

export const UniversidadH = () => {
    const {universidadParams} = useParams();
    const [cordenate,setCordenates] = useState({lat:21.2899187,lng:-99.3845342})
    
    const [universidadS,setUniversidadS] = useState<Universidad|null>(null);
    const [carreras,setCarreras] = useState<Carrera[]>([])
  
  
    useEffect(()=>{
        fetchUniversidad();
    }
    ,[])
  
    async function fetchUniversidad(){
        try {
            
            const peticion = await axios.get(`${import.meta.env.VITE_APP_API}universidades/slug/${universidadParams}`)
            const response = await peticion.data;
  
            setUniversidadS(response);
            fetchUniversidades(response.id)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    async function fetchUniversidades(id:number) {
        try {
            
            const peticion = await axios.get(`${import.meta.env.VITE_APP_API}carreras/uni/${id}`)
            const response = await peticion.data;
            setCarreras(response);
            console.log(response);
            
        } catch (error) {
            console.log(error);
            
        }
    }




  return (
        <>
            <Navegacion />
        
            <div className='grid w-11/12 uni--info uni--info mx-auto gap-5'>
        <div className='flex flex-col gap-10'>
          <h1 className='font-bold text-5xl text-center my-10'>{universidadS?.nombre}</h1>
          <p className='font-bold text-3xl text-center mb-10'>{universidadS?.municipio?.nombre}</p>
          {universidadS?.web?(
          <a href={universidadS?.web} target='_BLANK' className="font-bold text-center text-2xl text-blue-600 dark:text-blue-500 hover:underline">Pagina Web Oficial</a>
          ):""}
          <img className='w-full  h-image drop-shadow-xl object-cover'  src={universidadS?.image?.ruta} alt="" />
          
          <div className='w-full  h-image drop-shadow-xl' >
            <GoogleMapComponent className="max-w-5xl"  center={cordenate} />
          </div>
        </div>
     

        <div className='mt-6 px-8 list-disc'>
            <h2 className='text-center mb-6 text-3xl font-bold'>{carreras[0]?.nombre}</h2>
        
        <Tabs.Group className='justify-center '
            aria-label="Pills"
            style="underline"
            >
            
            <Tabs.Item 
                active={true}
                title="Descripcion"
            >
                <div dangerouslySetInnerHTML={{__html: carreras[0]?.descripcion}}className='text-2xl max-w-7xl mx-auto' />
                    

            </Tabs.Item>
            <Tabs.Item  title="Objetivo">

                <div dangerouslySetInnerHTML={{__html: carreras[0]?.objetivo}}className='text-2xl max-w-7xl mx-auto' />
            </Tabs.Item>

            <Tabs.Item  title="Aprendizaje">
                <div dangerouslySetInnerHTML={{__html: carreras[0]?.aprendizaje}}className='text-2xl max-w-7xl mx-auto' />
                
            </Tabs.Item>
            <Tabs.Item  title="Trabajo">
                <div dangerouslySetInnerHTML={{__html: carreras[0]?.trabajo}}className='text-2xl max-w-7xl mx-auto' />

            </Tabs.Item>
            <Tabs.Item 
                title="Perfil de Ingreso"
            >
                <div dangerouslySetInnerHTML={{__html: carreras[0]?.perfilIngreso}}className='text-2xl max-w-7xl mx-auto' />

            </Tabs.Item>


            <Tabs.Item 
                title="Perfil de Egreso"
            >
                <div dangerouslySetInnerHTML={{__html: carreras[0]?.perfilEgreso}}className='text-2xl max-w-7xl mx-auto' />
                
            </Tabs.Item>


            <Tabs.Item 
                title="Plan de estudio"
            >
                <div dangerouslySetInnerHTML={{__html: carreras[0]?.perfilEgreso}}className='text-2xl max-w-7xl mx-auto' />
            </Tabs.Item>

        </Tabs.Group>


        </div>
   



      </div>



            <Footer />

        </>

    )
}
