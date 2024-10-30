import usuario from "../model/Usuario.js";
import validacionUs from "../model/validation/validacionUsuario.js"

export const crearUsuarioServicio = async (u) => {


    const veficacionUsuario = validacionUs.parse(u);

    const _user = await usuario.create(veficacionUsuario);

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

