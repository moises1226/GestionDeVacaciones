import {z} from "zod";

const esquemaFormulario = z.object({

    nombre : z.string().min(1 , "Debe ingresar el nombre"),
    apellido : z.string().min(1 , "Debe ingresar el apellido"),
    dni : z.number().int().min(10000000, "debe tener 8 caracteres"),
    gmail : z.string().min(1 , "Necesita ingresar el gmail"),
    fecha_inicio: z.string()
    .refine((val) => !isNaN(Date.parse(val)), {
        message: "La fecha debe ser una cadena válida en formato YYYY-MM-DD"
    })
    .transform((val) => new Date(val)) 
});

export default esquemaFormulario;