import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from "../assets/logoPagina.png";

const NavBar = () => {
  const btn_link = "inline-block py-1 text-black hover:text-layout cursor-pointer mr-4";
  const activeLink = "inline-block py-1 text-layout mr-4";
  const location = useLocation(); 
  const isHome = location.pathname === "/"; 

  return (
    <header className={`body-font font-black w-full ${isHome ? 'absolute z-20' : 'relative'} ${isHome ? 'bg-transparent' : 'bg-white shadow-md'}`}>
      <div className="flex items-center justify-between p-2">
        {/* Logo e imagen */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-20 h-auto mr-2" />
          <span className={`text-xl font-semibold ${isHome ? 'text-white' : 'text-black'}`}>NilCors</span>
        </div>

        {/* Navegación */}
        <nav className="flex items-center space-x-4">
          <NavLink to="/" className={({ isActive }) => `${isActive ? activeLink : btn_link} ${isHome ? 'text-white' : 'text-black'}`}>Inicio</NavLink>
          <NavLink to="/calendario" className={({ isActive }) => `${isActive ? activeLink : btn_link} ${isHome ? 'text-white' : 'text-black'}`}>Calendario</NavLink>
          <NavLink to="/formularioVacaciones" className={({ isActive }) => `${isActive ? activeLink : btn_link} ${isHome ? 'text-white' : 'text-black'}`}>Formulario Vacaciones</NavLink>
          <NavLink to="/validacion" className={({ isActive }) => `${isActive ? activeLink : btn_link} ${isHome ? 'text-white' : 'text-black'}`}>Validación</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
