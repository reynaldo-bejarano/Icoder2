import { z } from "zod";

export const addmorphologicalSchema = z.object({
    height: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    weight: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    IMC: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    fat: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    muscle: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    water: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    waist: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    hip: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    aright: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    aleft: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    lright: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    lleft: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    gright: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    gleft: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
});