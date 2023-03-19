import React, { useState } from 'react'
import './Navegacion.css'
import {GiHamburgerMenu} from 'react-icons/gi'
import { NavOption } from '../NavOption/NavOption'
import logo from '../../assets/logo.jpeg'
import {BsSearch} from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom'
export const Navegacion = () => {
    const [isOpenMenu,setIsOpenMenu] = useState(false);
	const navigate = useNavigate();
    const state = localStorage.getItem("login")

    const onLogout = () => {

        localStorage.removeItem("login")

		navigate('/login', {
			replace: true,
		});
	};


    function changeMenu(){
        setIsOpenMenu(!isOpenMenu);
    }


  return (
    <nav className='nav'>
        <div className='navHomeLogo'>
            <a href="/"> <img loading="lazy"  src={logo} alt="logo" /> </a>
        </div>


        <div onClick={changeMenu} className='navHamburguerMenu'>
            <GiHamburgerMenu />
        </div>

        <div className={`nav-options ${isOpenMenu? 'nav-optionsOpen':''}`}>
        <NavOption  href="/quintana-roo" text="Quintana Roo" />
        <NavOption  href="/yucatan" text="Yucatán" />

        {state == "true" ? (
					<>
                        <NavOption  href="/admin" text="Administracion" />
						<button className='btn-logout text-3xl nav-option' onClick={onLogout}>
							Cerrar sesión
						</button>
					</>
				):""
        }




        <form className='nav-buscador'>
            <input className='nav-buscador-input' type="text" name='buscar' />
            <button className='nav-buscador-submit text-black' type="submit" ><BsSearch/></button>
        </form>

        



        </div>

    </nav>
 )
}
