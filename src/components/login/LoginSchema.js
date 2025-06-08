import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .nonempty("Insira o email")
        .email("Formato inválido"),

    senha: z
        .string()
        .nonempty()
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-_]+$/),
});