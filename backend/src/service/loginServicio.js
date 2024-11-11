import bcrypt from 'bcryptjs';
import usuario from '../model/Usuario.js';
import administrador from '../model/administrador.js'

// Servicio para autenticar usuario y administrador
export const autenticarUsuarioServicio = async (gmail, contrasenia) => {

    const usuarioExistente = await usuario.findOne({ where: { gmail: gmail } });
    const adminExistente = await administrador.findOne({ where: { gmail: gmail } });

    // Verificar si existe el usuario o el administrador
    if (!usuarioExistente && !adminExistente) {
        throw new Error("gmail no encontrado.");
    }

    // Verifica si es un usuario y compara la contraseña
    if (usuarioExistente) {
        const contraseniaValidaUS = await bcrypt.compare(contrasenia, usuarioExistente.contrasenia);
        if (!contraseniaValidaUS) {
            throw new Error("La contraseña del usuario es incorrecta.");
        }
        return {
            
            permisos: usuarioExistente.permisos 
        };  
    }

    // Verifica si es un administrador y compara la contraseña
    if (adminExistente) {
        const contraseniaValidaAD = await bcrypt.compare(contrasenia, adminExistente.contrasenia);
        if (!contraseniaValidaAD) {
            throw new Error("La contraseña del administrador es incorrecta.");
        }
        return {
            
            permisos: adminExistente.permisos 
        };  
    
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
