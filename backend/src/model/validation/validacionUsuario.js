import { z } from "zod";

const esquemaUsuario = z.object({
    nombre: z.string().min(1, "Debe ingresar el nombre"),
    gmail: z.string().email("Debe ingresar un email válido"),
    contrasenia: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    antiguedad: z.number().int().positive("Debe ingresar la antigüedad como un número positivo"),
    permisos: z.string().min(1, "Debe definir los permisos del usuario")
});

export default esquemaUsuario;
