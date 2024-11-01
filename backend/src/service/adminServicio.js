import admin from "../model/administrador.js";
import validacionAd from "../model/validation/validacionAdmin.js"

export const crearUsuarioService = async (ad) => {

    const veficacionAdmin = validacionAd.parse(ad);

    const _admin = await admin.create(veficacionAdmin);

    return _admin;


}


export const eliminarAdmin = async (id) => {
    
    
}

