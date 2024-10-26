import React from 'react';
import fondoVideo from '../assets/fondoInicio.mp4';
import fondoImg from '../assets/fondoInicioIMG.jpg'; // Asegúrate de que el nombre y extensión sean correctos

const Inicio = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* <video 
        className="absolute inset-0 object-cover w-full h-full" 
        src={fondoVideo} 
        autoPlay 
        loop 
        muted
      /> */}

      <img src={fondoImg} alt="Fondo" className="absolute inset-0 object-cover w-full h-full" />

      <div className="relative z-10 flex items-center justify-center h-full ">
        <h1 className="text-white text-4xl">Bienvenido a NilCors</h1>
      </div>
    </div>
  );
} 

export default Inicio;
