import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {crearUsuario } from "../service/usuarioServicio.js";
import {crearAdministrador} from "../service/adminServicio.js"

const Registro = () => {
    
    const [showAdminLogin, setShowAdminLogin] = useState(false);
    
    // Estado para datos del usuario y del administrador, sin confirmarPassword
    const [adminData, setAdminData] = useState({
        nombre: '',
        gmail: '',
        contrasenia: '',
        confirmarPassword: ''
    });

    const [userData, setUserData] = useState({
        nombre: '',
        gmail: '',
        contrasenia: '',
        confirmarPassword: '',
        antiguedad: ''  // Aquí se agrega antiguedad al estado
    });
   

    // Funciones de cambio de datos de entrada para usuario y admin
    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    

    const handleAdminChange = (e) => {
        const { name, value } = e.target;
        setAdminData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Función para manejar el cambio de confirmarPassword
    // const handleConfirmPasswordChange = (e) => {
    //     setConfirmarPassword(e.target.value);
    // };

    // Envío del formulario de usuario
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!userData.nombre || !userData.gmail || !userData.contrasenia || !userData.confirmarPassword || !userData.antiguedad) {
            alert("Por favor, complete todos los campos.");
            return;
        }
        if (userData.contrasenia !== userData.confirmarPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
    
        try {
          
            const nuevoUsuario = {
                nombre: userData.nombre,
                gmail: userData.gmail,
                contrasenia: userData.contrasenia,
                antiguedad: parseInt(userData.antiguedad, 10), 
                permisos: "usuario",
            };
            
            // Llamada a la función para crear el usuario
            const usuarioCreado = await crearUsuario(nuevoUsuario);
            alert("Usuario creado exitosamente.");
            
            // Limpiar el formulario después del envío
            setUserData({
                nombre: '',
                gmail: '',
                contrasenia: '',
                confirmarPassword: '', 
                antiguedad: ''  // Asegúrate de limpiar también la antigüedad
            });
        } catch (error) {
            console.error('Error al crear el usuario:', error.response?.data || error.message);
        } 

    };

    const handleAdminSubmit = async (e) => {
        e.preventDefault();
    
        // Verificar si los campos del formulario están completos
        if (!adminData.nombre || !adminData.gmail || !adminData.contrasenia || !adminData.confirmarPassword) {
            alert("Por favor, complete todos los campos.");
            return;
        }
    
        // Verificar si las contraseñas coinciden
        if (adminData.contrasenia !== adminData.confirmarPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

    
        try {
            const nuevoAdmin = {
                nombre: adminData.nombre,
                gmail: adminData.gmail,
                contrasenia: adminData.contrasenia,
                permisos: "admin"
            };
    
            // Llamada a la función para crear el administrador
            const adminCreado = await crearAdministrador(nuevoAdmin);
    
            if (adminCreado) {
                alert("Administrador creado exitosamente.");
          
            }
    
            // Limpiar el formulario después del envío
            setAdminData({
                nombre: '',
                gmail: '',
                contrasenia: '',
                confirmarPassword: ''
            });
        } catch (error) {
            console.error('Error al crear el administrador:', error.response?.data || error.message);
        }
    };
    
    
    


        const handleAdminClick = () => {
        setShowAdminLogin(true);
    };

    const handleUserClick = () => {
        setShowAdminLogin(false);
    };



    // Mostrar/ocultar contraseñas
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);


return (
    <div className="flex justify-center p-3 ml-6">
        {/* Contenedor para el marco y sombra */}
        <div className="shadow-lg rounded-lg overflow-hidden border border-gray-200 bg-white w-full max-w-md px-14 py-4" >
           
                {/* Sección para seleccionar entre Administrador y Usuario */}
                <div className="flex items-center justify-center mt-6 relative">
                    {/* Enlace para el login de administrador */}
                    <a onClick={handleAdminClick} className={`cursor-pointer w-1/3 pb-4 font-medium text-center border-b ${showAdminLogin ? "text-gray-800 border-blue-500" : "text-gray-500"}`}>
                        Administrador
                    </a>

                    {/* Enlace para el login de usuario */}
                    <a onClick={handleUserClick} className={`cursor-pointer w-1/3 pb-4 font-medium text-center border-b ${!showAdminLogin ? "text-gray-800 border-blue-500" : "text-gray-500"}`}>
                        Usuario
                    </a>
                </div>

                {/* Si se selecciona el login de Administrador */}
                {showAdminLogin ? (
                        <>
                        <form className="w-full max-w-md" onSubmit={handleAdminSubmit}>
                            <h2 className="mt-6 text-xl font-semibold text-center">Registrarse como Administrador</h2>

                            {/* Campo para el nombre del administrador */}
                            <div className="relative flex items-center mt-8">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={adminData.nombre}
                                    onChange={handleAdminChange}
                                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                                    placeholder="Nombre de administrador"
                                />
                            </div>

                            {/* Campo para el email del administrador */}
                            <div className="relative flex items-center mt-6">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    name="gmail"
                                    value={adminData.gmail}
                                    onChange={handleAdminChange}
                                    className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                                    placeholder="Ingresar Gmail"
                                />
                            </div>

                            {/* Campo para la contraseña */}
                            <div className="relative flex items-center mt-6">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'} // Cambia el tipo según el estado
                                    name="contrasenia"
                                    value={adminData.contrasenia}
                                    onChange={handleAdminChange}
                                    className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                                    placeholder="Contraseña"
                                />
                                <span onClick={togglePasswordVisibility} className="absolute right-3 cursor-pointer">
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-6 h-6 fill-current text-gray-500">
                                         <path d="..."/> 
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-6 h-6 fill-current text-gray-500">
                                            <path d="..."/>
                                        </svg>
                                    )}
                                </span>
                            </div>

                            {/* Campo para confirmar la contraseña */}
                            <div className="relative flex items-center mt-6">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'} // Cambia el tipo según el estado
                                    name="confirmarPassword"
                                    value={adminData.confirmarPassword}
                                    onChange={handleAdminChange}
                                    className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                                    placeholder="Confirmar Contraseña"
                                />
                                <span onClick={toggleConfirmPasswordVisibility} className="absolute right-3 cursor-pointer">
                                    {showConfirmPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-6 h-6 fill-current text-gray-500">
                                            <path d="..."/>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-6 h-6 fill-current text-gray-500">
                                            <path d="..."/>
                                        </svg>
                                    )}
                                </span>
                            </div>

                            {/* Botón de registro */}
                            <div className="mt-6">
                                <button  onClick={handleAdminSubmit}  className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300">
                                    Registrarse
                                </button>
                                <div className="mt-6 text-center">
                                    <NavLink to="/login" className="text-sm text-blue-500 hover:underline">Ya tienes una cuenta? Ingresa</NavLink>
                                </div>
                            </div>
                            </form>
                        </>
                ) : (
                  
                    <>
                    <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    <h2 className="mt-6 text-xl font-semibold text-center">Registrarse como Usuario</h2>
                    
                    {/* Campo Nombre de Usuario */}
                    <div className="relative flex items-center mt-8">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            name="nombre"
                            value={userData.nombre}
                            onChange={handleUserChange}
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                            placeholder="Nombre de Usuario"
                        />
                    </div>
                
                    {/* Campo Gmail */}
                    <div className="relative flex items-center mt-6">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>
                        <input
                            type="email"
                            name="gmail"
                            value={userData.gmail}
                            onChange={handleUserChange}
                            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                            placeholder="Ingresar Gmail"
                        />
                    </div>
                
                    {/* Campo Antigüedad */}

                        <div className="relative flex items-center mt-6">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-4.418 0-8 2.686-8 6v2a2 2 0 002 2h12a2 2 0 002-2v-2c0-3.314-3.582-6-8-6z" />
                            </svg>
                        </span>
                        <input
                            type="number"
                            name="antiguedad"
                            value={userData.antiguedad}
                            onChange={handleUserChange} 
                            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                            placeholder="Años de Antigüedad"
                        />
                    </div>

                    {/* Campo Contraseña */}
                    <div className="relative flex items-center mt-6">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="contrasenia"
                            value={userData.contrasenia}
                            onChange={handleUserChange}
                            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                            placeholder="Contraseña"
                        />
                        <span onClick={togglePasswordVisibility} className="absolute right-3 cursor-pointer">
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-6 h-6 fill-current text-gray-500">
                                    <path d="..."/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-6 h-6 fill-current text-gray-500">
                                    <path d="..."/>
                                </svg>
                            )}
                        </span>
                    </div>
                
                    {/* Campo Confirmar Contraseña */}
                    <div className="relative flex items-center mt-6">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'} // Cambia el tipo según el estado
                            name="confirmarPassword"
                            value={userData.confirmarPassword}
                            onChange={handleUserChange}
                            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                            placeholder="Confirmar Contraseña"
                        />
                        <span onClick={toggleConfirmPasswordVisibility} className="absolute right-3 cursor-pointer">
                            {showConfirmPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-6 h-6 fill-current text-gray-500">
                                    <path d="..."/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-6 h-6 fill-current text-gray-500">
                                    <path d="..."/>
                                </svg>
                            )}
                        </span>
                    </div>
                
                    {/* Botón de registro para usuario */}
                    <div className="mt-6">
                        <button   onClick={handleSubmit}    className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300">
                            Registrarse
                        </button>
                        <div className="mt-6 text-center">
                            <NavLink to="/Login" className="text-sm text-blue-500 hover:underline">Ya tienes una cuenta? Ingresa</NavLink>
                        </div>
                    </div>

                    </form>
                </>
                
                )}
          
        </div>
    </div>
);

};

export default Registro;