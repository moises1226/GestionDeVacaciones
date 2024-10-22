import React from 'react';
import fondoVideo from '../assets/fondoInicio.mp4'; // Asegúrate de que el video esté en esta ruta

const Inicio = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video 
        className="absolute inset-0 object-cover w-full h-full" 
        src={fondoVideo} 
        autoPlay 
        loop 
        muted
      />
      <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-20">
        <h1 className="text-white text-4xl">Bienvenido a NilCors</h1>
      </div>
    </div>
  );
}

export default Inicio;
