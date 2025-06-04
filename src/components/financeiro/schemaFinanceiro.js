import { z } from "zod";

export const schemaFinanceiro = z.object({
    valor: z.coerce.number().positive("Valor deve ser positivo"),
    tipo: z.string().min(1, "Tipo é obrigatório"),
    vencimento: z.string().min(1, "Data de vencimento é obrigatória"),
    descricao: z.string().min(1, "Descrição é obrigatória"),
    status: z.enum(["PENDENTE", "CANCELADO", "PAGO"], {
        errorMap: () => ({ message: "Status inválido" }),
    }),
});