import { z } from "zod";

export const clienteSchema = z.object({
    nome: z.string()
        .min(1, "Nome obrigatório")
        .max(100, "Nome muito longo (máx. 100 caracteres)"),

    email: z.string()
        .min(1, "Email obrigatório")
        .email("Digite um email válido!")
        .max(100, "Email muito longo"),


    telefone: z.string()
        .min(1, "Telefone obrigatório")
        .regex(/^[()\d\s\-+]+$/, "Telefone deve conter apenas números e caracteres válidos"),

    estado: z.string()
        .min(1, "Estado obrigatório"),

    cidade: z.string()
        .min(1, "Cidade obrigatória"),
});
