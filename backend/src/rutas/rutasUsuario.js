import {Router} from 'express';
import { mostrarUsuarioController ,  crearUsuarioController , eliminarUsuarioController } from '../controller/usuarioControlador.js';


const ruta = Router();


//creacion de rutas
ruta.get("/mostrarUsuarios"  , mostrarUsuarioController )
ruta.post("/crearUsuario" , crearUsuarioController );
ruta.delete("/eliminarUsuario/:id" , eliminarUsuarioController);


export default ruta;
