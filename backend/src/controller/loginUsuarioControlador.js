import { autenticarUsuarioServicio } from '../service/loginServicio.js';
import { cerrarSesionServicio } from '../service/loginServicio.js'; 

// Controlador para iniciar sesión
export const iniciarSesionControlador = async (req, res) => {
    try {
        const { gmail, contrasenia } = req.body;

        // Llamamos al servicio para autenticar al tipo de usuario
        const usuarioAutenticado = await autenticarUsuarioServicio(gmail, contrasenia);

        // Si la autenticación es exitosa, devuelve una respuesta exitosa con el tipo de permiso
        return res.status(200).json({
            permisos: usuarioAutenticado.permisos, // Retorna los permisos del usuario o administrador
         
        });

    } catch (error) {
        console.error("Error al autenticar el usuario", error);
        return res.status(401).json({ error: error.message });
    }
}

export const cerrarSesionControlador = async (req, res) => {
    try {
       
       
        // Llamada al servicio para cerrar sesión
        await cerrarSesionServicio(req);

        // Eliminar la información de la sesión
        req.session.destroy((err) => {
            if (err) {
                console.error("Error al cerrar sesión", err);
                return res.status(500).json({ error: "Error al cerrar sesión" });
            }

            // Responder con éxito
            return res.status(200).json({ mensaje: "Sesión cerrada correctamente" });
        });
    } catch (error) {
        console.error("Error al cerrar sesión", error);
        return res.status(500).json({ error: error.message });
    }
};
