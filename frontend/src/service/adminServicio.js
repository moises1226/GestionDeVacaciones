import api from "./api.js"

export const obtenerAdministradores = async () => {

    try {
        
        const guardadoAdmins = await api.get('/mostrarAdmin');
        return guardadoAdmins.data;

    } catch (error) {
        
        console.error('Error al obtener los administradores:', error);
        throw error; 

    }


}  


export const crearAdministrador = async (nuevoAdmin) => {

    try {
        
        const captador = await api.post('/crearAdmin' , nuevoAdmin );
        return captador.data;

    } catch (error) {
        
        console.error('Error al crear el administrador:', error);
        throw error;

    }

}



