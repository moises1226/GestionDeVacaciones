import { z } from "zod";

// Validación de datos de login usando Zod
export const validacionLoginUs = z.object({
    gmail: z.string().email("El correo debe ser válido"),
    contrasenia: z.string()
});