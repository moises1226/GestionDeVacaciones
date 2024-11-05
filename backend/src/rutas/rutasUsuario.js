import {Router} from 'express';
import { mostrarUsuarioController ,  crearUsuarioController , eliminarUsuarioController } from '../controller/usuarioControlador.js';
import { mostrarFormularioController , crearFormularioController , eliminarFormularioController } from '../controller/formularioControlador.js';

const ruta = Router();


//rutas de usuario
ruta.get("/mostrarUsuarios"  , mostrarUsuarioController )
ruta.post("/crearUsuario" , crearUsuarioController );
ruta.delete("/eliminarUsuario/:id" , eliminarUsuarioController);
//rutas de formulario
ruta.get("/mostrarRegistradosF"  , mostrarFormularioController)
ruta.post("/crearFormulario" , crearFormularioController );
ruta.delete("/eliminarRegistroF/:id" , eliminarFormularioController);

export default ruta;
