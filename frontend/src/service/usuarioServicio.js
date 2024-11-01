import api from "./api.js"

export const obtenerUsuarios = async () => {

    try {
        
        const guardadoUsuarios = await api.get('/mostrarUsuarios');
        return guardadoUsuarios.data;

    } catch (error) {
        
        console.error('Error al obtener usuarios:', error);
        throw error; 

    }


}  


export const crearUsuario = async (nuevoUsuario) => {

    try {
        
        const captador = await api.post('/crearUsuarios' , nuevoUsuario );
        return captador.data;

    } catch (error) {
        
        console.error('Error al crear usuario:', error);
        throw error;

    }

}



