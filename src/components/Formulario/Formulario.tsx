import axios from 'axios';
import React, { useRef, useState } from 'react'

export const Formulario = (props) => {
    const [response,setResponse] = useState([]);

    const form = useRef(null)

    async function post(e){
        e.preventDefault()
        let formData =  new FormData(form.current);

           const request = await axios.post(props.url,formData,{
          headers: {
              "Content-Type": "multipart/form-data",
            }
          })
          const response = await request.data
          console.log(response);


          setResponse([response.message])
    }




  return (
    <>
      <div className="container mt-3">
        {response.map(mensaje => {
          <div key={mensaje} className='alert alert-primary'>x{mensaje}</div>
        })}
      </div>
      

    <form ref={form} id={props.idForm} method='POST' encType='multipart/form-data'>
       {props.children}

      <button onClick={post} type="submit" className='btn btn-primary' >Enviar</button>
    </form>
    </>
   

  )
}
