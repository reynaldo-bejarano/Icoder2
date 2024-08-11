import { z } from "zod";

export const addMedicalSchema = z.object({

    area: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    tipo: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    grado: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    especificacion: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    recuperacion: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    anotacion: z
        .string({ required_error: "* Requerido" }),
    recomendacion: z
        .string({ required_error: "* Requerido" })

});