import React from 'react'
import './BotonPaginacion.css'
export const BotonPaginacion = ({value,setPage,activate}) => {



  return (
    
        <input className={`button-paginate ${activate?'button-paginate-activate':''}`} type="button" value={value} onClick={()=>setPage(value)}  />
    )
}
