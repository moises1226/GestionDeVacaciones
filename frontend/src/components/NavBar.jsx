import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from "../assets/logoPagina.png";

const NavBar = () => {
  const btn_link = "inline-block py-1 text-black hover:text-layout cursor-pointer mr-4";
  const activeLink = "inline-block py-1 text-layout mr-4";
  const location = useLocation(); 
  const isHome = location.pathname === "/"; 

  return (
    <header className={`body-font font-black w-full ${isHome ? 'absolute z-20' : 'relative'}  ${isHome ? 'bg-transparent' : 'bg-white shadow-md'}`}>
      <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center mb-4 md:mb-0">
          
          <img src={logo} alt="Logo" className="mx-auto mb-4 w-20 h-auto"   />
          <span className={`mb-4 text-xl font-semibold ${isHome ? 'text-white' : 'text-black'}`}>NilCors</span>

        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <NavLink to="/" className={({ isActive }) => `${isActive ? activeLink : btn_link} ${isHome ? 'text-white' : 'text-black'}`}>Inicio</NavLink>
          <NavLink to="/calendario" className={({ isActive }) => `${isActive ? activeLink : btn_link} ${isHome ? 'text-white' : 'text-black'}`}>Calendario</NavLink>
          <NavLink to="/validacion" className={({ isActive }) => `${isActive ? activeLink : btn_link} ${isHome ? 'text-white' : 'text-black'}`}>Validacion</NavLink>
        </nav>
        
        <NavLink to="/registro" className={({ isActive }) => `${isActive ? activeLink : btn_link} ${isHome ? 'text-white' : 'text-black'}`}>Registro</NavLink>
        <NavLink to="/login" className={({ isActive }) => `${isActive ? activeLink : btn_link} ${isHome ? 'text-white' : 'text-black'}`}>Login</NavLink>
      </div>
    </header>
  );
};

export default NavBar;
