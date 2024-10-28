import {Router} from 'express';
import { crearUsuario } from '../controller/usuarioControlador.js';


const ruta = Router();


//creacion de rutas


ruta.post("/crearUsuario" , crearUsuario );


export default ruta;
