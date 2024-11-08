import {Router} from 'express';
import { mostrarUsuarioController ,  crearUsuarioController , eliminarUsuarioController } from '../controller/usuarioControlador.js';
import { mostrarFormularioController , crearFormularioController , eliminarFormularioController } from '../controller/formularioControlador.js';
import { iniciarSesionControlador, cerrarSesionControlador } from '../controller/loginUsuarioControlador.js';



const ruta = Router();


//rutas de usuario
ruta.get("/mostrarUsuarios"  , mostrarUsuarioController )
ruta.post("/crearUsuario" , crearUsuarioController );
ruta.delete("/eliminarUsuario/:id" , eliminarUsuarioController);
//rutas de formulario
ruta.get("/mostrarRegistradosF"  , mostrarFormularioController)
ruta.post("/crearFormulario" , crearFormularioController );
ruta.delete("/eliminarRegistroF/:gmail", eliminarFormularioController);

// Ruta para login
ruta.post('/acceso', iniciarSesionControlador);

// Ruta para logout
ruta.post('/cerrarSesion', cerrarSesionControlador);

export default ruta;
