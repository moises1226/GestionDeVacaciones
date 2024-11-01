import { where } from "sequelize";
import usuario from "../model/Usuario.js";
import validacionUs from "../model/validation/validacionUsuario.js"



export const mostrarUsuarioService = async () => {

    const mostrarUsuario = await usuario.findAll();
    return mostrarUsuario;

}



export const crearUsuarioServicio = async (u) => {


    const verificacionUsuario = validacionUs.parse(u);

    const gmailExistente = await usuario.findOne({ where  : {gmail : verificacionUsuario.gmail} });

    
    if(gmailExistente){
        throw new Error("El correo que ingreso ya esta registrado")
    }

    const _user = await usuario.create(verificacionUsuario);

    return _user;


}


export const eliminarUsuarioServicio = async (id) => {
    
    const usuarioEliminado = await usuario.findOne({
        where: { id: id }
    });

    if (!usuarioEliminado) {
        return null;
    }
    await usuario.destroy({
        where: { id: id }
    });

    return usuarioEliminado.id;
    
    
}

