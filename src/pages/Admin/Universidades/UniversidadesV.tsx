import React, { useEffect, useRef, useState } from 'react'
import axios  from 'axios';
import { Navegacion } from '../../../components/Navegacion/Navegacion';
import { ModalDelete } from '../../../components/ModalDelete/ModalDelete';
import { FormModal } from '../../../components/FormModal/FormModal';
import { Universidad } from '../../../classes/Universidad';
import { Image } from '../../../classes/Image';
import {Municipio} from '../../../classes/Municipio'
import { blobToBase64 } from 'base64-blob';
import { GoogleMapComponent } from '../../../components/GoogleMapComponent/GoogleMapComponent';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';




export default function UniversidadesV () {
    const [isOpen, setIsOpen] = useState(false);
    const [universidad,setUniversidad] = useState<Universidad|null>(null);
    const [image, setImage] = useState<Image|null>(null);
    const [send,setSend] = useState(false);
    const [errors,setErrors] = useState([])
    const [sendCorrect,setSendCorrect] = useState(false);
    const [isLoad,setIsLoad] = useState(false); 
    const [data,setData] = useState<Universidad[]>([]);
    const [refresh,setRefresh] = useState(1);
    const [modalDelete,setModalDelete] = useState(false);
    const [municipios,setMunicipios] = useState<Municipio[]>([]);
    const [coordenate,setCordenates] = useState<{lat:number,lng:number}|null>(null)
    const [adress,setAdress] = useState("");
    const adressInput = useRef<HTMLInputElement>();

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
    
      function setDefaultValues(){
        setImage(null);
        setErrors([]);
        setSendCorrect(false);
        setUniversidad(new Universidad({}));
      }
    
      useEffect(()=>{
        getData();
        

      },[refresh])

    useEffect(()=>{
        getMunicipios();
    },[])
    
      async function getMunicipios(){
          try {
            const peticion = await axios.get(`${import.meta.env.VITE_APP_API}municipios/`)
            const data:[] = await peticion.data;
            const dataObj = data.map(d => new Municipio(d));
            setMunicipios(dataObj);
            
          } catch (error) {
            console.log(error);
            
          }
      }

      async function getData(){
        try {
          const peticion = await axios.get(`${import.meta.env.VITE_APP_API}universidades/`)
          const data:[] = await peticion.data;
          const dataObj = data.map(d => new Universidad(d));
          console.log(dataObj);
          
          setData(dataObj);
        } catch (error) {
          console.log(error);
          
        }
      }
    
    
    
      async function formSubmit(e:React.FormEvent<HTMLFormElement>){
            e.preventDefault();
            const universidadData = new Universidad({...universidad,municipio:universidad.municipio,image:image});
            console.log(universidadData);
            
            setSend(true);
            try{
              let peticion;
              if(universidadData.id ==null || universidadData.id == undefined)peticion = await axios.post(`${import.meta.env.VITE_APP_API}universidades/`,universidadData);
              if(universidadData.id != null || universidadData.id != undefined)peticion = await axios.put(`http://localhost:8080/api/universidades/${universidad.id}`,universidadData)
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


      function change(e:React.ChangeEvent<HTMLInputElement>){
        const {value,name} = e.target
        setUniversidad({...universidad,[name]:value})

      }
      function changeMunicipio(e:React.ChangeEvent<HTMLSelectElement>){
        const id:number = parseInt( e.target.value);
        const municipio:Municipio = new Municipio({id});
        setUniversidad({...universidad,municipio:municipio});

         }     

        

         function handlerCoordenates(e:google.maps.MapMouseEvent){
            const latitud = e.latLng?.lat();
            const longitud = e.latLng?.lng();
            setCordenates({lat:latitud,lng:longitud});
            setUniversidad({...universidad,municipio:universidad?.municipio,latitud:latitud,longitud:longitud})

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
                <input name='nombre' value={`${universidad?.nombre?universidad.nombre:""}`}  onChange={e => change(e)}  type="nombre" placeholder='Nombre' id="nombre" className="bg-gray-50 border border-gray-300 text-gray-900 text-xl  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

        <div className="">
                <label htmlFor="nombre" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Nombre de la universidad</label>
                <input name='web' value={`${universidad?.web?universidad.web:""}`}  onChange={e => change(e)}  type="url" placeholder='Web de la escuela' id="web" className="bg-gray-50 border border-gray-300 text-gray-900 text-xl  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

            <div>
              <label htmlFor="image">Imagen</label>
              <input  accept="image/*" onChange={e => changeImage(e)} className="block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer text-lg p-4 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image" name='image' type="file" />

            </div>
           <div>
            <label htmlFor="municipio" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Municipio</label>
            <select id="estado" defaultValue={"seleccion"} onChange={e=>changeMunicipio(e)} required name='estado' className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

              <option  value="seleccion"  disabled>Selecciona una opcion</option>
              {municipios.map(municipio => <option  key={municipio.getNombre()+municipio.getId()} value={`${municipio.getId()}`}>{municipio.getNombre()}</option>)}
            </select>
           </div>
            
           
            
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white" htmlFor="">Ubicacion</label>
              <GoogleMapComponent  center={coordenate} onClick={handlerCoordenates} />        

            </div>
           
            <button type="submit"  name='image' className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full px-5 py-4 text-xl text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
                      
            </> 
        )

    
    }


    return (
        <>
            <Navegacion/>
            <div className='w-4/5 mx-auto mt-8'>
                <button onClick={()=>{setIsOpen(true) ;setDefaultValues()}} type="button" className="
             text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full 
                text-xl py-4 px-10 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar Universidad</button>

            </div>

            <ModalDelete delete="universidades" resetValues={setDefaultValues} show={modalDelete} setRefresh={()=>setRefresh(refresh+1)} onClose={()=>setModalDelete(false)} id={universidad?.id}  />




            <FormModal  size="7xl"  show={isOpen} onClose={()=>{setIsOpen(false); setDefaultValues()}} >

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
                          ID
                      </th>
                      <th scope="col" className="px-6 text-2xl py-3">
                          Nombre
                      </th>
   
                      <th scope="col" className="px-6 text-2xl py-3">
                          Image
                      </th>
                      <th scope="col" className="px-6 text-2xl py-3">
                        Municipio
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
                          {d.id?d.id:"null"}
                        </td>

                        <td className="px-6 text-2xl py-4">
                          {d.nombre}
                        </td>
                        <td className="w-60 p-4">
                            <img loading="lazy"  className='w-full h-full' src={d.image?.ruta} alt="" />
                        </td>

                        <td className="px-6 text-2xl py-4">
                          {
                            d.municipio?d.municipio.nombre:"Null"
                          }
                        </td>

                        <td className="px-6 text-2xl py-4 flex gap-2" >
                        <button onClick={()=>{setDefaultValues(); setIsOpen(true); setUniversidad({...d,municipio:d.municipio});
                          setImage(d.image);}} type="button" className="text-blue-700 text-6xl hover:text-blue-800 duration-300 transition-all"><AiTwotoneEdit/></button>
                        <button onClick={()=>{setDefaultValues(); setModalDelete(true);  setUniversidad({...universidad,...universidad?.municipio,...universidad?.image,id:d.id}) }} type="button" className="text-red-700 text-6xl hover:text-red-800 duration-300 transition-all"><AiFillDelete/></button>
                        <Link className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' to={`/admin/universidades/${d.slug}`}>Mas informacion</Link>
                        </td>
                      </tr>

                  ))}
                  
              </tbody>
          </table>
      </section>




        </>
    );
}
