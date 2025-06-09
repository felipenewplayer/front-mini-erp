import { z } from "zod";

export const cadastroSchema = z.object({
    nome: z
        .string()
        .min(2, "Nome é obrigatório"),

    email: z
        .string()
        .email("Email inválido"),

    senha: z
        .string()
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-_]+$/)
        .min(6, "A senha deve ter pelo menos 6 digitos")
})