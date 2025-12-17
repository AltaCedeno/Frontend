// App.jsx

import React from 'react';
import './App.css'; 

import UserRegister from './components/UserRegister';
import Login from './components/Login';
import LoginHandler from './components/LoginHandler';


function App() {
  return (
    <div className="App">
      <div className="contenedor-principal">
        <h3>APLICACION FULL STACK DE USUARIOS</h3>
        
        <UserRegister /> 
        
        <hr style={{ margin: `40px 0` }} />
        
        <LoginHandler/>
      </div>
    </div>
  );
}

export default App;