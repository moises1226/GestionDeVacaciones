import { mostrarAdminService, crearAdminService, eliminarAdminServicio } from "../service/adminServicio"
import {z} from "zod";


export const mostrarAdminController = async (req , res) => {

    try {

        const admins = await mostrarAdminService();
        if(admins.lenth === 0){

          return  res.status(404).json({message :'No hay registros en la tabla Administrados'});

        }

        return res.status(200).json(admins);
   
     } catch (error) {

        console.error('Error al obtener los admin' , error);
        return res.status(500).json({error : 'Error al obtener los registros'})
        
    }

}







export const crearAdminController = async (req , res ) => {


    try{

        const nuevoAdmin = await crearAdminService(req.body);
        return res.status(400).json(nuevoAdmin);

    }catch (error){

        if(error instanceof z.ZodError){

            return res.status(400).json({errors : error.errors});

        }

        console.error("error al crear el admin" , error);
        return res.status(500).json({error : 'Error al crear el administrador'});
    }

}


export const eliminarAdminController = async (req  ,res ) => {

    try {

        const {id} = req.params;
        const idAdmin_eliminado = await eliminarAdminServicio(id);

        if (!idAdmin_eliminado) {
            console.error("El ID de admin ingresado no existe");
            return res.status(404).json({ error: 'El ID de admin que ingresó no existe' });
        }

        return res.status(200).json(`el id de que elimino es : ${idAdmin_eliminado}`);


    } catch (error) {

        if(error instanceof z.ZodError){

            return res.status(400).json({errors : error.errors});

        }  
       
        console.error("error al elimar el administrador" , error);
        return res.status(500).json({error : "error al eliminar el administrador"})
        
    }



}