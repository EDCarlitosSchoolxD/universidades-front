import './App.css';
import { Home } from './pages/Home/Home';
import { Routes, Route, BrowserRouter, Navigate, Router, redirect } from "react-router-dom";
import { Admin } from './pages/Admin/Admin';
import { EstadoV } from './pages/Admin/Estado/EstadoV';
import { MunicipioV } from './pages/Admin/Municipio/MunicipioV';
import UniversidadesAdmin  from './pages/Admin/Universidades/UniversidadesV';
import UniversidadesV from './pages/Admin/Universidades/UniversidadesV';
import { UniInfo } from './pages/Admin/Universidades/UniInfo';
import { EstadoH } from './pages/Home/EstadoH/EstadoH';
import { Universidades } from './pages/Universidades/Universidades';
import { UniversidadH } from './pages/Home/UniversidadH/UniversidadH';
import { useState } from 'react';
import { Login } from './components/Login/Login';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username:string, password:string) => {
    // verificar las credenciales del usuario aquí y establecer isAuthenticated en true si son válidas
    if(username == import.meta.env.VITE_USERNAME && password == import.meta.env.VITE_PASSWORD){
      setIsAuthenticated(true);
    }

  };




  return (
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path='/admin' element={<Admin/>} /> */}
        {/* <Route path='/admin/estados' element={<EstadoV/>} />
        <Route path='/admin/municipios' element={<MunicipioV />} />
        <Route path='/admin/universidades' element={<UniversidadesAdmin/>} />
        <Route path='/admin/universidades/:universidad' element={<UniInfo />}/> */}



        {/* <Route path='/universidades' element={<UniversidadesV/>}/> */}
        <Route path='/:estadoParams' element={<EstadoH/>}/>
        <Route path='/universidades/:municipioParams' element={<Universidades />}  />
        <Route path='/universidad/:universidadParams' element={<UniversidadH />} />

        <Route path='login' element={<Login />} />

       

        <Route path='/admin' element={<PrivateRoute> <Admin/> </PrivateRoute>} />
        <Route path='/admin/estados' element={<PrivateRoute> <EstadoV/> </PrivateRoute>} />
        <Route path='/admin/municipios' element={<PrivateRoute> <MunicipioV/> </PrivateRoute>} />
        <Route path='/admin/universidades' element={<PrivateRoute> <UniversidadesAdmin/> </PrivateRoute>} />
        <Route path='/admin/universidades/:universidad' element={<PrivateRoute> <UniInfo/> </PrivateRoute>} />

        




        

      </Routes>
  );
}
export default App;