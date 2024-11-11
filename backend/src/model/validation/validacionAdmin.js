import { z } from "zod";

const esquemaAdmin = z.object({
    nombre: z.string()
        .min(1, "Debe ingresar el nombre"),
    gmail: z.string()
        .min(1, "Necesita ingresar el gmail")
        .email("El formato del correo no es válido"),
    contrasenia: z.string()
        .min(8, "Necesita ingresar por lo menos 8 caracteres"),
    permisos: z.string()
        .min(1, "El campo permisos es obligatorio")
});

export default esquemaAdmin;
