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
    const newValue = name === "dni" ? (isNaN(parseInt(value, 10)) ? '' : parseInt(value, 10)) : value;


    setDatosFormulario((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  return (
    <div className="flex justify-center p-20 bg-blue-100">
      <div className="border border-blue-900 rounded-lg shadow-lg p-6 w-full max-w-md bg-white">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center">
            <h2 className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-900">
              Formulario
            </h2>
          </div>
  
          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input 
              type="text" 
              name="nombre" 
              value={DatosFormulario.nombre} 
              onChange={handleChange} 
              className="block w-full py-3 text-gray-800 bg-gray-200 border border-blue-300 rounded-lg px-11 focus:border-blue-900 focus:ring focus:ring-blue-900 focus:ring-opacity-50" 
              placeholder="Nombre Completo"
            />
          </div>
  
          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input 
              type="text" 
              name="apellido" 
              value={DatosFormulario.apellido} 
              onChange={handleChange} 
              className="block w-full py-3 text-gray-800 bg-gray-200 border border-blue-300 rounded-lg px-11 focus:border-blue-900 focus:ring focus:ring-blue-900 focus:ring-opacity-50" 
              placeholder="Apellido Completo"
            />
          </div>
  
          <div className="relative flex items-center mt-6">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm8 4a2 2 0 100-4 2 2 0 000 4zm-4 6h8m-8-4h8" />
              </svg>
            </span>
            <input 
              type="text" 
              name="dni" 
              value={DatosFormulario.dni} 
              onChange={handleChange} 
              className="block w-full py-3 text-gray-800 bg-gray-200 border border-blue-300 rounded-lg px-11 focus:border-blue-900 focus:ring focus:ring-blue-900 focus:ring-opacity-50" 
              placeholder="Ingrese su D.N.I"
            />
          </div>
  
          <div className="relative flex items-center mt-6">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M4 6h16M4 10h16v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10z" />
              </svg>
            </span>
            <input 
              type="email" 
              name="gmail" 
              value={DatosFormulario.gmail} 
              onChange={handleChange} 
              className="block w-full py-3 text-gray-800 bg-gray-200 border border-blue-300 rounded-lg px-11 focus:border-blue-900 focus:ring focus:ring-blue-900 focus:ring-opacity-50" 
              placeholder="Ingresar Gmail"
            />
          </div>
  
          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M4 6h16M4 10h16v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10z" />
              </svg>
            </span>
            <input 
              type="date" 
              name="fecha_inicio" 
              value={DatosFormulario.fecha_inicio} 
              onChange={handleChange} 
              className="block w-full px-10 py-3 text-gray-800 bg-gray-200 border border-blue-300 rounded-lg focus:border-blue-900 focus:ring focus:ring-blue-900 focus:ring-opacity-50" 
              placeholder="Fecha de Inicio"
            />
          </div>
  
          {error && <div className="text-red-500">{error}</div>} {/* Mensaje de error */}
          
          <button 
            type="submit" 
            className="w-full py-3 mt-6 font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-900 focus:ring-opacity-50"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
  
  
};

export default FormularioVacaciones;
