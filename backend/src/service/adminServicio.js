import admin from "../model/administrador.js";
import validacionAd from "../model/validation/validacionAdmin.js"

export const mostrarAdminService = async () => {

    const mostrarAdmin = await admin.findAll();
    return mostrarAdmin;

}


export const crearAdminService = async (ad) => {

    const veficacionAdmin = validacionAd.parse(ad);

    const _admin = await admin.create(veficacionAdmin);

    return _admin;


}


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

