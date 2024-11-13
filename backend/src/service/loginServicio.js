import bcrypt from 'bcryptjs';
import usuario from '../model/Usuario.js';
import administrador from '../model/administrador.js'

// Servicio para autenticar usuario y administrador
export const autenticarUsuarioServicio = async (gmail, contrasenia) => {
   
    // Primero, verificamos si el usuario existe en la base de datos
    const usuarioExistente = await usuario.findOne({ where: { gmail: gmail } });
    const adminExistente = await administrador.findOne({ where: { gmail: gmail } });

    //verificacion de q si no exite en la db
    if (!usuarioExistente && !adminExistente) {
        throw new Error("El correo electrónico no está registrado.");
    }

    // Verificación para el usuario
    if (usuarioExistente) {
        const contraseniaValidaUS = await bcrypt.compare(contrasenia, usuarioExistente.contrasenia);
        if (contraseniaValidaUS) {
            return {
                permisos: usuarioExistente.permisos,
               
            };
        } else {
            // Si la contraseña no es válida para el usuario, entonces verificamos si es un administrador
            if (adminExistente) {
                const contraseniaValidaAD = await bcrypt.compare(contrasenia, adminExistente.contrasenia);
                if (contraseniaValidaAD) {
                    return {
                        permisos: adminExistente.permisos,
                       
                    };
                } else {
                    throw new Error("La contraseña del administrador es incorrecta.");
                }
            } else {
                throw new Error("La contraseña del usuario es incorrecta.");
            }
        }
    }

    // Verificación para el administrador
    if (adminExistente) {
        const contraseniaValidaAD = await bcrypt.compare(contrasenia, adminExistente.contrasenia);
        if (contraseniaValidaAD) {
            return {
                permisos: adminExistente.permisos,
            };
        } else {
            throw new Error("La contraseña del administrador es incorrecta.");
        }
    }
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
