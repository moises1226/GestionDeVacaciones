import axios from "axios";

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://miapi.com/api' : 'http://localhost:3000/api', 
  timeout: 10000,
  // withCredentials: true, // Solo si necesitas cookies o autenticación por sesión
  headers: {
    "Content-Type": "application/json", // Asegúrate de que se envíe como JSON
  },
});

// Opción para manejar errores globalmente
api.interceptors.response.use(
  (response) => response, 
  (error) => {
    console.error('Error global:', error);
    return Promise.reject(error); // Devuelve el error para su manejo en la llamada
  }
);

export default api;
