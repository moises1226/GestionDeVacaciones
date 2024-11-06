import React from 'react';
import fondoImg from '../assets/fondoInicioIMG.jpg'; // Asegúrate de que el nombre y extensión sean correctos

const Inicio = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Imagen de fondo */}
      <img src={fondoImg} alt="Fondo" className="absolute inset-0 object-cover w-full h-full" />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Contenido */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white text-4xl">Bienvenido a NilCors</h1>
      </div>
    </div>
  );
}

export default Inicio;
