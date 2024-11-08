  import React, { useState } from 'react';
  import { NavLink, useNavigate } from 'react-router-dom';
  import logo from '../assets/logoPagina.png';
  import Cargador from '../components/cargador.jsx'; // Importa el componente Cargador
  import api from '../service/api.js'; // Asegúrate de importar tu configuración de axios

  const Login = ({ setIsAuthenticated }) => {
    const [gmail, setGmail] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      setIsLoading(true); 

      try {
        // Petición a la API para autenticar al usuario
        const response = await api.post('/acceso', { gmail, contrasenia });

        // Si la respuesta es exitosa (status 200)
        if (response.status === 200 ) {
          // Configura el estado de autenticación en el front
          setIsAuthenticated(true);
          // Redirige a la página principal
          navigate('/');
        }
      } catch (error) {
        // Si hay un error en la autenticación
        console.error('Error al iniciar sesión:', error);
        alert('Correo o contraseña incorrectos');
      }

      setIsLoading(false);
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <img src={logo} alt="Logo" className="mx-auto mb-6 w-24 h-auto" />
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Iniciar sesión</h1>

          <form onSubmit={handleLogin}>
            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input 
                type="email" 
                name='gmail'
                value={gmail} 
                onChange={(e) => setGmail(e.target.value)}
                className="block w-full py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg px-11 focus:border-blue-400 focus:outline-none" 
                placeholder="Correo electrónico" 
                required 
              />
            </div>

            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input 
                type="password" 
                name='contrasenia'
                value={contrasenia} 
                onChange={(e) => setContrasenia(e.target.value)} 
                className="block w-full px-11 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none" 
                placeholder="Contraseña" 
                required 
              />
            </div>

            <div className="mt-6">
              <button 
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? <Cargador /> : "Iniciar sesión"}
              </button>
              <div className="mt-6 text-center">
                <NavLink to="/Registro" className="text-sm text-blue-500 hover:underline">
                  ¿Aún no tienes una cuenta? Regístrate
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default Login;
