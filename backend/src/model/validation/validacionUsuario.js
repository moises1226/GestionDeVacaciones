import {z} from "zod";

const esquemaUsuario = z.object({

    nombre : z.string().min(1 , "Debe ingresar el nombre"),
    gmail : z.string().min(1 , "Necesita ingresar el gmail"),
    contrasenia  : z.string().min(8 , "Necesita ingresar por lo menos 8 caracteres")

})

export default esquemaUsuario;