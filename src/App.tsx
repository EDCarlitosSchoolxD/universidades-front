import './App.css';
import { Home } from './pages/Home/Home';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Admin } from './pages/Admin/Admin';
import { QuintanaRoo } from './pages/QuintanaRoo/QuintanaRoo';
import { Yucatan } from './pages/Yucatan/Yucatan';
import { EstadoV } from './pages/Admin/Estado/EstadoV';
import { MunicipioV } from './pages/Admin/Municipio/MunicipioV';
import UniversidadesAdmin  from './pages/Admin/Universidades/UniversidadesV';
import UniversidadesV from './pages/Admin/Universidades/UniversidadesV';
import { UniInfo } from './pages/Admin/Universidades/UniInfo';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/admin/estados' element={<EstadoV/>} />
        <Route path='/admin/municipios' element={<MunicipioV />} />
        <Route path='/admin/universidades' element={<UniversidadesAdmin/>} />
        <Route path='/admin/universidades/:universidad' element={<UniInfo />}/>

        <Route path='/universidades' element={<UniversidadesV/>}/>
        <Route path='/:estado' element={<QuintanaRoo/>} />
        <Route path='/:estado' element={<Yucatan/>}/>


      </Routes>
  );
}
export default App;