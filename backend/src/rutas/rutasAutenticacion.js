// /routes/authRoutes.js
import express from 'express';
import { iniciarSesionControlador } from '../controller/loginUsuarioControlador.js';
import { cerrarSesionControlador } from '../controller/loginUsuarioControlador.js';
import ruta from './rutasUsuario.js';

const ruta = express.Router();

// Ruta para login
ruta.post('/acceso', iniciarSesionControlador);

// Ruta para logout
ruta.post('/cerrarSesion', cerrarSesionControlador);

export default ruta;
