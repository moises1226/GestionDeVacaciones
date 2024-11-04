import React, { useState } from 'react';
import { crearFormulario } from '../service/formularioServicio.js';

const FormularioVacaciones = () => {
  // Estado para almacenar los datos del formulario
  const [DatosFormulario, setDatosFormulario] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    gmail: '',
    fecha_inicio: '',
  });

  
  const [error, setError] = useState('');

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación para asegurar que todos los campos requeridos están completos
    if (!DatosFormulario.nombre || !DatosFormulario.apellido || !DatosFormulario.gmail || !DatosFormulario.fecha_inicio) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    } 


    try {
      await crearFormulario(DatosFormulario);
      alert('Formulario enviado con éxito');

      // Reiniciar el formulario
      setDatosFormulario({
        nombre: '',
        apellido: '',
        dni: '',
        gmail: '',
        fecha_inicio: '',
      });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setError('Error al enviar el formulario. Intente nuevamente.');
    } 
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si el campo es "dni", convertimos el valor a un número entero
    const newValue = name === "dni" ? parseInt(value, 10) : value;

    setDatosFormulario((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  return (

    <div className="flex justify-center p-20 ml-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex items-center justify-center">
          <h2 className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
            Formulario
          </h2>
        </div>

        <div className="relative flex items-center mt-8">
          <span className="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </span>
          <input 
            type="text" 
            name="nombre" 
            value={DatosFormulario.nombre} // Conectar con el estado
            onChange={handleChange} // Manejar cambios
            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
            placeholder="Nombre Completo"
          />
        </div>

        <div className="relative flex items-center mt-8">
          <span className="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </span>
          <input 
            type="text" 
            name="apellido" 
            value={DatosFormulario.apellido} // Conectar con el estado
            onChange={handleChange} // Manejar cambios
            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
            placeholder="Apellido Completo"
          />
        </div>

        <div className="relative flex items-center mt-6">
          <span className="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm8 4a2 2 0 100-4 2 2 0 000 4zm-4 6h8m-8-4h8" />
            </svg>
          </span>
          <input 
            type="text" 
            name="dni" 
            value={DatosFormulario.dni} // Conectar con el estado
            onChange={handleChange} // Manejar cambios
            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
            placeholder="Ingrese su D.N.I"
          />
        </div>

        <div className="relative flex items-center mt-6">
          <span className="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          <input 
            type="email" 
            name="gmail" 
            value={DatosFormulario.gmail} // Conectar con el estado
            onChange={handleChange} // Manejar cambios
            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
            placeholder="Ingresar Gmail"
          />
        </div>

        <div className="relative flex items-center mt-4">
          <span className="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M4 6h16M4 10h16v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10z" />
            </svg>
          </span>
          <input 
            type="date" 
            name="fecha_inicio" 
            value={DatosFormulario.fecha_inicio} // Conectar con el estado
            onChange={handleChange} // Manejar cambios
            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
            placeholder="Fecha de Inicio"
          />
        </div>

        {error && <div className="text-red-500">{error}</div>} {/* Mensaje de error */}
        
        <button 
          type="submit" 
          className={`w-full py-3 mt-6 font-semibold text-white bg-blue-500 rounded-lg `}
         
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default FormularioVacaciones;
