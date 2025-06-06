import { z } from "zod";


export const clienteSchema = z.object({
    nome: z.string().min(1, "Nome obrigatório"),
    email: z.string().email("Digite um email válido!"),
    telefone: z.coerce.number().min(9),
    endereco:z.string().min(1, "Um endereço pelo menos")
})