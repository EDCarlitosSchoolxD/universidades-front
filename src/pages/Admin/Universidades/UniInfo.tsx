import React, { useEffect, useMemo, useState } from 'react'
import { Navegacion } from '../../../components/Navegacion/Navegacion'
import { useParams } from 'react-router-dom'
import { Universidad } from '../../../classes/Universidad';
import axios from 'axios';
import { GoogleMapComponent } from '../../../components/GoogleMapComponent/GoogleMapComponent';
import { FormModal } from '../../../components/FormModal/FormModal';
import { ModalDelete } from '../../../components/ModalDelete/ModalDelete';
import { Carrera } from '../../../classes/Carrera';
import { Image } from '../../../classes/Image';
import { blobToBase64 } from 'base64-blob';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';

export const UniInfo = () => {
    const {universidad} = useParams();
    const [universidadD,setUniversidadD] = useState<Universidad>(new Universidad({}));
    const [loading,setLoading] = useState(true);
    const [cordenate,setCordenates] = useState({lat:21.2899187,lng:-99.3845342})
    


    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState<Image|null>(null);
    const [send,setSend] = useState(false);
    const [errors,setErrors] = useState([])
    const [modalDelete,setModalDelete] = useState(false);
    const [sendCorrect,setSendCorrect] = useState(false);
    const [carrera,setCarrera] = useState<Carrera|null>(null)
    const [data,setData] = useState<Carrera[]>([]);
    const [refresh,setRefresh] = useState(1);


    useEffect(()=>{
        getData();
    },[])
    useEffect(()=>{
      getCarreras();
    },[universidadD,refresh])


    function setDefaultValues(){
      setImage(null);
      setErrors([]);
      setSendCorrect(false);
      setCarrera(null);
    }

    async function getCarreras(){
          try {
            if(!universidadD.id)return;
            const peticion = await axios.get(`${import.meta.env.VITE_APP_API}carreras/uni/${universidadD.id}`)
            const data:[] = await peticion.data;
            const dataObj:Carrera = data.map(d => new Carrera(d));
            setData(dataObj);
            
            console.log(dataObj);
            
          } catch (error) {
            console.log(error);
            
          }
      }
    

    async function getData(){
        try {
          const peticion = await axios.get(`${import.meta.env.VITE_APP_API}universidades/slug/${universidad}`)
          const data:Universidad = await peticion.data;
          const dataObj = new Universidad(data);
          setLoading(false);
          setCordenates({lat:dataObj.latitud,lng:dataObj.longitud})      
          setUniversidadD(dataObj);

          setCarrera({universidad:dataObj})
          
        } catch (error) {
          console.log(error);
          
        }
      }

      async function formSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const carreraData = new Carrera({...carrera,planEstudio:image,universidad:carrera?.universidad});
        console.log(carreraData);
        
        setSend(true);
        try{
          let peticion;
          if(carreraData.id ==null || carreraData.id == undefined && carrera?.universidad.id > 0)peticion = await axios.post(`${import.meta.env.VITE_APP_API}carreras/`,carreraData);
          if(carreraData.id != null || carreraData.id != undefined && carrera?.universidad.id > 0)peticion = await axios.put(`http://localhost:8080/api/carreras/${carrera.id}`,carreraData)
          setErrors([]);
          setSendCorrect(true);
          setRefresh(refresh+1)
        }catch(e:any){

          if(typeof e.response.data.errors != undefined){
            setErrors(e.response.data.errors);
          }
          
          console.log(e);
          
        }    
        setSend(false);

        
  }  


  async function changeImage(e:React.ChangeEvent<HTMLInputElement>){
    const imageFile:File|null = e.target.files[0];
    const tipo:string = imageFile.type;
    const nombre:string = imageFile.name;
    let encode:string;
    const bto64:string = await blobToBase64(imageFile);
    encode = bto64.split(',')[1];

    

    const imagenObj:Image = {...image,tipo:tipo,nombre:nombre,encode:encode}

    console.log({imagenObj});
    
    setImage(imagenObj);
  }

  function change(e:React.ChangeEvent<HTMLInputElement>){
    const {value,name} = e.target
    setCarrera({...carrera,[name]:value})

  }

      function sendView(){
        
        if(send){
          return(<div className='m-auto' role="alert">
          <svg aria-hidden="true" className="w-8 text-2xl h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mx-auto" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="mt-20">ENVIANDO</span>
      </div>)
        }else if(sendCorrect){
            return (<div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <span className="font-medium">Se envio correctamente</span>
          </div>)
        }
        return (<>

  
        <div className="">
                <label htmlFor="nombre" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Nombre de la universidad</label>
                <input name='nombre' value={`${carrera?.nombre?carrera.nombre:""}`}  onChange={e => change(e)}  type="nombre" placeholder='Nombre' id="nombre" className="bg-gray-50 border border-gray-300 text-gray-900 text-xl  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

          <div className='grid grid-cols-2 gap-20'>
              <div>
                <p className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Descripcion</p>
                <ReactQuill onChange={(e)=> setCarrera({...carrera,descripcion:e})} className='h-60' theme='snow'  value={`${carrera?.descripcion?carrera.descripcion:""}`}/>
              </div>

              <div>
                <p className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Objetivo</p>
                <ReactQuill  onChange={(e)=> setCarrera({...carrera,objetivo:e})} className='h-60' theme='snow' value={`${carrera?.objetivo?carrera.objetivo:""}`} />
              </div>
              <div>
                <p className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Aprendizaje</p>
                <ReactQuill onChange={(e)=> setCarrera({...carrera,aprendizaje:e})}  className='h-60' theme='snow' value={`${carrera?.aprendizaje?carrera.aprendizaje:""}`} />
              </div>
              
              <div>
                <p className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">¿En que podras trabajar?</p>
                <ReactQuill  onChange={(e)=> setCarrera({...carrera,trabajo:e})}  className='h-60' theme='snow'  value={`${carrera?.trabajo?carrera.trabajo:""}`}/>
              </div>

              <div>
                <p className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Perfil de ingreso</p>
                <ReactQuill  onChange={(e)=> setCarrera({...carrera,perfilIngreso:e})} className='h-60' theme='snow' value={`${carrera?.perfilIngreso?carrera.perfilIngreso:""}`} />
              </div>

              <div>
                <p className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Perfil de egreso</p>
                <ReactQuill onChange={(e)=> setCarrera({...carrera,perfilEgreso:e})}   className='h-60' theme='snow' value={`${carrera?.perfilEgreso?carrera.perfilEgreso:""}`} />
              </div>


          </div>
          
              

            <input  accept="image/* pdf" onChange={e => changeImage(e)} className="block mt-20 w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer text-lg p-4 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image" name='image' type="file" />
           
            <button type="submit"  name='image' className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full px-5 py-4 text-xl text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
                      
            </> 
        )

    
    }





  return (
    <>
        <Navegacion />
            {loading?(<div className='m-auto' role="alert">
          <svg aria-hidden="true" className="w-8 text-2xl h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mx-auto" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="mt-20">Cargandoo</span>
      </div>):""}



      <div className='grid w-11/12 uni--info uni--info mx-auto gap-5'>
        <div className='flex flex-col gap-10'>
          <h1 className='font-bold text-5xl text-center my-10'>{universidadD.nombre}</h1>
          <p className='font-bold text-3xl text-center mb-10'>{universidadD.municipio?.nombre}</p>
          {universidadD.web?(
          <a href={universidadD.web} target='_BLANK' className="font-bold text-center text-2xl text-blue-600 dark:text-blue-500 hover:underline">Pagina Web Oficial</a>
          ):""}
          <img className='w-full  h-image drop-shadow-xl object-cover'  src={universidadD.image?.ruta} alt="" />
          
          <div className='w-full  h-image drop-shadow-xl' >
            <GoogleMapComponent className="max-w-5xl"  center={cordenate} />
          </div>
        </div>
     
      <div>
      <div className='w-4/5 mx-auto mt-8'>
                <button onClick={()=>{setIsOpen(true) ;setDefaultValues(); setCarrera({universidad:new Universidad({id:universidadD.id})})}} type="button" className="
             text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full 
                text-xl py-4 px-10 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar Carrera</button>

            </div>

            <ModalDelete delete="carreras" resetValues={setDefaultValues} show={modalDelete} setRefresh={()=>setRefresh(refresh+1)} onClose={()=>setModalDelete(false)} id={carrera?.id}  />




            <FormModal   size="8xl"  show={isOpen} onClose={()=>{setIsOpen(false); setDefaultValues()}} >

                <form  onSubmit={e=>formSubmit(e)} className='p-2 flex flex-col gap-8'>
                {errors.map(err =>(
                <div key={err.defaultMessage} className="p-4 mb-4 text-2xl text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                    <span className="font-medium">Error</span> {err.defaultMessage}
                </div>
                ))}


                    {sendView()}
                
                </form>

                </FormModal>

                <section className="relative max-w-8xl w-4/5 mt-8  mx-auto overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
              <thead className="text-xs p text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                     
                      <th scope="col" className="px-6 text-2xl py-3">
                          Nombre
                      </th>
                      <th scope="col" className="px-6 text-2xl py-3">
                        Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {data.map(d => (
                      <tr key={d.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                        <td className="px-6 text-2xl py-4">
                          {d.nombre}
                        </td>

                        <td className="px-6 text-2xl py-4">
                          {/* En Mantenimiento
                            <button onClick={()=>{setDefaultValues(); setIsOpen(true);console.log(d);
                              setCarrera({
                                ...carrera,
                                nombre:d.nombre,
                                aprendizaje:d.aprendizaje,
                                universidad:d.universidad,
                                objetivo:d.objetivo,
                                descripcion:d.descripcion,
                                trabajo:d.trabajo,
                                id:d.id,
                                perfilIngreso:d.perfilIngreso,

                                 setImage(d.planEstudio);}} type="button" className="text-blue-700 text-6xl hover:text-blue-800 duration-300 transition-all"><AiTwotoneEdit/></button>
                              });
                                */
                          }
                        
                         
                         
                        <button onClick={()=>{setDefaultValues(); setModalDelete(true);  setCarrera({...d,universidad:d.universidad}) }} type="button" className="text-red-700 text-6xl hover:text-red-800 duration-300 transition-all"><AiFillDelete/></button>
                        </td>
                      </tr>

                  ))}
                  
              </tbody>
          </table>
      </section>


      </div>



      </div>

      

    </>
    )
}
