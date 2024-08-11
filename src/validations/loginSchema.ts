import { z } from "zod";

export const loginSchema = z.object({
    identification: z
        .string({ required_error: "* La identificación es requerida." })
        .min(9, { message: "* La identificación es de minímo 9 caractéres." })
        .max(9, { message: "* La identificación máximo 9 caractéres." })
        .refine(identification => !isNaN(parseInt(identification)), { message: "Ingresa solo números." })
    ,
    password: z
        .string({
            required_error: "* La contraseña es requerida.",
        })
        .min(6, {
            message: "* Ingresa al menos 6 caractéres."
        })
        .max(15, {
            message: "* Ingresa máximo 15 caractéres"
        }),
});




// identification: z
// .string()
// .min(9, { message: "La identificación es de minímo 9 caractéres." })
// ,
// password: z
// .string()
// .min(6, {
//     message: "Ingresa al menos 6 caractéres."
// })