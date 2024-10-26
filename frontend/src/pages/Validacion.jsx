import React from 'react';

const Validacion = () => {
  return (
    <div className="w-full flex flex-col md:flex-row h-screen p-3 bg-gray-100">

      <div className="w-full md:w-3/4 pt-4 pl-4 pb-4 flex flex-col">
        {/* Contenedor para la tabla */}
        <div className="flex-grow bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          {/* Encabezados de la tabla */}
        
            <table className="w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300 border-r border-gray-300 text-center w-1/12">ID</th>
                  <th className="py-2 px-4 border-b border-gray-300 border-r border-gray-300 text-center w-1/3">Nombre Completo</th>
                  <th className="py-2 px-4 border-b border-gray-300 border-r border-gray-300 text-center w-1/3">Correo Electrónico</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-center w-1/3">Estado de Validación</th>
                </tr>
              </thead>
            </table>
        

          {/* Cuerpo de la tabla con scroll */}
          <div className="overflow-y-auto max-h-[calc(100vh-200px)]"> {/* Ajusta la altura máxima según sea necesario */}
            <table className="w-full border border-gray-300">
              <tbody>
                {/* Registros de ejemplo */}
              
            
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300 text-center border-r border-gray-300 w-1/12">2</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center border-r border-gray-300 w-1/3">María Gómez</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center border-r border-gray-300 w-1/3">maria.gomez@example.com</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center w-1/3">No Validado</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300 text-center border-r border-gray-300 w-1/12">1</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center border-r border-gray-300 w-1/3">Juan Pérez</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center border-r border-gray-300 w-1/3">juan.perez@example.com</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center w-1/3">Validado</td>
                </tr>
                          <tr>
                  <td className="py-2 px-4 border-b border-gray-300 text-center border-r border-gray-300 w-1/12">1</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center border-r border-gray-300 w-1/3">Juan Pérez</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center border-r border-gray-300 w-1/3">juan.perez@example.com</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center w-1/3">Validado</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300 text-center border-r border-gray-300 w-1/12">2</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center border-r border-gray-300 w-1/3">María Gómez</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center border-r border-gray-300 w-1/3">maria.gomez@example.com</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center w-1/3">No Validado</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300 text-center border-r border-gray-300 w-1/12">1</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center border-r border-gray-300 w-1/3">Juan Pérez</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center border-r border-gray-300 w-1/3">juan.perez@example.com</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center w-1/3">Validado</td>
                </tr>
          
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className=" w-2/5 pt-4 pr-4 pb-4 flex flex-col ml-1">
        <div className="h-full bg-white border border-gray-300 rounded-lg shadow-lg">
          {/* Panel blanco a la derecha */}
        </div>
      </div>
    </div>
  );
};

export default Validacion;
