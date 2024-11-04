import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {crearUsuario } from "../service/usuarioServicio.js";

const Registro = () => {
    
    const [showAdminLogin, setShowAdminLogin] = useState(false);
    const [cargando , setCargando] = useState(false);
    
    // Estado para datos del usuario y del administrador, sin confirmarPassword
    const [adminData, setAdminData] = useState({
        nombre: '',
        gmail: '',
        contrasenia: ''
    });

    const [userData, setUserData] = useState({
        nombre: '',
        gmail: '',
        contrasenia: ''
    });

    // Estado temporal para confirmar contraseña en el formulario, solo en frontend
    const [confirmarPassword, setConfirmarPassword] = useState('');

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
    const handleConfirmPasswordChange = (e) => {
        setConfirmarPassword(e.target.value);
    };

    // Envío del formulario de usuario
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.contrasenia !== userData.confirmarPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
    
        setCargando(true);
        try {
            const nuevoUsuario = {
                nombre: userData.nombre,
                gmail: userData.gmail,
                contrasenia: userData.contrasenia,
                // antiguedad: userData.antiguedad // Asegúrate de incluir cualquier otro dato necesario
            };
            
            const usuarioCreado = await crearUsuario(nuevoUsuario);
            console.log('Usuario creado:', usuarioCreado);
            
            setUserData({
                nombre: '',
                gmail: '',
                contrasenia: '',
                confirmarPassword: '', 
                antiguedad: ''
            });
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        } finally {
            setCargando(false);
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
        <div className=" flex justify-center  p-14 ml-6">
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
                <div className="flex items-center justify-center mt-6 relative">
                    <a  onClick={handleAdminClick} className={` cursor-pointer w-1/3 pb-4 font-medium text-center  border-b ${showAdminLogin ? "text-gray-800 border-blue-500" : "text-gray-500"}`}>
                    Administrador
                    </a>

                    <a onClick={handleUserClick} className={` cursor-pointer w-1/3 pb-4 font-medium text-center  border-b ${!showAdminLogin ? "text-gray-800 border-blue-500" : "text-gray-500"}`}>
                    Usuario
                    </a>
                </div>

                {showAdminLogin ? (
                    <>
                        <h2 className="mt-6 text-xl font-semibold text-center">Registrarse como Administrador</h2>
                        <div className="relative flex items-center mt-8">
                            <span 
                                className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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

                        <div className="relative flex items-center mt-6">
                            <span 
                            className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

                        <div className="relative flex items-center mt-6">
                            <span 
                                className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>

                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                name="contrasenia" 
                                value={adminData.contrasenia} 
                                onChange={handleAdminChange}
                                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                                placeholder="Contraseña"/*cambio entre tipo texto y contraseña*/
                            />
                            
                            <span 
                                onClick={togglePasswordVisibility} 
                                className="absolute right-3 cursor-pointer">
                                {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-6 h-6 fill-current text-gray-500">
                                    <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"/>
                                </svg>
                                ): 
                                
                                (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-6 h-6 fill-current text-gray-500">
                                    <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/>
                                </svg>//Icono del ojo y funcion, todo el span
                                )}
                            </span>
                        </div>

                        <div className="relative flex items-center mt-6">
                            <span 
                                className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>
                            
                            <input 
                                type={showConfirmPassword ? 'text' : 'password'} 
                                name="confirmarPassword" 
                                value={adminData.confirmarPassword} 
                                onChange={handleAdminChange}
                                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                                placeholder="Confirmar Contraseña"
                            />
                            <span 
                                onClick={toggleConfirmPasswordVisibility} 
                                className="absolute right-3 cursor-pointer">
                                {showConfirmPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-6 h-6 fill-current text-gray-500">
                                    <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"/>
                                </svg>
                                ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-6 h-6 fill-current text-gray-500">
                                    <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/>
                                </svg>
                                )}
                            </span>
                        </div>

                        <div className="mt-6">
                            <button className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300">
                                Registrarse
                            </button>
                            <div className="mt-6 text-center">
                                <NavLink to="/login" className="text-sm text-blue-500 hover:underline">Ya tienes una cuenta? Ingresa</NavLink>
                            </div>
                        </div>
                </>

                ) : (

                    <>
                        <h2 className="mt-6 text-xl font-semibold text-center">Registrarse como Usuario</h2>
                        <div className="relative flex items-center mt-8">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <input 
                                type="text" 
                                name="nombre" 
                                value={userData.nombre} 
                                onChange={handleUserChange}
                                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                                placeholder="Nombre de usuario"
                            />
                        </div>

                        <div className="relative flex items-center mt-6">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

                        <div className="relative flex items-center mt-6">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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
                            <span 
                                onClick={togglePasswordVisibility} 
                                className="absolute right-3 cursor-pointer">
                                {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-6 h-6 fill-current text-gray-500"></svg>
                                ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-6 h-6 fill-current text-gray-500"></svg>
                                )}
                            </span>
                        </div>

                        <div className="relative flex items-center mt-6">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>
                            
                            <input 
                                type={showConfirmPassword ? 'text' : 'password'} 
                                name="confirmarPassword" 
                                value={userData.confirmarPassword} 
                                onChange={handleUserChange}
                                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                                placeholder="Confirmar Contraseña"
                            />
                            <span 
                                onClick={toggleConfirmPasswordVisibility} 
                                className="absolute right-3 cursor-pointer">
                                {showConfirmPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-6 h-6 fill-current text-gray-500">
                                
                               </svg>
                               ) : (
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-6 h-6 fill-current text-gray-500"></svg>
                                )}
                            </span>
                        </div>

                        <div className="relative flex items-center mt-6">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm8 4a2 2 0 100-4 2 2 0 000 4zm-4 6h8m-8-4h8" />
                                </svg>
                            </span>
                            
                            <input 
                                type="text" 
                                name="antiguedad" 
                                value={userData.antiguedad} 
                                onChange={handleUserChange}
                                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                                placeholder="Antigüedad"
                            />
                        </div>

                        <div className="mt-6">
                            <button className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300">
                                Registrarse
                            </button>
                            <div className="mt-6 text-center">
                                <NavLink to="/login" className="text-sm text-blue-500 hover:underline">Ya tienes una cuenta? Ingresa</NavLink>
                            </div>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default Registro;