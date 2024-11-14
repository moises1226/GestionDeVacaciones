import React, { useEffect, useState } from 'react';
import logo from '../assets/logoPagina.png';

const Inicio = () => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const createShape = () => {
      if (shapes.length >= 20) return;

      const shapeType = ['circle', 'square', 'triangle'];
      const type = shapeType[Math.floor(Math.random() * shapeType.length)];
      const size = Math.random() * 50 + 20;
      const leftPosition = Math.random() * 100;
      const animationDuration = Math.random() * 3 + 3;

      const shape = {
        id: Date.now() + Math.random(),
        type,
        size,
        leftPosition,
        animationDuration,
      };

      setShapes((prevShapes) => [...prevShapes, shape]);
    };

    const intervalId = setInterval(createShape, 500);
    return () => clearInterval(intervalId);
  }, [shapes]);

  const fadeEffect = () => {
    if (shapes.length > 20) {
      setShapes((prevShapes) => prevShapes.slice(1));
    }
  };

  useEffect(() => {
    const fadeInterval = setInterval(fadeEffect, 1000);
    return () => clearInterval(fadeInterval);
  }, [shapes]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-orange-500 via-orange-600 to-orange-700">
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Contenido centrado con el logo */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <img
          src={logo}
          alt="Logo"
          className="w-70 h-60 mb-6 transition-transform duration-500 ease-in-out transform hover:scale-110"
        />
        <h1 className="text-5xl font-semibold">Bienvenido a NilCors</h1>
      </div>

      {/* Animación de las figuras geométricas */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
        style={{ overflow: 'hidden' }}
      >
        {shapes.map((shape) => {
          let shapeClass = '';
          let extraStyles = {};

          switch (shape.type) {
            case 'circle':
              shapeClass = 'rounded-full bg-blue-400';
              break;
            case 'square':
              shapeClass = 'bg-yellow-400';
              break;
            case 'triangle':
              shapeClass = 'w-0 h-0 border-l-[25px] border-r-[25px] border-b-[50px] border-b-[#ff9f00]';
              break;
            default:
              break;
          }

          extraStyles = {
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            left: `${shape.leftPosition}vw`,
            animationDuration: `${shape.animationDuration}s`,
            animationName: 'fall',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          };

          return (
            <div
              key={shape.id}
              className={`absolute top-[-50px] opacity-100 ${shapeClass} animate-fall`}
              style={extraStyles}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Inicio;
