import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from "../assets/logoPagina.png";

const NavBar = ({ tipoDeUsuario }) => {
  const enlaceBtn = "inline-block py-1 text-black hover:text-layout cursor-pointer mr-4";
  const enlaceActivo = "inline-block py-1 text-layout mr-4";
  const ubicacion = useLocation(); 
  const esInicio = ubicacion.pathname === "/"; 

  return (
    <header className={`body-font font-black w-full ${esInicio ? 'absolute z-20' : 'relative'} ${esInicio ? 'bg-transparent' : 'bg-white shadow-md'}`}>
      <div className="flex items-center justify-between p-2">
        {/* Logo e imagen */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-20 h-auto mr-2" />
          <span className={`text-xl font-semibold ${esInicio ? 'text-white' : 'text-black'}`}>NilCors</span>
        </div>

        {/* Navegación */}
        <nav className="flex items-center space-x-4">
          <NavLink to="/" className={({ isActive }) => `${isActive ? enlaceActivo : enlaceBtn} ${esInicio ? 'text-white' : 'text-black'}`}>Inicio</NavLink>
          <NavLink to="/calendario" className={({ isActive }) => `${isActive ? enlaceActivo : enlaceBtn} ${esInicio ? 'text-white' : 'text-black'}`}>Calendario</NavLink>

          {/* Mostrar/ocultar enlace dependiendo del tipo de usuario */}
          {tipoDeUsuario === "admin" && (
            <NavLink to="/validacion" className={({ isActive }) => `${isActive ? enlaceActivo : enlaceBtn} ${esInicio ? 'text-white' : 'text-black'}`}>Validación</NavLink>
          )}

          {tipoDeUsuario === "usuario" && (
            <NavLink to="/formularioVacaciones" className={({ isActive }) => `${isActive ? enlaceActivo : enlaceBtn} ${esInicio ? 'text-white' : 'text-black'}`}>Formulario Vacaciones</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;

