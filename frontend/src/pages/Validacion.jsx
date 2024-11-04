import React from 'react';

const Validacion = () => {

    const usuarios = [
      { id: 1, nombre: 'Moisés', gmail: 'moises@gmail.com', validacion: 'Aprobado' },
      { id: 2, nombre: 'Ana', gmail: 'ana@gmail.com', validacion: 'Pendiente' },
      { id: 3, nombre: 'Juan', gmail: 'juan@gmail.com', validacion: 'Rechazado' },
      { id: 4, nombre: 'Laura', gmail: 'laura@gmail.com', validacion: 'Aprobado' },
      { id: 5, nombre: 'Carlos', gmail: 'carlos@gmail.com', validacion: 'Pendiente' },
    ];
  
    return (
      <div className="max-w-4xl overflow-x-auto p-10">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-gray-300">ID</th>
              <th className="py-2 px-4 border border-gray-300">Nombre</th>
              <th className="py-2 px-4 border border-gray-300">Gmail</th>
              <th className="py-2 px-4 border border-gray-300">Validación</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="text-center">
                <td className="py-2 px-4 border border-gray-300">{usuario.id}</td>
                <td className="py-2 px-4 border border-gray-300">{usuario.nombre}</td>
                <td className="py-2 px-4 border border-gray-300">{usuario.gmail}</td>
                <td className="py-2 px-4 border border-gray-300">{usuario.validacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default Validacion;
