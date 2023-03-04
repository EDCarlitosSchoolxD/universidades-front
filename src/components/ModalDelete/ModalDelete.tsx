import axios from 'axios'
import { Button, Modal } from 'flowbite-react'
import React, { useState } from 'react'
import {FiAlertCircle} from 'react-icons/fi'

export const ModalDelete = (props:any) => {

    const [send,setSend] = useState(false);
    const [sendCorrect,setSendCorrect] = useState(false);

    

    async function deleteEstado(){
        try{
          console.log("XDD")
          setSend(true);
          const peticion = await axios.delete(`${import.meta.env.VITE_APP_API}${props.delete}/${props.id}`);
          setSendCorrect(true);

          props.setRefresh();
          props.resetValues()

          console.log(peticion);
          
        }catch(err){
          console.log(err);
        }

        setSend(false);
  
    }
    function setDefaultValues(){
        setSendCorrect(false);
        setSend(false);
    }

    function sendDeleteView(){
        if(send){
          return(<div className='m-auto' role="alert">
          <svg aria-hidden="true" className="w-8 text-2xl h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mx-auto" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="mt-20 mx-auto">ENVIANDO</span>
      </div>)
        }else if(sendCorrect){
            return (<div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <span className="font-medium">Se elimino correctamente</span>
          </div>)
        }

        return (
            <div className="text-center">
            <FiAlertCircle className="mx-auto text-4xl mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-xl font-normal text-gray-500 dark:text-gray-400">
                Cuidado esta apunto de eliminarlo, esto puede traer consecuencias, no se ni porque esta opcion esta aqui
            </h3>
            <div className="flex justify-center gap-10">
            <Button
                color="failure"
                onClick={deleteEstado}
                size="xl"
            >
                Si, se lo que hago
            </Button>
            <Button
                size="xl"
                color="gray"
                onClick={props.onClose}
                className="font-bold"
            >
                Salir
            </Button>
            </div>
        </div>
        )
    }



  return (
    <React.Fragment>
    <Modal
        show={props.show}
        size="xl"
        popup={true}
        onClose={()=>{ props.onClose(); setDefaultValues();}}
    >
        <Modal.Header />
        <Modal.Body>

            {sendDeleteView()}
            
        
        </Modal.Body>
    </Modal>
    </React.Fragment>
  )
}
