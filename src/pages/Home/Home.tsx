import React from 'react'
import { Navegacion } from '../../components/Navegacion/Navegacion'
import quintana from '../../assets/slide/slide-1.jpg';
import yucatan from '../../assets/slide/slide-2.jpg';
import unis from '../../assets/slide/slide-1.jpg';

import { Link } from 'react-router-dom';
import './Home.css'
import about from '../../assets/about.jpg';
import portfolio1 from '../../assets/home/portfolio-1.jpg'
import portfolio2 from '../../assets/home/portfolio-2.jpg'
import portfolio3 from '../../assets/home/portfolio-3.jpg'
import portfolio4 from '../../assets/home/portfolio-4.jpg'
import portfolio5 from '../../assets/home/portfolio-5.jpg'
import portfolio6 from '../../assets/home/portfolio-6.jpg'
import { Carousel } from 'flowbite-react';
import { Footer } from '../../components/Footer/Footer';


export const Home = () => {

  console.log(process.env.REACT_APP_API_KEY)
  


  return (
    <>
      <Navegacion />
      <div className="h-90v">
    <Carousel >

    <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white relative">
      <div className='relative h-full w-full after:absolute after:top-0 after:left-0 after:bottom-0 after:right-0 after:content-[""] after:w-full after:h-full after:bg-black after:opacity-50'>
      <img loading="lazy"  src={yucatan} alt="" className='h-full w-full' />
      </div>
      <div  className='absolute flex justify-center flex-col text-center gap-8'>
        <h2 className='text-7xl text-white' >Yucatan</h2>
        <p className='tracking-widest text-white'>TODAS LAS OPORTUNIDADES QUE TE PUEDEN OFRECER</p>
        <a className='bg-white rounded-3xl p-3 pr-8  pl-8 font-bold text-center m-auto' href="/yucatan">Comenzemos</a>
      </div>
    </div>

    <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white relative">
      <div className='relative h-full w-full after:absolute after:top-0 after:left-0 after:bottom-0 after:right-0 after:content-[""] after:w-full after:h-full after:bg-black after:opacity-50'>
      <img loading="lazy"  src={quintana} alt="" className='h-full w-full' />
      </div>
      <div  className='absolute flex justify-center flex-col text-center gap-8'>
        <h2 className='text-7xl text-white' >Quintana Roo</h2>
        <p className='tracking-widest text-white'>TODAS LAS OPORTUNIDADES QUE TE PUEDEN OFRECER</p>
        <a className='bg-white rounded-3xl p-3 pr-8  pl-8 font-bold text-center m-auto' href="/quintanaroo">Comenzemos</a>
      </div>
    </div>
  
  </Carousel>
</div>
    <section className="container home-razones">

      <div className='razones-img'>
        <img loading="lazy"  src={about} alt="" />
      </div>
    <div className='razones-contenido'>
      <h1>Razones por las que es bueno estudiar la universidad</h1>
      <p>Sabemos que al momento de terminar la preparatoria muchas opciones de vida vienen a tu mente, no sólo la de estudiar una carrera universitaria; sin embargo, si quieres conseguir trabajos bien pagados, cursar una licenciatura sin duda será tu mejor opción.</p>
      <ul className='razones-lista'>
          <li>Te ayuda a adquirir habilidades únicas y especializadas.</li>
          <li>Desarrollas pensamiento crítico y tienes una visión global.</li>
          <li>Aprendes a trabajar orientado a metas.</li>
          <li>Te conviertes en un profesional.</li>
      </ul>
    </div>

    </section>



    <section className="home-galeria container">
    <h1>ANÍMATE A ESTUDIAR EN ESTOS BELLOS LUGARES</h1>
    <div className='galeria--img'>
      <img loading="lazy"  src={portfolio1} alt="" />
      <img loading="lazy"  src={portfolio2} alt="" />
      <img loading="lazy"  src={portfolio3} alt="" />
      <img loading="lazy"  src={portfolio4} alt="" />
      <img loading="lazy"  src={portfolio5} alt="" />
      <img loading="lazy"  src={portfolio6} alt="" />
    </div>
    
    </section>


    <Footer />

    </>



    )
}
