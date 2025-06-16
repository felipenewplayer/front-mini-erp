import { useState } from "react";

const FORM_INICIAL = {
    nome: "",
    email: "",
    telefone: "",
    endereco: ""
}

export default function useFormCliente() {
    const [form, setForm] = useState(FORM_INICIAL);
    const [editId, setEditId] = useState(null);

    const iniciarEdicao = (cliente) => {
        setEditId(cliente.id);
        setForm({
            nome: cliente.nome,
            email: cliente.email,
            telefone: cliente.telefone,
            endereco: cliente.endereco
        });
    }

    const limparForm = () => {
        setForm(FORM_INICIAL);
        setEditId(null);
    }

    return {
        form, 
        editId, 
        iniciarEdicao, 
        limparForm,
        setForm // Adicionado para maior flexibilidade
    };
}