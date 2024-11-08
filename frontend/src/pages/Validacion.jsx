import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Importamos los iconos
import { eliminarFormularioPorGmail, obtenerRegistros } from '../service/formularioServicio'; // Asegúrate de importar las funciones de la API

const Validacion = () => {
  const [usuarios, setUsuarios] = useState([]);

  // Función para obtener los registros al montar el componente
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const registros = await obtenerRegistros(); // Trae los registros de la API
        setUsuarios(registros); // Establece los registros en el estado
      } catch (error) {
        console.error("Error al obtener los registros", error);
      }
    };

    obtenerUsuarios();
  }, []); // Esto solo se ejecuta cuando el componente se monta

  // Función para cambiar el estado de validación (Aprobado/Rechazado)
  const cambiarValidacion = (gmail, estado) => {
    setUsuarios(usuarios.map(usuario =>
      usuario.gmail === gmail ? { ...usuario, validacion: estado } : usuario
    ));
  };

  // Función para eliminar un registro por gmail
  const eliminarUsuario = async (gmail) => {
    try {
      const respuesta = await eliminarFormularioPorGmail(gmail); // Llama al servicio de eliminación
      if (respuesta) {
        setUsuarios(usuarios.filter(usuario => usuario.gmail !== gmail)); // Elimina el usuario de la lista
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  return (
    <div className="max-w-4xl overflow-x-auto p-10">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border border-gray-300">Nombre</th>
            <th className="py-2 px-4 border border-gray-300">Gmail</th>
            <th className="py-2 px-4 border border-gray-300">Validacion</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.gmail} className="text-center">
              <td className="py-2 px-4 border border-gray-300">{usuario.nombre}</td>
              <td className="py-2 px-4 border border-gray-300">{usuario.gmail}</td>
              <td className="py-2 px-4 border border-gray-300">
                <div className="flex justify-center items-center space-x-4">
                  {/* Botón de Aprobado */}
                  <button
                    className={`p-2 rounded-full transition-colors duration-300 ${
                      usuario.validacion === 'Aprobado'
                        ? 'bg-green-500 text-white'
                        : 'bg-transparent text-green-500 hover:bg-green-100 hover:text-green-700'
                    }`}
                    onClick={() => cambiarValidacion(usuario.gmail, 'Aprobado')}
                  >
                    <FaCheck />
                  </button>

                  {/* Botón de Eliminar (Crucito) */}
                  <button
                    className="p-2 rounded-full text-red-500 hover:bg-red-100 hover:text-red-700"
                    onClick={() => eliminarUsuario(usuario.gmail)} // Elimina el usuario por gmail
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
  );
};

export default Validacion;
