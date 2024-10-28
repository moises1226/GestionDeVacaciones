import {z} from "zod";

const esquemaUsuario = z.object({

    nombre : z.string().min(1 , "debe ingresar el nombre"),
    gmail : z.string().min(1 , "necesita ingresar el gmail"),
    contrasenia  : z.string().min(8 , "Necesita ingresar por lo menos 8 caracteres")

})
