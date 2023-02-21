import './App.css';
import { Home } from './pages/Home/Home';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Admin } from './pages/Admin/Admin';
import { Universidades } from './pages/Universidades/Universidades';
import { QuintanaRoo } from './pages/QuintanaRoo/QuintanaRoo';
import { Yucatan } from './pages/Yucatan/Yucatan';
import { EstadoV } from './pages/Admin/Estado/EstadoV';
import { Municipio } from './pages/Admin/Municipio/Municipio';
import UniversidadesAdmin  from './pages/Admin/Universidades/Universidades';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/admin/estados' element={<EstadoV/>} />
        <Route path='/admin/municipios' element={<Municipio />} />
        <Route path='/admin/universidades' element={<UniversidadesAdmin/>} />


        <Route path='/universidades' element={<Universidades/>}/>
        <Route path='/quintanaroo' element={<QuintanaRoo/>} />
        <Route path='/yucatan' element={<Yucatan/>}/>


      </Routes>
  );
}
export default App;