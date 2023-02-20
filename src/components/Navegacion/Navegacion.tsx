import React, { useState } from 'react'
import './Navegacion.css'
import {GiHamburgerMenu} from 'react-icons/gi'
import { NavOption } from '../NavOption/NavOption'
import logo from '../../assets/logo.jpeg'
import {BsSearch} from 'react-icons/bs';
export const Navegacion = () => {
    const [isOpenMenu,setIsOpenMenu] = useState(false);


    function changeMenu(){
        setIsOpenMenu(!isOpenMenu);
    }


  return (
    <nav className='nav'>
        <div className='navHomeLogo'>
            <img src={logo} alt="logo" />
        </div>


        <div onClick={changeMenu} className='navHamburguerMenu'>
            <GiHamburgerMenu />
        </div>

        <div className={`nav-options ${isOpenMenu? 'nav-optionsOpen':''}`}>
        <NavOption  href="/quintanaroo" text="Quintana Roo" />
        <NavOption  href="/yucatan" text="Yucatán" />
        <form className='nav-buscador'>
            <input className='nav-buscador-input' type="text" name='buscar' />
            <button className='nav-buscador-submit' type="submit" ><BsSearch/></button>
        </form>

        </div>

    </nav>
 )
}
