import { mostrarAdminService, crearAdminService, eliminarAdminServicio } from "../service/adminServicio.js"
import {z} from "zod";


export const mostrarAdminController = async (req, res) => {
    try {
        const admins = await mostrarAdminService();


        if (admins.length === 0) {
            return res.status(404).json({ message: 'No hay registros en la tabla Administradores' });
        }

        return res.status(200).json(admins);

    } catch (error) {
        console.error('Error al obtener los admins', error);
        return res.status(500).json({ error: 'Error al obtener los registros' });
    }
}




export const crearAdminController = async (req, res) => {
    try {
      
        const nuevoAdmin = await crearAdminService(req.body);

     
        return res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            permisos: nuevoAdmin.permisos //retorno del tipo de permiso 
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }

        console.error("Error al crear el admin", error);
        return res.status(500).json({ error: 'Error al crear el administrador' });
    }
}



export const eliminarAdminController = async (req, res) => {
    try {
        const { id } = req.params;

       
        if (!id) {
            return res.status(400).json({ error: 'El ID del administrador es obligatorio' });
        }

        const idAdminEliminado = await eliminarAdminServicio(id);

        if (!idAdminEliminado) {
            console.error("El ID de admin ingresado no existe");
            return res.status(404).json({ error: 'El ID de admin que ingresó no existe' });
        }

        return res.status(200).json({ message: `Administrador con ID ${idAdminEliminado} eliminado correctamente` });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }

        console.error("Error al eliminar el administrador", error);
        return res.status(500).json({ error: "Error al eliminar el administrador" });
    }
}


