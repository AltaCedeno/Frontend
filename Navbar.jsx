import React from 'react';

import { Link, NavLink } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid"> </div>
        <Link className="navbar-brand" to="#">MiProyecto</Link  >
     <ul className="nav-links">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Sobre nosotros
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Contacto
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;