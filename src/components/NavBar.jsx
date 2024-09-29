import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = () => {

    const btn_link = "black inline-block py-1 text-white hover:text-layout cursor-pointer mr-4";
    const activeLink = "black inline-block py-1 text-layout mr-4";

      return (
    <header className="text-gray-600 body-font">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span className="ml-3 text-xl font-semibold text-white">NilCors</span>
      </a>
      <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
        <NavLink to="/" className={({isActive}) => isActive?activeLink:btn_link }>Inicio</NavLink>
        <NavLink to="/cursos"  className={({isActive}) => isActive?activeLink:btn_link }>Cursos</NavLink>
        <NavLink to ="/sobreMi"  className={({isActive}) => isActive?activeLink:btn_link }>Sobre mi</NavLink>
      </nav>
        
        <NavLink to="/login"  className={({isActive}) => isActive?activeLink:btn_link }>Login</NavLink>
        <NavLink to="/registro"  className={({isActive}) => isActive?activeLink:btn_link }>Registro</NavLink>

    </div>
    </header>


  )
}

export default NavBar
