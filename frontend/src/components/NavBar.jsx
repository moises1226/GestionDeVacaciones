import React from 'react'
import { NavLink } from 'react-router-dom';

import logo from "../assets/logoPagina.png"

const NavBar = () => {

    const btn_link = "black inline-block py-1 text-black hover:text-layout cursor-pointer mr-4";
    const activeLink = "black inline-block py-1 text-layout mr-4";

      return (
    <header className="text-black body-font font-black">
    <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      
        <img src={logo} alt="Logo" className="mx-auto mb-4 w-20 h-ao" />
       
        <span className=" mb-4 text-xl font-semibold text-black">NilCors</span>
      </a>
      <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
        <NavLink to="/" className={({isActive}) => isActive?activeLink:btn_link }>Inicio</NavLink>
        <NavLink to ="/calendario"  className={({isActive}) => isActive?activeLink:btn_link }>Calendario</NavLink>
      </nav>
        
        <NavLink to="/registro"  className={({isActive}) => isActive?activeLink:btn_link }>Registro</NavLink>
        <NavLink to="/login"  className={({isActive}) => isActive?activeLink:btn_link }>Login</NavLink>
       

    </div>
    </header>


  )
}

export default NavBar
