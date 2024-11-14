import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { eliminarFormularioPorGmail, obtenerRegistros } from '../service/formularioServicio';
import { enviarGmail } from '../service/gmailEnvio';
import { obtenerUsuarios } from '../service/usuarioServicio';
import moment from 'moment';

const Validacion = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [aprobados, setAprobados] = useState(0);
  const [rechazados, setRechazados] = useState(0);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); // Para mostrar la información
  const [panelVisible, setPanelVisible] = useState(false); // Controlar la visibilidad del panel

  useEffect(() => {
    const obtenerUsuariosData = async () => {
      try {
        const registros = await obtenerRegistros();
        setUsuarios(registros);
      } catch (error) {
        console.error("Error al obtener los registros", error);
      }
    };

    obtenerUsuariosData();
  }, []);

  // Función para calcular los días de vacaciones según la antigüedad
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

 
  // Función para cambiar el estado de validación (Aprobado/Rechazado)
  const cambiarValidacion = async (gmail, estado, usuario) => {
    setUsuarios(usuarios.map(u =>
      u.gmail === gmail ? { ...u, validacion: estado } : u
    ));

    if (estado === 'Aprobado') {
      setAprobados(aprobados + 1);
    } else if (estado === 'Rechazado') {
      setRechazados(rechazados + 1);
    }

    const usuarioExistente = await obtenerUsuarios().then((usuariosData) => 
      usuariosData.find(u => u.gmail === gmail)
    );

    if (usuarioExistente) {
      const antiguedad = usuarioExistente.antiguedad;
      const diasVacaciones = vacacionesPorAntiguedad(antiguedad);
      console.log("Fecha de inicio:", usuario.fecha_inicio);
      console.log("Días de vacaciones:", diasVacaciones);
      
      const fechaFinVacaciones = moment(usuario.fecha_inicio).add(diasVacaciones, 'days');
      const fechaFinVacacionesRestada = fechaFinVacaciones.subtract(6, 'days').format('DD/MM/YYYY');

      if (estado === 'Aprobado') {
        const mensaje = `
          Estimado/a ${usuario.nombre} ${usuario.apellido},\n\n
          Nos complace informarle que su solicitud ha sido aprobada. 
          Su DNI es: ${usuario.dni} y la fecha de inicio de sus vacaciones es: ${usuario.fecha_inicio}.\n
          Su fecha de fin de vacaciones es: ${fechaFinVacacionesRestada}.\n\n
          ¡Disfrute de sus vacaciones!\n
          Atentamente,\n
          El equipo de recursos humanos.
        `;
        await enviarGmail(usuario.gmail, "Confirmación de Vacaciones Aprobadas", mensaje);
      } else if (estado === 'Rechazado') {
        const mensaje = `
          Estimado/a ${usuario.nombre} ${usuario.apellido},\n\n
          Lamentablemente, su solicitud no ha sido aceptada en esta ocasión. 
          Le agradecemos su interés y esperamos poder contar con usted en el futuro.\n\n
          Atentamente,\n
          El equipo de recursos humanos.
        `;
        await enviarGmail(usuario.gmail, "Resultado de Solicitud de Vacaciones", mensaje);
        await eliminarUsuario(gmail);
      }
    }
  };

  // Función para eliminar un usuario por gmail
  const eliminarUsuario = async (gmail) => {
    try {
      const respuesta = await eliminarFormularioPorGmail(gmail);
      if (respuesta) {
        setUsuarios(usuarios.filter(usuario => usuario.gmail !== gmail));
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  return (
    <div className="flex">
      {/* Panel lateral de estado */}
      <div className="w-64 bg-blue-100 p-4 rounded-l-lg shadow-md">
        <h3 className="font-medium text-lg mb-4 text-center">Estado de Solicitudes</h3>
        <div className="text-center">
          <div className="text-green-600 text-xl">Aprobados: {aprobados}</div>
          <div className="text-red-600 text-xl mt-2">Rechazados: {rechazados}</div>
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="max-w-4xl overflow-x-auto p-10 flex-1">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-gray-300">Nombre</th>
              <th className="py-2 px-4 border border-gray-300">Gmail</th>
              <th className="py-2 px-4 border border-gray-300">Validación</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.gmail} className="text-center">
                <td className="py-2 px-4 border border-gray-300">{usuario.nombre}</td>
                <td className="py-2 px-4 border border-gray-300">{usuario.gmail}</td>
                <td className="py-2 px-4 border border-gray-300">
                  <div className="flex justify-center items-center space-x-4">
                    <button
                      className={`p-2 rounded-full transition-all duration-300 ease-in-out ${
                        usuario.validacion === 'Aprobado'
                          ? 'bg-green-500 text-white transform scale-110'
                          : 'bg-transparent text-green-500 hover:bg-green-100 hover:text-green-700'
                      }`}
                      onClick={() => cambiarValidacion(usuario.gmail, 'Aprobado', usuario)}
                      disabled={usuario.validacion === 'Aprobado'} // Deshabilitar si ya está aprobado
                    >
                      <FaCheck />
                    </button>
                    <button
                      className={`p-2 rounded-full text-red-500 hover:bg-red-100 hover:text-red-700 ${
                        usuario.validacion === 'Aprobado' ? 'hidden' : ''
                      }`}
                      onClick={() => cambiarValidacion(usuario.gmail, 'Rechazado', usuario)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Panel de detalles del usuario seleccionado */}
      {panelVisible && usuarioSeleccionado && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Detalles del Usuario</h3>
            <p><strong>Nombre:</strong> {usuarioSeleccionado.nombre} {usuarioSeleccionado.apellido}</p>
            <p><strong>Gmail:</strong> {usuarioSeleccionado.gmail}</p>
            <p><strong>Fecha de Inicio de Vacaciones:</strong> {usuarioSeleccionado.fechaInicioVacaciones}</p>
            <p><strong>Fecha de Fin de Vacaciones:</strong> {usuarioSeleccionado.fechaFinVacaciones}</p>
            <button
              onClick={() => setPanelVisible(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Validacion;
