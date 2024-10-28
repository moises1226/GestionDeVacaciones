import usuario from "../model/Usuario.js";
import validacionUs from "../model/validation/validacionUsuario.js"

export const crearUsuarioService = async (u) => {

    const veficacionUsuario = validacionUs.parse(u);

    const _user = await usuario.create(veficacionUsuario);

    return _user;


}


export const eliminarUsuario = async (id) => {
    
    
}

