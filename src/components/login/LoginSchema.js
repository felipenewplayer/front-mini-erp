import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Email inválido")
        .nonempty("Insira o email")
        .email("Formato inválido"),

    senha: z
        .string().min(6, "A senha deve ter pelo menos 6 caracteres")
        .nonempty()
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-_]+$/),
});