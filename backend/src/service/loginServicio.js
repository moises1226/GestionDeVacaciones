import bcrypt from 'bcryptjs';
import usuario from '../model/Usuario.js';

// Servicio para autenticar usuario
export const autenticarUsuarioServicio = async (gmail, contrasenia) => {
    // Buscar al usuario por el correo electrónico
    const usuarioExistente = await usuario.findOne({ where: { gmail: gmail } });

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
