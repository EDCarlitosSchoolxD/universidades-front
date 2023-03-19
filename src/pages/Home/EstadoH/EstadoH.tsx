import React, { useEffect, useState } from 'react'
import { Navegacion } from '../../../components/Navegacion/Navegacion'
import { Link, useParams } from 'react-router-dom'
import { Estado } from '../../../classes/Estado';
import axios from 'axios';
import { Municipio } from '../../../classes/Municipio';

export const EstadoH = () => {
    const {estadoParams} = useParams();
    const [estado,setEstado] = useState<Estado|null>(null);
    const [municipios,setMunicipios] = useState<Municipio[]>([])

    console.log(estadoParams);

    useEffect(()=>{
        fetchEstado();
    }
    ,[estadoParams])

    async function fetchEstado(){
        try {
            
            const peticion = await axios.get(`${import.meta.env.VITE_APP_API}estados/slug/${estadoParams}`)
            const response = await peticion.data;
            setEstado(response);
            fetchMunicipios(response.id)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    async function fetchMunicipios(id:number) {
        try {
            
            const peticion = await axios.get(`${import.meta.env.VITE_APP_API}municipios/estado/${id}`)
            const response = await peticion.data;
            setMunicipios(response);
        } catch (error) {
            console.log(error);
            
        }
    }

    
  return (
        <>
            <Navegacion />

            <div className="container-lg">
            <h3 className="text-center text-5xl mt-10 font-normal">Municipios de {estado?.nombre}</h3>
            <div className="flex flex-wrap justify-evenly gap-5 mt-10">

            {municipios.map(muni => (
            <div key={muni.nombre} className="mt-5 max-w-sm rounded overflow-hidden shadow-lg">
                <img  loading='lazy' className='card--imagen'  src={muni.image?.ruta} alt={muni.estado?.nombre} />
                <div className="px-6 py-4 text-center">
                    <h3 className="text-xl">{muni.nombre}</h3>
                </div>
                <div className="px-6 pt-4 pb-4 text-center">
                    <Link to={`/universidades/${muni.slug}`}
                    className="bg-slate-800 hover:bg-slate-700 text-center inline-block px-6 w-full pt-4 pb-4 text-white">
                    Ver universidades</Link>
                </div>

            </div>)

            )}
                    
            </div>
            </div>


        </>
    )
}
