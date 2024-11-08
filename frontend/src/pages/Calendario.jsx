import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { obtenerRegistros } from '../service/formularioServicio'; // Asegúrate de importar la función de la API

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
  const [personas, setPersonas] = useState([]); // Para almacenar las personas
  const [searchTerm, setSearchTerm] = useState(""); // Para filtrar por nombre

  // Función para cargar los registros de la API y asignarlos a las fechas
  useEffect(() => {
    const cargarRegistros = async () => {
      try {
        const registros = await obtenerRegistros();
        const personasMap = new Map();
        const listaPersonas = [];

        registros.forEach(persona => {
          const fechaInicio = new Date(persona.fecha_inicio);
          const fechaString = fechaInicio.toDateString();

          // Almacenar las personas
          listaPersonas.push(persona);

          if (!personasMap.has(fechaString)) {
            personasMap.set(fechaString, []);
          }
          personasMap.get(fechaString).push({
            ...persona,
            color: getRandomColor(), // Asignar un color aleatorio a cada persona
          });
        });

        setPersonas(listaPersonas);
        setPersonasPorFecha(personasMap);
      } catch (error) {
        console.error("Error al cargar los registros:", error);
      }
    };

    cargarRegistros();
  }, []); // Esto se ejecutará solo una vez cuando el componente se monte

  const manejarClickFecha = (fecha) => {
    setFechaSeleccionada(fecha);
    setMostrarVentana(true);
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
      {/* Panel izquierdo */}
      <div className="w-1/5" style={{ backgroundColor: '#B0C4DE' }} p-4>
      <h3 className="mt-4 text-xl font-semibold text-center text-white">Información sobre personas</h3>
  
  {/* Input de búsqueda */}
  <div className="flex justify-center items-center mb-4"> {/* Contenedor para centrar */}
    <input
      type="text"
      value={searchTerm}
      onChange={manejarBusqueda}
      placeholder="Buscar persona..."
      className="p-2 mt-4 border rounded-lg " // Borde, radio en los 4 lados, padding y ancho
    /> 
  </div>

  <ul className="space-y-2">
    {personasFiltradas.map((persona) => {
      const fechaInicio = new Date(persona.fecha_inicio);
      return (
        <li
          key={persona.id}
          className=" text-orange-400  cursor-pointer text-center p-2 hover:bg-gray-200 transition-colors"
          onClick={() => setFechaActual(new Date(fechaInicio))}
        >
          <p className="text-lg">{persona.nombre} {persona.apellido}</p>
        </li>
      );
    })}
  </ul>
</div>


      {/* Calendario y ventana */}
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
                        <strong>gmail:</strong> {persona.gmail}<br />
                        <strong>fecha_inicio:</strong> {persona.fecha_inicio}<br />
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
