import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Calendario = () => {
  const [fechaActual, setFechaActual] = useState(new Date());
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [mostrarVentana, setMostrarVentana] = useState(false);
  const [personasPorFecha, setPersonasPorFecha] = useState(new Map());
  const [diasMarcados, setDiasMarcados] = useState(new Map());

  const manejarClickFecha = (fecha) => {
    setFechaSeleccionada(fecha);
    setMostrarVentana(true);
  };

  const registrarPersona = (fecha) => {
    const nombre = prompt("Ingrese el nombre:");
    const edad = prompt("Ingrese la edad:");
    const antigüedad = prompt("Ingrese la antigüedad:");
    const rol_o_departamento = prompt("Ingrese rol o departamento");
    const color = getRandomColor();
    const nuevaPersona = { nombre, edad, antigüedad, rol_o_departamento, color };

    const personasDelDia = personasPorFecha.get(fecha.toDateString()) || [];
    personasDelDia.push(nuevaPersona);
    personasPorFecha.set(fecha.toDateString(), personasDelDia);
    setPersonasPorFecha(new Map(personasPorFecha));
  };

  const marcarDias = (fecha, color) => {
    const nuevosDiasMarcados = new Map();
    for (let i = 0; i < 7; i++) {
      const nuevaFecha = new Date(fecha);
      nuevaFecha.setDate(fecha.getDate() + i);
      nuevosDiasMarcados.set(nuevaFecha.toDateString(), color);
    }
    setDiasMarcados(nuevosDiasMarcados);
  };

  const renderCalendario = () => {
    const primerDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    const diaInicio = primerDiaDelMes.getDay();

    const dias = Array.from({ length: 42 }, (_, i) => {
      const fecha = new Date(primerDiaDelMes);
      fecha.setDate(i - diaInicio + 1);
      const estaEnElMesActual = fecha.getMonth() === fechaActual.getMonth();

      const personasDelDia = personasPorFecha.get(fecha.toDateString());
      const colorMarcado = diasMarcados.get(fecha.toDateString());

      return (
        <div key={i} className={`border p-4 text-center cursor-pointer transition duration-300 ${estaEnElMesActual ? 'hover:bg-gray-200' : 'opacity-50'} ${colorMarcado ? 'bg-opacity-30' : ''}`}
          style={colorMarcado ? { backgroundColor: colorMarcado } : {}}
          onClick={() => {
            if (estaEnElMesActual) {
              manejarClickFecha(fecha);
            }
          }}
        >
          {estaEnElMesActual ? (
            <>
              <div>{fecha.getDate()}</div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                {personasDelDia && personasDelDia.map((persona, index) => (
                  <div key={index} style={{
                    backgroundColor: persona.color,
                    borderRadius: '50%',
                    width: '15px',
                    height: '15px',
                    margin: '0 2px',
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Evitar que se dispare el evento del div del día
                    marcarDias(fecha, persona.color);
                  }} />
                ))}
              </div>
            </>
          ) : ''}
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
        <button onClick={() => cambiarMes(-1)} className="text-black-700"><FaArrowAltCircleLeft /></button>
        <h2 className="text-xl capitalize">
          {fechaActual.toLocaleString('default', { month: 'long' })} {fechaActual.getFullYear()}
        </h2>
        <button onClick={() => cambiarMes(1)} className="text-lg"><FaArrowAltCircleRight /></button>
      </div>

      {renderCalendario()}

      {mostrarVentana && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-2">Datos de las personas asignadas a esta fecha</h3>
            {personasPorFecha.get(fechaSeleccionada.toDateString()) ? (
              <ul>
                {personasPorFecha.get(fechaSeleccionada.toDateString()).map((persona, index) => (
                  <li key={index} style={{ marginBottom: '10px' }}>
                    <div style={{ color: persona.color }}>
                      <strong>Nombre:</strong> {persona.nombre}<br />
                      <strong>Edad:</strong> {persona.edad}<br />
                      <strong>Antigüedad:</strong> {persona.antigüedad}<br />
                      <strong>Rol/Departamento:</strong> {persona.rol_o_departamento}
                    </div>
                  </li>
                ))} 
              </ul>
            ) : (
              <p>No hay registros para este día.</p>
            )}
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => registrarPersona(fechaSeleccionada)}>Registrar Nueva Persona</button>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setMostrarVentana(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendario;
