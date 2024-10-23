import React, { useState } from 'react';
import { FaArrowAltCircleRight , FaArrowAltCircleLeft } from "react-icons/fa";




const Calendario = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [personData, setPersonData] = useState({ name: '', age: '', seniority: '' });

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setPersonData({ name: 'Juan Pérez', age: '30', seniority: '5 años' });
    setShowModal(true);
  };

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const startDay = firstDayOfMonth.getDay();

    const days = Array.from({ length: 42 }, (_, i) => {
      const date = new Date(firstDayOfMonth);
      date.setDate(i - startDay + 1);
      const isInCurrentMonth = date.getMonth() === currentDate.getMonth();
      const isSelected = selectedDate && date >= selectedDate && date < new Date(selectedDate.getTime() + 7 * 24 * 60 * 60 * 1000);

      return (
        <div 
          key={i} 
          className={`border p-4 text-center cursor-pointer transition duration-300 ${isInCurrentMonth ? 'hover:bg-gray-200' : 'opacity-50'} ${isSelected ? 'bg-green-500 text-white' : ''}`}
          onClick={() => isInCurrentMonth && handleDateClick(date)}
        >
          {isInCurrentMonth ? date.getDate() : ''}
        </div>
      );
    });

    return (
      <div>
        <div className="grid grid-cols-7 gap-2 font-bold text-center">
          {['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((day) => (
            <div key={day} className="p-2">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">{days}</div>
      </div>
    );
  };

  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="text-black-700"><FaArrowAltCircleLeft /> </button>
        <h2 className="text-xl capitalize">
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h2>
        <button onClick={() => changeMonth(1)} className="text-lg"><FaArrowAltCircleRight/></button>
      </div>

      {renderCalendar()}

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-2">Datos de la persona que asignó estos días</h3>
            <p>Nombre y Apellido: {personData.name}</p>
            <p>Edad: {personData.age}</p>
            <p>Antigüedad: {personData.seniority}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendario;
