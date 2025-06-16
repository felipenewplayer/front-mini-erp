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
        .min(10, "Telefone deve ter pelo menos 10 dígitos")
        .max(15, "Telefone muito longo")
        .regex(/^[0-9()+\-\s]+$/, "Telefone deve conter apenas números e caracteres válidos"),
    
    endereco: z.string()
        .min(5, "Endereço muito curto (mín. 5 caracteres)")
        .max(200, "Endereço muito longo (máx. 200 caracteres)")
}).refine(data => {
    // Validação adicional para telefone - remove não dígitos e verifica comprimento
    const digitsOnly = data.telefone.replace(/\D/g, '');
    return digitsOnly.length >= 10 && digitsOnly.length <= 15;
}, {
    message: "Telefone deve conter entre 10 e 15 dígitos",
    path: ["telefone"]
});