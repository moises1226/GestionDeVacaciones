import api from "./api.js"

export const obtenerRegistros = async () => {

    try {
        
        const guardadoRegistros = await api.get('/mostrarRegistradosF');
        return guardadoRegistros.data;

    } catch (error) {
        
        console.error('Error al obtener los registros des formulario:', error);
        throw error; 

    }


}  


export const crearFormulario = async (nuevoFormulario) => {

    try {
        
        const captador = await api.post('/crearFormulario' , nuevoFormulario );
        return captador.data;

    } catch (error) {
        
        console.error('Error al crear el formulario:', error);
        throw error;

    }

}

export const eliminarFormularioPorGmail = async (gmail) => {
    try {
      
        const respuesta = await api.delete(`/eliminarRegistroF/${gmail}`);

        return respuesta.data;

    } catch (error) {
        console.error('Error al eliminar el formulario:', error);
        throw error; 
    }
};

