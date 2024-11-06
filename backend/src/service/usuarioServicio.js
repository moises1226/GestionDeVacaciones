import { where } from "sequelize";
import usuario from "../model/Usuario.js";
import validacionUsuario from "../model/validation/validacionUsuario.js";
import bcrypt from "bcrypt";

export const mostrarUsuariosServicio = async () => {
    const listaUsuarios = await usuario.findAll();
    return listaUsuarios;
}

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
}

export const eliminarUsuarioServicio = async (idUsuario) => {
    const usuarioAEliminar = await usuario.findOne({ where: { id: idUsuario } });

    if (!usuarioAEliminar) {
        return null;
    }
    await usuario.destroy({ where: { id: idUsuario } });

    return usuarioAEliminar.id;
}
