import admin from "../model/administrador.js";
import validacionAd from "../model/validation/validacionAdmin.js";
import bcrypt from "bcrypt";

// Mostrar todos los administradores
export const mostrarAdminService = async () => {
    const mostrarAdmin = await admin.findAll();
    return mostrarAdmin;
}



// Crear un nuevo administrador
export const crearAdminService = async (datosAdmin) => {

    // Validación de los datos del administrador
    const validacionAdmin = validacionAd.parse(datosAdmin);

    // Comprobación de correo
    const correoExistente = await admin.findOne({ where: { gmail: validacionAdmin.gmail } });
    if (correoExistente) {
        throw new Error("El correo que ingresó ya está registrado");
    }

    // Encriptación de la contraseña
    const contraseniaEncriptada = await bcrypt.hash(validacionAdmin.contrasenia, 10);

    // Creación del nuevo administrador
    const nuevoAdmin = await admin.create({
        ...validacionAdmin,
        contrasenia: contraseniaEncriptada
    });

    return nuevoAdmin;
}




// Eliminar un administrador
export const eliminarAdminServicio = async (id) => {
    const adminEliminado = await admin.findOne({
        where: { id: id }
    });

    if (!adminEliminado) {
        return null;
    }

    await admin.destroy({
        where: { id: id }
    });

    return adminEliminado.id;
}
