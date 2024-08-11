import { date, z } from "zod";

export const citaSchema = z.object({
    user_id: z
        .string({ required_error: "* Requerido", })
        .min(1, { message: "* IRequerido" }),
    date: z
        .string({ required_error: "* ", })
        .min(1, { message: "* Requerido" }),
    time: z
        .string({ required_error: "*", })
        .min(1, { message: "* Requerido" }),
    occupation: z
        .string({ required_error: "* ", })
        .min(1, { message: "* Requerido" }),

});