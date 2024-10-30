import {Router} from 'express';
import { crearUsuarioController , eliminarUsuarioController } from '../controller/usuarioControlador.js';


const ruta = Router();


//creacion de rutas
ruta.post("/crearUsuario" , crearUsuarioController );
ruta.delete("/eliminar/:id" , eliminarUsuarioController);


export default ruta;
