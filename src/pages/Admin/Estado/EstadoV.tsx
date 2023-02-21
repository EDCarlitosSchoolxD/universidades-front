import React, { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios';
import { Navegacion } from '../../../components/Navegacion/Navegacion';
import { Button, Label, TextInput } from 'flowbite-react';
import { FormModal } from '../../../components/FormModal/FormModal';
import { blobToBase64,base64ToBlob } from 'base64-blob';
import { Estado, EstadoT } from '../../../classes/Estado';
import { Image } from '../../../classes/Image';


export const EstadoV = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [estado,setEstado] = useState(new Estado({}));  

  async function changeImage(e:React.ChangeEvent<HTMLInputElement>){
    const image:File|null = e.target.files[0];
    const tipo:string = image.type;
    const nombre:string = image.name;
    let encode:string;
    const bto64:string = await blobToBase64(image);
    encode = bto64;

    const imagenObj:Image = new Image({tipo:tipo,
      nombre:nombre,
      encode:encode
    })
   
    const newState:Estado = new Estado({nombre:estado.getNombre(),image:imagenObj})
    console.log(newState);
    console.log({tipo,image,encode});
    

    setEstado(newState);
  }

  function enviar(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault();
    
  }
  
  
  
  return(
    <>
      <Navegacion />

      <div className='w-4/5 mx-auto mt-8'>
        <Button onClick={()=>setIsOpen(true)}>Agregar nueva universidad</Button>
      </div>
      <FormModal show={isOpen} onClose={()=>setIsOpen(false)} >
        <form className='p-2 flex flex-col gap-8'>
        <TextInput
        id="nombre"
        type="text"
        placeholder="Nombre"
        onChange={(e)=>setEstado(e.target.value)} 
        required={true}
        />
    <input  onChange={(e)=>changeImage(e)} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image" name='image' type="file" />

        <Button onClick={enviar}>Enviar</Button>

        </form>
        


      </FormModal>



      

    </>
  );
}
