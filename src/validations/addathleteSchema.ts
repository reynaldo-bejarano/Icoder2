import { z } from "zod";

export const addathleteSchema = z.object({
    identification: z
        .string({ required_error: "* Requerido" })
        .min(9, { message: "* La identificación es de minímo 9 caractéres" })
        .max(9, { message: "* La identificación máximo 9 caractéres" })
        .refine(identification => !isNaN(parseInt(identification)), { message: "Ingresa solo números" }),
    name: z
        .string({ required_error: "* Requerido", })
        .min(3, { message: "* Ingresa al menos 3 caractéres" })
        .max(15, { message: "* Ingresa máximo 15 caractéres" }),
    lastname1: z
        .string({ required_error: "* El apellido es requerido", })
        .min(3, { message: "* Ingresa al menos 3 caractéres." })
        .max(15, { message: "* Ingresa máximo 15 caractéres" }),
    lastname2: z
        .string({ required_error: "* El apellido es requerido", })
        .min(3, { message: "* Ingresa al menos 3 caractéres" })
        .max(15, { message: "* Ingresa máximo 15 caractéres" }),
    email: z
        .string({ required_error: "* Ingresa un correo electrónico", })
        .min(3, { message: "* Ingresa un correo electrónico" }),
    birth: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    genre: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    phone: z
        .string({ required_error: "* La teléfono es requerido" })
        .min(8, { message: "* Ingresa al menos 8 dígitos" })
        .max(8, { message: "* Máximo 8 dígitos" })
        .refine(phone => !isNaN(parseInt(phone)), { message: "Ingresa solo números" }),
    provincia_id: z
        .string({ required_error: "* Requerido" }),
    canton_id: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    distrito_id: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    sport_id: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    modality_id: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
    intensity: z
        .string({ required_error: "* Requerido" })
        .min(1, { message: "* Requerido" }),
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