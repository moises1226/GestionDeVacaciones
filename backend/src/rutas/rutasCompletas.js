import { Router } from 'express';
import { mostrarUsuarioController ,  crearUsuarioController , eliminarUsuarioController } from '../controller/usuarioControlador.js';
import { mostrarFormularioController , crearFormularioController , eliminarFormularioController } from '../controller/formularioControlador.js';
import { iniciarSesionControlador, cerrarSesionControlador } from '../controller/loginUsuarioControlador.js';
import { mostrarAdminController ,  crearAdminController , eliminarAdminController } from '../controller/adminControlador.js';
import { enviarCorreoControlador } from '../controller/envioGmailControlador.js'; 

const ruta = Router();

// Rutas de usuario
ruta.get("/mostrarUsuarios", mostrarUsuarioController);
ruta.post("/crearUsuario", crearUsuarioController);
ruta.delete("/eliminarUsuario/:id", eliminarUsuarioController);

// Rutas de formulario
ruta.get("/mostrarRegistradosF", mostrarFormularioController);
ruta.post("/crearFormulario", crearFormularioController);
ruta.delete("/eliminarRegistroF/:gmail", eliminarFormularioController);

// Ruta para login
ruta.post('/acceso', iniciarSesionControlador);

// Ruta para logout
ruta.post('/cerrarSesion', cerrarSesionControlador);

// Rutas de administrador
ruta.get("/mostrarAdmin", mostrarAdminController);
ruta.post("/crearAdmin", crearAdminController);
ruta.delete("/adminEliminado/:id", eliminarAdminController);

// Ruta para enviar correo
ruta.post("/enviar-correo", enviarCorreoControlador); 
export default ruta;
