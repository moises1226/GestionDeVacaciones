import { mostrarUsuariosServicio, crearUsuarioServicio, eliminarUsuarioServicio } from "../service/usuarioServicio.js";
import { z } from "zod";

export const mostrarUsuarioController = async (req, res) => {
    try {
        const usuarios = await mostrarUsuariosServicio();
        if (usuarios.length === 0) {
            return res.status(404).json({ message: 'No hay registros en la tabla usuarios' });
        }
        return res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener los usuarios', error);
        return res.status(500).json({ error: 'Error al obtener los registros' });
    }
}

export const crearUsuarioController = async (req, res) => {
    try {
        const nuevoUsuario = await crearUsuarioServicio(req.body);
        return res.status(201).json(nuevoUsuario);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        } else if (error.message === 'El correo que ingresó ya está registrado') {
            return res.status(409).json({ error: error.message });
        }
        console.error("Error al crear el usuario:", error);
        return res.status(500).json({ error: 'Error interno al crear el usuario' });
    }
};


export const eliminarUsuarioController = async (req, res) => {
    try {
        const { id } = req.params;
        const idUsuario_eliminado = await eliminarUsuarioServicio(id);

        if (!idUsuario_eliminado) {
            console.error("El ID de usuario ingresado no existe");
            return res.status(404).json({ error: 'El ID de usuario que ingresó no existe' });
        }

        return res.status(200).json(`El ID que eliminó es: ${idUsuario_eliminado}`);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }  
        console.error("Error al eliminar el usuario", error);
        return res.status(500).json({ error: "Error al eliminar el usuario" });
    }
}
