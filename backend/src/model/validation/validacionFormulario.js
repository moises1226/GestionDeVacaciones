import {z} from "zod";

const esquemaFormulario = z.object({

    nombre : z.string().min(1 , "Debe ingresar el nombre"),
    apellido : z.string().min(1 , "Debe ingresar el apellido"),
    dni : z.int().min(8 , "debe tener 8 caracteres"),
    gmail : z.string().min(1 , "Necesita ingresar el gmail"),
    fecha_ingreso: z.date({
        required_error: "Debe ingresar una fecha de ingreso válida",
        invalid_type_error: "La fecha debe ser un objeto Date"
    })
});

export default esquemaFormulario;