import api from './api'; // Asegúrate de que la ruta sea correcta dependiendo de la estructura de tu proyecto

// Función para iniciar sesión
export const iniciarSesion = async (gmail, contrasenia) => {
  try {
    const respuesta = await api.post('/acceso', { gmail, contrasenia });
    console.log('Respuesta del servidor:', respuesta.data);
    return respuesta.data; 
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
    throw error; 
  }
};

// Función para cerrar sesión
export const cerrarSesion = async () => {
  try {
    const respuesta = await api.post('/cerrarSesion');
    console.log('Sesión cerrada:', respuesta.data);
    return respuesta.data; 
  } catch (error) {
    console.error('Error al cerrar sesión:', error.response ? error.response.data : error.message);
    throw error; 
  }
};
