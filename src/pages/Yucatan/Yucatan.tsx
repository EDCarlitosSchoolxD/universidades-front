import React from 'react'
import { BotonPaginacion } from '../../components/BotonPaginacion/BotonPaginacion';
import { Navegacion } from '../../components/Navegacion/Navegacion'
import { useState,useEffect } from 'react';
import { Card} from '../../components/Card/Card';


export const Yucatan = () => {
    const [municipios,setMunicipios] = useState();
    const [paginate,setPaginate] = useState([]);
    const [page, setPage] = useState(1);


    async function fetchUni(pag){
        const unis = await fetch(`${process.env.REACT_APP_API}/municipalities?estado=yucatan`)
        const data = await unis.json();

        
       const links = await data.meta.links
       await links.pop();
       await links.shift();

        setPaginate(links);
        setMunicipios(data);

        console.log(data);
    }

    useEffect(() => {
        const pagi = page;
       fetchUni(pagi)
    },[page])
    

    function paginacion(){
       if(municipios){
        return (<>
        {
            paginate.map(pag => (
                <BotonPaginacion key={pag.url} setPage={setPage} activate={pag.active} value={pag.label} />
            ))
        }
            
            </>
            )
       }
        
    }
  
  
  
    return (
        <>
            <Navegacion/>

            <h1 className='titulo'>Yucatan</h1>

            <div className="container flex-grid-wrap">

                {!municipios?'cargando...' :municipios.data.map(municipio => (
                    <Card  texto="Ver universidad"  key={municipio.id} titulo={municipio.municipio} image={municipio.image}/>
      
                ))}
        </div>


            <div className="paginate-container">
                {paginacion()}
            </div>

        </>
    )
}
