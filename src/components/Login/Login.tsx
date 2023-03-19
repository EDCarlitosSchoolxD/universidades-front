import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { Navegacion } from '../Navegacion/Navegacion';

export const Login = () => {
	const navigate = useNavigate();
  const [correctLogin,setCorrectLogin] = useState(true);

	const { name, password, onInputChange, onResetForm } =
		useForm({
			name: '',
			password: '',
		});

	const onLogin = e => {
    e.preventDefault();

    if(name == import.meta.env.VITE_USERNAME && password == import.meta.env.VITE_PASSWORD){

      localStorage.setItem("login","true")
  
      navigate('/admin', {
        replace: true,
        state: {
          logged: true,
          name,
        },
      });
  
      onResetForm();
    }
    else {
      setCorrectLogin(false)
    }
		
	};

	return (
    <>
    <Navegacion />


      
        <form className='max-w-2xl mx-auto px-24 mt-12' onSubmit={onLogin}>

          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Usuario</label>
            <input type="name" id="name" name='name' value={name} onChange={onInputChange} className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-lg" placeholder="Usuario" required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Contraseña</label>
            <input type="password" name='password' value={password} onChange={onInputChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>

          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

          {
            !correctLogin ? (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">Danger alert!</span> El usuario o la contraseña no son correctos
          </div>):""
          }
          


        </form>





	
    </>
		
	);
};