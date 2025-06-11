import { z } from "zod";

export const cadastroSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  role: z.enum(["admin", "logistica", "vendas"], {
    errorMap: () => ({ message: "Selecione um setor válido" }),
  }),
});
