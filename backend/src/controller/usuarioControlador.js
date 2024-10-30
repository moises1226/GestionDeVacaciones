import { crearUsuarioService } from "../service/usuarioServicio.js"
import {z} from "zod";

export const crearUsuario = async (req , res ) => {


    try{

        const nuevoUsuario = await crearUsuarioService(req.body);
        return res.status(201).json(nuevoUsuario);

    }catch (error){

        if(error instanceof z.ZodError){

            return res.status(400).json({errors : error.errors});

        }

        console.error("error al crear el usuario" , error);
        return res.status(500).json({error : 'Error al crear el usuario'});
    }

}
