import React from 'react'

const SobreMi = () => {
  return (
    <div className="w-96 mx-auto mt-10">
    <div className="p-6 mr-2 bg-gray-800 sm:rounded-lg">
      <h2 className="text-4xl text-white font-extrabold tracking-tight">
        Ingresar solicitud de vacaciones
      </h2>
    </div>
    <div date-rangepicker className="mt-4">
      <label htmlFor="startDate" className="text-white">
        Fecha inicial
      </label>
      <input
        required
        name="start"
        type="date" 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 text-center dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Select date start"
      />
    </div>
    <div date-rangepicker className="mt-4">
      <label htmlFor="endDate" className="text-white">
        Fecha final
      </label>
      <input
        required
        name="end"
        type="date"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 text-center dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Select date end"
      />
    </div>
    <div className="mt-4">
      <label htmlFor="legajoId" className="text-white">
        Número de legajo
      </label>
      <input
        required
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Legajo ID"
      />
    </div>
    <div className="mt-4">
      <label htmlFor="adminId" className="text-white">
        Número de administrador
      </label>
      <input
        required
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Administrador ID"
      />
    </div>
    <div className="mt-4">
      <label htmlFor="comentarios" className="text-white">
        Comentarios
      </label>
      <textarea
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder=""
      />
    </div>
    <div className="flex justify-center items-center py-4">
      <button
        type="button"
      
        className="w-full bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover-bg-indigo-500 transition ease-in-out duration-300">
        Enviar
      </button>
    </div>
   
  </div>
  )
}

export default SobreMi