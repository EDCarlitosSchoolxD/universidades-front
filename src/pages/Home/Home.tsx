import React from 'react'
import { Navegacion } from '../../components/Navegacion/Navegacion'
import quintana from '../../assets/slide/slide-1.jpg';
import { Link } from 'react-router-dom';
import './Home.css'
import about from '../../assets/about.jpg';
import portfolio1 from '../../assets/home/portfolio-1.jpg'
import portfolio2 from '../../assets/home/portfolio-2.jpg'
import portfolio3 from '../../assets/home/portfolio-3.jpg'
import portfolio4 from '../../assets/home/portfolio-4.jpg'
import portfolio5 from '../../assets/home/portfolio-5.jpg'
import portfolio6 from '../../assets/home/portfolio-6.jpg'


export const Home = () => {

  console.log(process.env.REACT_APP_API_KEY)
  
  return (
    <>
      <Navegacion />


      
    <section className="container home-razones">

      <div className='razones-img'>
        <img src={about} alt="" />
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
      <img src={portfolio1} alt="" />
      <img src={portfolio2} alt="" />
      <img src={portfolio3} alt="" />
      <img src={portfolio4} alt="" />
      <img src={portfolio5} alt="" />
      <img src={portfolio6} alt="" />
    </div>
    
    </section>


    </>

    )
}
