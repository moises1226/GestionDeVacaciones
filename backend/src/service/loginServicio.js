import bcrypt from 'bcryptjs';
import usuario from '../model/Usuario.js';

// Servicio para autenticar usuario
export const autenticarUsuarioServicio = async (correo, contrasenia) => {
    // Buscar al usuario por el correo electrónico
    const usuarioExistente = await usuario.findOne({ where: { gmail: correo } });

    if (!usuarioExistente) {
        throw new Error("Correo o contraseña incorrectos");
    }

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    const esContraseñaValida = await bcrypt.compare(contrasenia, usuarioExistente.contrasenia);

    if (!esContraseñaValida) {
        throw new Error("Correo o contraseña incorrectos");
    }

    // Devuelvo la información del usuario (sin la contraseña)
    return {
        id: usuarioExistente.id,
        nombre: usuarioExistente.nombre,
        correo: usuarioExistente.gmail,  // Cambié "gmail" por "correo" para mayor claridad
    };
};

// Servicio para manejar el logout (cerrar sesión)
export const cerrarSesionServicio = async (req) => {
    return new Promise((resolver, rechazar) => {
        req.session.destroy((err) => {
            if (err) {
                return rechazar(new Error("Error al cerrar sesión"));
            }
            resolver();
        });
    });
};
