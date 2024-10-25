import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const Calendario = () => {
  const [fechaActual, setFechaActual] = useState(new Date());
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [mostrarVentana, setMostrarVentana] = useState(false);
  const [datosPersona, setDatosPersona] = useState({ nombre: '', edad: '', antigüedad: '' });

  const manejarClickFecha = (fecha) => {
    setFechaSeleccionada(fecha);
    setDatosPersona({ nombre: 'Juan Pérez', edad: '30', antigüedad: '5 años' });
    setMostrarVentana(true);
  };

  const Calendario = () => {
    const primerDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    const diasEnMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0).getDate();
    const diaInicio = primerDiaDelMes.getDay();

    const dias = Array.from({ length: 42 }, (_, i) => {
      const fecha = new Date(primerDiaDelMes);
      fecha.setDate(i - diaInicio + 1);
      const estaEnElMesActual = fecha.getMonth() === fechaActual.getMonth();
      const esSeleccionada = fechaSeleccionada && fecha >= fechaSeleccionada && fecha < new Date(fechaSeleccionada.getTime() + 7 * 24 * 60 * 60 * 1000);

      return (
        <div 
          key={i} 
          className={`border p-4 text-center cursor-pointer transition duration-300 ${estaEnElMesActual ? 'hover:bg-gray-200' : 'opacity-50'} ${esSeleccionada ? 'bg-green-500 text-white' : ''}`}
          onClick={() => estaEnElMesActual && manejarClickFecha(fecha)}
        >
          {estaEnElMesActual ? fecha.getDate() : ''}
        </div>
      );
    });

    return (
      <div>
        <div className="grid grid-cols-7 gap-2 font-bold text-center">
          {['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((dia) => (
            <div key={dia} className="p-2">{dia}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">{dias}</div>
      </div>
    );
  };

  const cambiarMes = (incremento) => {
    setFechaActual(new Date(fechaActual.getFullYear(), fechaActual.getMonth() + incremento, 1));
  };

  return (
    <div className="p-4 mb-16 mt-10">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => cambiarMes(-1)} className="text-black-700"><FaArrowAltCircleLeft /> </button>
        <h2 className="text-xl capitalize">
          {fechaActual.toLocaleString('default', { month: 'long' })} {fechaActual.getFullYear()}
        </h2>
        <button onClick={() => cambiarMes(1)} className="text-lg"><FaArrowAltCircleRight/></button>
      </div>

      {Calendario()}

      {mostrarVentana && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-2">Datos de la persona que asignó estos días</h3>
            <p>Nombre y Apellido: {datosPersona.nombre}</p>
            <p>Edad: {datosPersona.edad}</p>
            <p>Antigüedad: {datosPersona.antigüedad}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setMostrarVentana(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendario;
