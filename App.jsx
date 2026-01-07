// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 
import Navbar from './components/navbar';
// Importa tus componentes de página
//const Home = () => <div className="container mt-5"><h1>Inicio</h1></div>;
//const SobreNosotros = () => <div className="container mt-5"><h1>Sobre Nosotros</h1></div>;
import UserRegister from './components/UserRegister';
import Login from './components/Login';
import LoginHandler from './components/LoginHandler';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';


function App() {
  return (
    <div className="App">
      <div className="contenedor-principal">
        <h4>APLICACION FULL STACK DE USUARIOS</h4>


        <Navbar />

<div className="container">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    
       
        <UserRegister /> 
        
        <hr style={{ margin: `40px 0` }} />
        
        <LoginHandler/>
      </div>
    </div>
  );
}

export default App;


/*<Routes>
  <Route path="/" element={<Home />} />
</Routes>*/