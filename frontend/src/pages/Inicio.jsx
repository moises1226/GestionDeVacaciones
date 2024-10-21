import React from 'react';
import fondoVideo from '../assets/fondoInicio.mp4'; // Asegúrate que el video esté en esta ruta

const Inicio = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video de fondo */}
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover" 
        src={fondoVideo} 
        autoPlay 
        loop 
       
      />

  
    </div>
  );
}

export default Inicio;
  