import usuario from "../model/Usuario.js";
import validacionUsuario from "../model/validation/validacionUsuario.js";
import bcrypt from "bcrypt";

export const mostrarUsuariosServicio = async () => {
    return await usuario.findAll();
};

export const crearUsuarioServicio = async (datosUsuario) => {
    const usuarioValido = validacionUsuario.parse(datosUsuario);

    // Comprobación de correo
    const correoExistente = await usuario.findOne({ where: { gmail: usuarioValido.gmail } });
    if (correoExistente) {
        throw new Error("El correo que ingresó ya está registrado");
    }

    // Encriptación de contraseña
    const contraseniaEncriptada = await bcrypt.hash(usuarioValido.contrasenia, 10);

    const nuevoUsuario = await usuario.create({
        ...usuarioValido,
        contrasenia: contraseniaEncriptada
    });

    return nuevoUsuario;
};

export const eliminarUsuarioServicio = async (idUsuario) => {
    const filasEliminadas = await usuario.destroy({ where: { id: idUsuario } });
    if (filasEliminadas === 0) {
        return null;
    }
    return idUsuario;
};
