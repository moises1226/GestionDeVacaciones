import {Router} from 'express';
import { mostrarAdminController ,  crearAdminController , eliminarAdminController } from '../controller/adminControlador';


const ruta = Router();


//creacion de rutas
ruta.get("/mostrarAdmin"  , mostrarAdminController )
ruta.post("/crearAdmin" , crearAdminController );
ruta.delete("/adminEliminado/id" , eliminarAdminController);


export default ruta;
