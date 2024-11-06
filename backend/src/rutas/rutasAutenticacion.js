// /routes/authRoutes.js
import express from 'express';
import { iniciarSesionControlador, cerrarSesionControlador } from '../controller/loginUsuarioControlador.js';

const ruta = express.Router();

// Ruta para login
ruta.post('/acceso', iniciarSesionControlador);

// Ruta para logout
ruta.post('/cerrarSesion', cerrarSesionControlador);

export default ruta;
