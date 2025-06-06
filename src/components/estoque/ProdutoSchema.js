import { z } from "zod";

export const produtoSchema = z.object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    preco: z.coerce.number({ invalid_type_error: "Preço deve ser um número" }),
    estoque: z.object({
        quantidade: z.coerce.number({ invalid_type_error: "Quantidade deve ser um número" }),
    }),
});
