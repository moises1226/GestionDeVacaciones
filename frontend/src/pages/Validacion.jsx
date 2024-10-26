import React from 'react'

const Validacion = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="w-full md:w-3/4 p-4 flex flex-col">
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full bg-white border border-gray-300 h-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border-r">ID</th>
                <th className="py-2 px-4 border-r">Nombre</th>
                <th className="py-2 px-4 border-r">Email</th>
                <th className="py-2 px-4">Validación</th>
              </tr>
              <tr>
                <th colSpan="4" className="border-b"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-r">&nbsp;</td>
                <td className="py-2 px-4 border-r">&nbsp;</td>
                <td className="py-2 px-4 border-r">&nbsp;</td>
                <td className="py-2 px-4">&nbsp;</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-r">&nbsp;</td>
                <td className="py-2 px-4 border-r">&nbsp;</td>
                <td className="py-2 px-4 border-r">&nbsp;</td>
                <td className="py-2 px-4">&nbsp;</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-r">&nbsp;</td>
                <td className="py-2 px-4 border-r">&nbsp;</td>
                <td className="py-2 px-4 border-r">&nbsp;</td>
                <td className="py-2 px-4">&nbsp;</td>
              </tr>
              {/* Agregar más filas vacías si es necesario */}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full md:w-1/4 p-4 bg-gray-200 flex flex-col">
        <div className="h-full bg-white p-4 border border-gray-300">
          {/* Panel vacío */}
        </div>
      </div>
    </div>
  );
}

export default Validacion;