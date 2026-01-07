
/*import React, { StrictMode } from 'react'; // <--- Añade { StrictMode } aquí
//import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Solo una vez
//import { StrictMode } from 'react';
//import { createRoot } from 'react-dom/client';
import './index.css';



//createRoot(document.getElementById('root')).render(
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>    
        <App />
  </React.StrictMode>   
);


import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Seleccionamos el elemento del DOM
const container = document.getElementById('root');

// Creamos la raíz de React
const root = ReactDOM.createRoot(container);

// Renderizamos la aplicación
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);*/
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 1. Importa el Router
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter> {/* 2. Envuelve tu App aquí */}
      <App />
    </BrowserRouter>
  </StrictMode>
);