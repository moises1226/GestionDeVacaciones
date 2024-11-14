import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/es';  // Configuración regional en español
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { obtenerRegistros } from '../service/formularioServicio.js'; // Asegúrate de que esta funcione correctamente
import { obtenerUsuarios } from '../service/usuarioServicio.js';  // Importamos la función para obtener usuarios

moment.locale('es-ar');  // Establece la localización a Argentina

const Calendario = () => {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(moment());
    const [consultaBusqueda, setConsultaBusqueda] = useState('');
    const [registros, setRegistros] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [vacacionesColoreadas, setVacacionesColoreadas] = useState([]); // Estado para almacenar los días coloreados
    const [fechasDeInicio, setFechasDeInicio] = useState([]); // Fechas de inicio de las vacaciones
    const [mostrarColoresVacaciones, setMostrarColoresVacaciones] = useState(true); // Estado para controlar la visibilidad de los colores
    const [panelVisible, setPanelVisible] = useState(false);  // Para controlar la visibilidad del panel
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);  // Información del usuario seleccionado

    // Obtener registros y usuarios al cargar el componente
    useEffect(() => {
        const obtenerRegistrosDesdeServidor = async () => {
            const datosRegistros = await obtenerRegistros(); 
            setRegistros(datosRegistros);
            const fechas = datosRegistros.map(registro => moment(registro.fecha_inicio).format('YYYY-MM-DD'));
            setFechasDeInicio(fechas); 
        };
        
        const obtenerUsuariosDesdeServidor = async () => {
            const datosUsuarios = await obtenerUsuarios(); 
            setUsuarios(datosUsuarios);
        };

        obtenerRegistrosDesdeServidor();
        obtenerUsuariosDesdeServidor();
    }, []);

    // Función para obtener los días del mes
    const obtenerDiasDelMes = () => {
        const inicioDelMes = fechaSeleccionada.clone().startOf('month');
        const finDelMes = fechaSeleccionada.clone().endOf('month');
        
        const dias = [];
        for (let i = 0; i < inicioDelMes.day(); i++) {
            dias.push(null);
        }
        for (let dia = inicioDelMes.clone(); dia.isBefore(finDelMes) || dia.isSame(finDelMes, 'day'); dia.add(1, 'day')) {
            dias.push(dia.clone());
        }
        return dias;
    };

    // Función para verificar el correo del usuario
    const verificarUsuario = (gmail) => {
        const usuarioEncontrado = usuarios.find(usuario => usuario.gmail === gmail);
        if (usuarioEncontrado) {
            return usuarioEncontrado;  // Devolvemos el usuario encontrado
        } else {
            return null;
        }
    };

    

    // Función que asigna los días de vacaciones dependiendo de la antigüedad
    const vacacionesPorAntiguedad = (antiguedad) => {
        if (antiguedad <= 5) {
            return 14; 
        } else if (antiguedad > 5 && antiguedad <= 10) {
            return 21; 
        } else if (antiguedad >= 20) {
            return 28; 
        }   
        return 0; 
    };

    // Función para mostrar la información del usuario
    const mostrarInformacionUsuario = (registro) => {
        const usuario = verificarUsuario(registro.gmail);
        if (usuario) {
            const fechaFinVacaciones = moment(registro.fecha_inicio).add(vacacionesPorAntiguedad(usuario.antiguedad) , 'days');
            setUsuarioSeleccionado({
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                gmail: usuario.gmail,
                fechaInicioVacaciones: moment(registro.fecha_inicio).format('LL'), // Fecha en español
                fechaFinVacaciones: fechaFinVacaciones.format('LL') // Fecha en español
            });
            setPanelVisible(true);  // Mostrar el panel con la información
        }
    };

    const siguienteMes = () => {
        setFechaSeleccionada(fechaSeleccionada.clone().add(1, 'month'));
    };

    const mesAnterior = () => {
        setFechaSeleccionada(fechaSeleccionada.clone().subtract(1, 'month'));
    };

    const diasDeLaSemana = Array.from({ length: 7 }, (_, i) => moment().weekday(i).format('ddd')); // Genera días en español
    const diasDelMes = obtenerDiasDelMes();

    // Filtrar registros según la consulta de búsqueda
    const registrosFiltrados = registros.filter(registro => {
        const nombreCompleto = `${registro.nombre} ${registro.apellido}`;
        return nombreCompleto.toLowerCase().includes(consultaBusqueda.toLowerCase());
    });


    return (
        <div className="flex h-screen w-screen bg-gray-900">
            <div className="w-1/5 h-full bg-gray-800 p-4 pt-6 flex flex-col items-start">
                <h2 className="text-gray-300 text-xl mb-4">Buscar</h2>
                <input
                    type="text"
                    value={consultaBusqueda}
                    onChange={(e) => setConsultaBusqueda(e.target.value)}
                    placeholder="Buscar registros..."
                    className="w-full p-2 rounded bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none"
                />
                <div className="mt-6 text-gray-400 text-sm w-full">
                    {registrosFiltrados.length === 0 ? (
                        "No se encontraron registros"
                    ) : (
                        <ul className="w-full">
                            {registrosFiltrados.map((registro, index) => (
                                <li 
                                    key={index} 
                                    className="text-gray-300 cursor-pointer text-2xl text-center py-4 px-2 rounded hover:bg-orange-500"
                                    onClick={() => {
                                        // Al hacer clic en el nombre, nos movemos a la fecha de inicio de vacaciones de este usuario
                                        const fechaInicio = moment(registro.fecha_inicio);
                                        setFechaSeleccionada(fechaInicio);  // Cambia la fecha seleccionada al día de inicio de vacaciones
                                    }}
                                >
                                    {registro.nombre} {registro.apellido}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="w-4/5 h-full flex flex-col text-gray-300 bg-gray-800 px-10 pb-10">
                <div className="flex justify-between items-center p-4">
                    <button onClick={mesAnterior} className="text-2xl text-gray-300">
                        <FaArrowAltCircleLeft />
                    </button>
                    <h2 className="text-2xl font-bold text-center text-gray-300">
                        {fechaSeleccionada.format('MMMM YYYY')}
                    </h2>
                    <button onClick={siguienteMes} className="text-2xl text-gray-300">
                        <FaArrowAltCircleRight />
                    </button>
                </div>

                <div className="grid grid-cols-7 text-center text-xl font-bold text-gray-500 transition-colors duration-300 hover:text-blue-500">
                    {diasDeLaSemana.map(dia => (
                        <div key={dia} className="py-3 text-lg font-bold">{dia}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1 flex-grow">
                    {diasDelMes.map((dia, index) => (
                        <div
                            key={index}
                            className={`relative w-full h-20 flex items-center justify-center text-center text-lg font-bold cursor-pointer border border-white
                            ${vacacionesColoreadas.includes(dia?.format('YYYY-MM-DD')) && mostrarColoresVacaciones ? 'bg-red-500' : ''}
                            transition-colors duration-300 hover:bg-blue-600`}
                            onClick={() => {
                                if (dia) {
                                    const registro = registros.find(r => moment(r.fecha_inicio).isSame(dia, 'day'));
                                    if (registro) {
                                        mostrarInformacionUsuario(registro);  // Mostrar la información del usuario
                                    }
                                    setFechaSeleccionada(dia);
                                }
                            }}
                        >
                            {dia && (
                                <>
                                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-white font-bold text-2xl">
                                        {dia.date()}
                                    </div>
                                    {/* Círculo solo en el día de inicio de vacaciones */}
                                    {fechasDeInicio.includes(dia.format('YYYY-MM-DD')) && (
                                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500"></div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Panel de Información del Usuario */}
            {panelVisible && usuarioSeleccionado && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
                        <h3 className="text-xl font-semibold mb-4">Información del Usuario</h3>
                        <p><strong>Nombre:</strong> {usuarioSeleccionado.nombre} {usuarioSeleccionado.apellido}</p>
                        <p><strong>Gmail:</strong> {usuarioSeleccionado.gmail}</p>
                        <p><strong>Fecha de Inicio de Vacaciones:</strong> {usuarioSeleccionado.fechaInicioVacaciones}</p>
                        <p><strong>Fecha Final de Vacaciones:</strong> {usuarioSeleccionado.fechaFinVacaciones}</p>
                        <button 
                            className="mt-4 text-white bg-blue-500 px-4 py-2 rounded" 
                            onClick={() => setPanelVisible(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendario;
