import { where } from "sequelize";
import formulario from "../model/formulario.js";
import validacionFormulario from "../model/validation/validacionFormulario.js"



export const mostrarFormularioService = async () => {

    const mostrarRegistros = await formulario.findAll();
    return mostrarRegistros;

}



export const crearFormularioServicio = async (f) => {


    const verificacionRegistros = validacionFormulario.parse(f);

    const gmailExistente = await formulario.findOne({ where  : {gmail : verificacionRegistros.gmail} });

    
    if(gmailExistente){
        throw new Error("El correo que ingreso ya esta registrado")
    }

    const nuevoFormulario = await formulario.create(verificacionRegistros);

    return nuevoFormulario;


}


export const eliminarFormularioServicio = async (id) => {
    
    const registroEliminado = await formulario.findOne({
        where: { id: id }
    });

    if (!registroEliminado) {
        return null;
    }
    await formulario.destroy({
        where: { id: id }
    });

    return registroEliminado.id;
    
    
}

