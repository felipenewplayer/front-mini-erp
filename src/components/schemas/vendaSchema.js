import { z } from "zod";

export const  vendaSchema = z.object({
    cliente: z.coerce.number().min(1, "Selecione um cliente"),
    produtoId: z.coerce.number().min(1, "Selecione um produto"),
    quantidade: z.coerce.number().min(1, "Informe a quantidade"),
});