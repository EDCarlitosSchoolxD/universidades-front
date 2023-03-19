import React from 'react'
import { useEffect,useState} from 'react';
import './universidades.css'
import { Navegacion } from '../../components/Navegacion/Navegacion';
import { Link, useParams } from 'react-router-dom';
import { Municipio } from '../../classes/Municipio';
import { Universidad } from '../../classes/Universidad';
import axios from 'axios';
export const Universidades = () => {
  const {municipioParams} = useParams();
  const [muncipio,setMunicipio] = useState<Municipio|null>(null);
  const [universidades,setUniversidades] = useState<Universidad[]>([])


  useEffect(()=>{
      fetchMunicipio();
  }
  ,[municipioParams])

  async function fetchMunicipio(){
      try {
          
          const peticion = await axios.get(`${import.meta.env.VITE_APP_API}municipios/slug/${municipioParams}`)
          const response = await peticion.data;

          setMunicipio(response);
          fetchUniversidades(response.id)
          
      } catch (error) {
          console.log(error);
          
      }
  }

  async function fetchUniversidades(id:number) {
      try {
          
          const peticion = await axios.get(`${import.meta.env.VITE_APP_API}universidades/municipio/${id}`)
          const response = await peticion.data;
          setUniversidades(response);
          console.log(response);
          
      } catch (error) {
          console.log(error);
          
      }
  }


  return (
        <>
      <Navegacion />

      <h3 className="text-center text-5xl mt-10 font-normal">Universidades de {muncipio?.nombre}</h3>



      <div className="container-sm border-black p-10 flex justify-evenly flex-wrap gap-5 ">

      {universidades.map(uni => (
        <div key={uni.id} className="max-w-sm pb-10 rounded overflow-hidden shadow-lg">
          <img className="w-full card--imagen"  src={uni.image?.ruta} alt="Sunset in the mountains" />
          <div className="px-6 py-4">
              <p className="text-center text-xl">{uni.nombre}</p>
          <div className="px-6 pt-4 pb-2 flex justify-evenly flex-wrap">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{uni.municipio?.nombre}</span>

          </div>
          <div className="px-6 pt-4 pb-4 text-center">
              <Link to={`/universidad/${uni.slug}`} className="bg-slate-800 w-full hover:bg-slate-700 text-center inline-block px-6  pt-4 pb-4 text-white">Más informacion</Link>
          </div>

          </div>
      </div>

      ))}


      </div>


        </>
    )
}
