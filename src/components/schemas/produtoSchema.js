import { z } from "zod";

export const produtoSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  categoria: z.enum(["CONSOLE","MOUSE","MONITOR","TECLADO","PROCESSADOR"]),
  precoUN: z.coerce.number({ invalid_type_error: "Preço deve ser um número" }),
  quantidade: z.coerce.number({ invalid_type_error: "Quantidade deve ser um número" }).positive(),
  dataEntrada: z.string().nonempty("Data de entrada é obrigatória"),
});
