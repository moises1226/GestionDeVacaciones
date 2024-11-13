import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { obtenerRegistros } from '../service/formularioServicio.js';
import { obtenerUsuarios } from '../service/usuarioServicio.js';

// Función para obtener el color aleatorio
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Función para determinar los días de vacaciones según la antigüedad
const vacacionesPorAntiguedad = (antiguedad) => {

  if (antiguedad <= 5) {
    return 14; 
  } else if (antiguedad > 5 && antiguedad <= 10) {
    return 21; 
  } else if (antiguedad >= 20) {
    return 28; 
  }
  return 0; 
};

const Calendario = () => {
  const [fechaActual, setFechaActual] = useState(new Date());
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [mostrarVentana, setMostrarVentana] = useState(false);
  const [personasPorFecha, setPersonasPorFecha] = useState(new Map());
  const [diasMarcados, setDiasMarcados] = useState(new Map());
  const [personas, setPersonas] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [usuarios, setUsuarios] = useState([]); 

  useEffect(() => {
    const cargarRegistros = async () => {
      try {
        const usuarioData = await obtenerUsuarios();
        const registros = await obtenerRegistros();
        const personasMap = new Map();
        const listaPersonas = [];

        registros.forEach(persona => {
          const fechaInicio = new Date(persona.fecha_inicio);
          const fechaString = fechaInicio.toDateString();

          listaPersonas.push(persona);

          if (!personasMap.has(fechaString)) {
            personasMap.set(fechaString, []);
          }
          personasMap.get(fechaString).push({
            ...persona,
            color: getRandomColor(),
          });
        });

        setUsuarios(usuarioData);
        setPersonas(listaPersonas);
        setPersonasPorFecha(personasMap);
      } catch (error) {
        console.error("Error al cargar los registros:", error);
      }
    };

    cargarRegistros();
  }, []); 

  // Función para calcular los días de vacaciones según la antigüedad
  const calcularDiasDeVacaciones = (gmail) => {
    const usuario = usuarios.find((usuario) => usuario.gmail === gmail);
    return usuario ? vacacionesPorAntiguedad(usuario.antiguedad) : 0;
  };

  // Marcar los días en el calendario según el rango de vacaciones
  const marcarDias = (fecha, persona) => {
    const diasDeVacaciones = calcularDiasDeVacaciones(persona.gmail);
    const nuevosDiasMarcados = new Map(diasMarcados);
    const color = persona.color;
    const dias = [];

    // Agregregacion de los días del rango de vacaciones al calendario
    for (let i = 0; i < diasDeVacaciones; i++) {
      const nuevaFecha = new Date(fecha);
      nuevaFecha.setDate(fecha.getDate() + i);
      dias.push(nuevaFecha.toDateString());

      nuevosDiasMarcados.set(nuevaFecha.toDateString(), color);
    }

    setDiasMarcados(nuevosDiasMarcados);
  };

  // Función para manejar el clic en la fecha
  const manejarClickFecha = (fecha) => {
    setFechaSeleccionada(fecha);
    setMostrarVentana(true);
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
        <div
          key={i}
          className={`border p-4 text-center cursor-pointer transition duration-300 ${estaEnElMesActual ? 'hover:bg-gray-200' : 'opacity-50'} ${colorMarcado ? 'bg-opacity-30' : ''}`}
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
                  <div
                    key={index}
                    style={{
                      backgroundColor: persona.color,
                      borderRadius: '50%',
                      width: '15px',
                      height: '15px',
                      margin: '0 2px',
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      marcarDias(fecha, persona);
                    }}
                  />
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

  const manejarBusqueda = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar las personas según el nombre ingresado
  const personasFiltradas = personas.filter(persona => {
    const nombreCompleto = `${persona.nombre} ${persona.apellido}`.toLowerCase();
    return nombreCompleto.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex">
    
      <div className="w-1/5" style={{ backgroundColor: '#B0C4DE' }} p-4>
        <h3 className="mt-4 text-xl font-semibold text-center text-white">Información sobre personas</h3>

        <div className="flex justify-center items-center mb-4"> 
          <input
            type="text"
            value={searchTerm}
            onChange={manejarBusqueda}
            placeholder="Buscar persona..."
            className="p-2 mt-4 border rounded-lg "
          /> 
        </div>

        <ul className="space-y-2">
          {personasFiltradas.map((persona) => {
            const fechaInicio = new Date(persona.fecha_inicio);
            return (
              <li
                key={persona.id}
                className="text-orange-400 cursor-pointer text-center p-2 hover:bg-gray-200 transition-colors"
                onClick={() => setFechaActual(new Date(fechaInicio))}
              >
                <p className="text-lg">{persona.nombre} {persona.apellido}</p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Calendario */}
      <div className="flex-1 p-4 mb-16 mt-10">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => cambiarMes(-1)} className="text-black-700"><FaArrowAltCircleLeft /></button>
          <h2 className="text-xl capitalize">
            {fechaActual.toLocaleString('es-ES', { month: 'long' })} {fechaActual.getFullYear()}
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
                        <strong>Gmail:</strong> {persona.gmail}<br />
                        <strong>Fecha de inicio:</strong> {persona.fecha_inicio}<br />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay registros para este día.</p>
              )}

              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setMostrarVentana(false)}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendario;
