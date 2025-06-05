import { z } from "zod";

export  const clienteSchema = z.object({
    nome: z.string()
})