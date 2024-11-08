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


// services/formularioServicio.js
export const eliminarFormularioServicio = async (gmail) => {
    try {
        const registroEliminado = await formulario.findOne({
            where: { gmail: gmail }
        });

        if (!registroEliminado) {
            return { message: 'No se encontró un registro con ese correo.' };
        }

        await formulario.destroy({
            where: { gmail: gmail }
        });

        return { message: `El registro con correo ${gmail} ha sido eliminado.` };

    } catch (error) {
        console.error('Error al eliminar el registro:', error);
        return { message: 'Hubo un error al eliminar el registro. Intenta nuevamente.' };
    }
};

