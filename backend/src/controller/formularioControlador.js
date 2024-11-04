import {mostrarFormularioService , crearFormularioServicio , eliminarFormularioServicio} from "../service/formularioServicio.js"
import {z} from "zod";



export const mostrarFormularioController = async (req , res) => {

    try {

        const formulario = await mostrarFormularioService();
        if(formulario.length === 0){

          return  res.status(404).json({message :'No hay registros en la tabla usuarios'});

        }

        return res.status(200).json(usuarios);
   
     } catch (error) {

        console.error('Error al obtener los registros ' , error);
        return res.status(500).json({error : 'Error al obtener los registros del formulario'})
        
    }

}


export const crearFormularioController = async (req , res ) => {


    try{

        const nuevoFormulario = await crearFormularioServicio(req.body);

        return res.status(201).json(nuevoFormulario);

    }catch (error){

        if(error instanceof z.ZodError){
          return res.status(400).json({errors : error.errors});
         }else if (error.message === 'Este correo ya está registrado') {
            return res.status(400).json({ error: error.message });
         }


        console.error("error al crear el formulario" , error);
        return res.status(500).json({error : 'Error al crear el formulario'});
    }

}

export const eliminarFormularioController = async (req  ,res ) => {

        try {

            const {id} = req.params;
            const idForulario_eliminado = await eliminarFormularioServicio(id);

            if (!idForulario_eliminado) {
                console.error("El ID de formulario ingresado no existe");
                return res.status(404).json({ error: 'El ID de formulario que ingresó no existe' });
            }
    
            return res.status(200).json(`el id de que elimino es : ${idForulario_eliminado}`);


        } catch (error) {

            if(error instanceof z.ZodError){

                return res.status(400).json({errors : error.errors});
    
            }  
           
            console.error("error al elimar el registro" , error);
            return res.status(500).json({error : "error al eliminar el registro"})
            
        }
    


}
