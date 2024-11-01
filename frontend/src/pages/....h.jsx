import { useState } from 'react';
import { crearUsuario } from '../services/api'; // Importa la función para hacer la solicitud a la API

const FormularioUsuario = () => {
    const [datosUsuario, setDatosUsuario] = useState({
        nombre: '',
        correo: '',
        contrasena: ''
    });
    const [listaUsuarios, setListaUsuarios] = useState([]); // Estado para almacenar la lista de usuarios
    const [cargando, setCargando] = useState(false); // Estado para mostrar "cargando..."

    // Función para manejar cambios en los campos del formulario
    const manejarCambio = (evento) => {
        const { name, value } = evento.target; // Destructura el 'name' y 'value' del evento
        setDatosUsuario({
            ...datosUsuario, // Copia todos los valores actuales de datosUsuario
            [name]: value // Actualiza solo el campo que cambió usando 'name' como clave y 'value' como valor
        });
    };

    // Función para manejar el envío del formulario
    const manejarEnvio = async (evento) => {
        evento.preventDefault(); // Evita que la página se recargue
        setCargando(true); // Muestra el estado de "cargando"
        try {
            const usuarioCreado = await crearUsuario(datosUsuario); // Llama a la API con los datos de usuario
            setListaUsuarios([...listaUsuarios, usuarioCreado]); // Actualiza la lista de usuarios
            setDatosUsuario({ nombre: '', correo: '', contrasena: '' }); // Resetea el formulario
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        } finally {
            setCargando(false); // Detiene el estado de "cargando"
        }
    };

    return (
        <form onSubmit={manejarEnvio}>
            <input
                type="text"
                name="nombre"
                value={datosUsuario.nombre}
                onChange={manejarCambio}
                placeholder="Nombre"
                required
            />
            <input
                type="email"
                name="correo"
                value={datosUsuario.correo}
                onChange={manejarCambio}
                placeholder="Correo"
                required
            />
            <input
                type="password"
                name="contrasena"
                value={datosUsuario.contrasena}
                onChange={manejarCambio}
                placeholder="Contraseña"
                required
            />
            <button type="submit" disabled={cargando}>
                {cargando ? 'Creando...' : 'Registrar'}
            </button>
        </form>
    );
};

export default FormularioUsuario;
