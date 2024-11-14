import React, { useState } from 'react';
import moment from 'moment';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const Calendario = () => {
    const [selectedDate, setSelectedDate] = useState(moment());
    const [searchQuery, setSearchQuery] = useState('');

    const getMonthDays = () => {
        const startOfMonth = selectedDate.clone().startOf('month');
        const endOfMonth = selectedDate.clone().endOf('month');
        
        const days = [];
        for (let i = 0; i < startOfMonth.day(); i++) {
            days.push(null);
        }
        for (let day = startOfMonth.clone(); day.isBefore(endOfMonth) || day.isSame(endOfMonth, 'day'); day.add(1, 'day')) {
            days.push(day.clone());
        }
        return days;
    };

    const nextMonth = () => {
        setSelectedDate(selectedDate.clone().add(1, 'month'));
    };

    const prevMonth = () => {
        setSelectedDate(selectedDate.clone().subtract(1, 'month'));
    };

    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const monthDays = getMonthDays();

    return (
        <div className="flex h-screen w-screen bg-gray-900">

            <div className="w-1/5 h-full bg-gray-800 p-4 pt-6 flex flex-col items-start">
                <h2 className="text-gray-300 text-xl mb-4">Buscar</h2>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar eventos..."
                    className="w-full p-2 rounded bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none"
                />
                <div className="mt-6 text-gray-400 text-sm">
                    No events
                </div>
            </div>

         
            <div className="w-4/5 h-full flex flex-col text-gray-300 bg-gray-800 px-10 pb-10">
      
                <div className="flex justify-between items-center p-4">
                    <button onClick={prevMonth} className="text-2xl">
                        <FaArrowAltCircleLeft />
                    </button>
                    <h2 className="text-2xl font-bold">
                        {selectedDate.format('MMMM YYYY')}
                    </h2>
                    <button onClick={nextMonth} className="text-2xl">
                        <FaArrowAltCircleRight />
                    </button>
                </div>

                
                <div className="grid grid-cols-7 text-center text-lg font-bold text-gray-500">
                    {daysOfWeek.map(day => (
                        <div key={day} className="py-2">{day}</div>
                    ))}
                </div>

            
                <div className="grid grid-cols-7 gap-1 flex-grow">
                    {monthDays.map((day, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-center border aspect-w-1 aspect-h-1 ${
                                day && day.isSame(selectedDate, 'day') ? 'bg-blue-500 text-white' : 'bg-gray-700'
                            }`}
                            onClick={() => day && setSelectedDate(day)}
                        >
                            {day ? day.date() : ''}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendario;
