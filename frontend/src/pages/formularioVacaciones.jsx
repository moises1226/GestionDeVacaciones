import React, { useState } from 'react';
import { crearFormulario } from '../service/formularioServicio.js';
import { obtenerUsuarios } from '../service/usuarioServicio.js';

const FormularioVacaciones = () => {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    gmail: '',
    fecha_inicio: '',
  });

  const [error, setError] = useState('');

  const enviarFormulario = async (e) => {
    e.preventDefault();
  
    if (!datosFormulario.nombre || !datosFormulario.apellido || !datosFormulario.gmail || !datosFormulario.fecha_inicio) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }
  
    const dni = parseInt(datosFormulario.dni, 10);
    if (isNaN(dni)) {
      setError('El DNI debe ser un número válido.');
      return;
    }
  
    const fechaInicio = new Date(datosFormulario.fecha_inicio);
    if (isNaN(fechaInicio.getTime())) {
      setError('La fecha de inicio no es válida.');
      return;
    }
  
    const datosConFechaValida = { ...datosFormulario, dni, fecha_inicio: fechaInicio };
  
    const usuarios = await obtenerUsuarios();
    const usuarioEncontrado = usuarios.find(usuario => usuario.gmail === datosFormulario.gmail);
  
    if (!usuarioEncontrado) {
      setError('El usuario no está registrado.');
      return;
    }
  
    try {
      await crearFormulario(datosConFechaValida);
      setError('');
      alert('Formulario enviado con éxito');
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

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    const nuevoValor = name === "dni" ? (isNaN(parseInt(value, 10)) ? '' : parseInt(value, 10)) : value;
    setDatosFormulario((prev) => ({
      ...prev,
      [name]: nuevoValor,
    }));
  };

  return (
    <div className="flex justify-center p-20 bg-gradient-to-r from-orange-300 to-orange-400">
      <div className="border border-orange-600 rounded-lg shadow-lg p-6 w-full max-w-md bg-white">
        <form onSubmit={enviarFormulario}>
          <div className="flex items-center justify-center">
            <h2 className="w-1/3 pb-4 font-medium text-center text-orange-800 capitalize border-b-2 border-orange-600">
              Formulario de Vacaciones
            </h2>
          </div>
  
          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input 
              type="text" 
              name="nombre" 
              value={datosFormulario.nombre} 
              onChange={manejarCambio} 
              className="block w-full py-3 text-orange-800 bg-orange-50 border border-orange-300 rounded-lg px-11 focus:border-orange-600 focus:ring focus:ring-orange-600 focus:ring-opacity-50" 
              placeholder="Nombre Completo"
            />
          </div>
  
          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input 
              type="text" 
              name="apellido" 
              value={datosFormulario.apellido} 
              onChange={manejarCambio} 
              className="block w-full py-3 text-orange-800 bg-orange-50 border border-orange-300 rounded-lg px-11 focus:border-orange-600 focus:ring focus:ring-orange-600 focus:ring-opacity-50" 
              placeholder="Apellido Completo"
            />
          </div>
  
          <div className="relative flex items-center mt-6">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm8 4a2 2 0 100-4 2 2 0 000 4zm-4 6h8m-8-4h8" />
              </svg>
            </span>
            <input 
              type="text" 
              name="dni" 
              value={datosFormulario.dni} 
              onChange={manejarCambio} 
              className="block w-full py-3 text-orange-800 bg-orange-50 border border-orange-300 rounded-lg px-11 focus:border-orange-600 focus:ring focus:ring-orange-600 focus:ring-opacity-50" 
              placeholder="Ingrese su D.N.I"
            />
          </div>
  
          <div className="relative flex items-center mt-6">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M4 6h16M4 10h16v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10z" />
              </svg>
            </span>
            <input 
              type="email" 
              name="gmail" 
              value={datosFormulario.gmail} 
              onChange={manejarCambio} 
              className="block w-full py-3 text-orange-800 bg-orange-50 border border-orange-300 rounded-lg px-11 focus:border-orange-600 focus:ring focus:ring-orange-600 focus:ring-opacity-50" 
              placeholder="Ingresar Gmail"
            />
          </div>
  
          <div className="relative flex items-center mt-4">
            <label className="absolute left-10 text-orange-600 text-sm">Inicio de vacaciones</label>
            <input 
              type="date" 
              name="fecha_inicio" 
              value={datosFormulario.fecha_inicio} 
              onChange={manejarCambio} 
              className="block w-full px-10 py-3 text-orange-800 bg-orange-50 border border-orange-300 rounded-lg focus:border-orange-600 focus:ring focus:ring-orange-600 focus:ring-opacity-50" 
            />
          </div>
  
          {error && <div className="text-red-500 mt-2">{error}</div>}
          
          <button 
            type="submit" 
            className="w-full py-3 mt-6 font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-600 focus:ring-opacity-50"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioVacaciones;
