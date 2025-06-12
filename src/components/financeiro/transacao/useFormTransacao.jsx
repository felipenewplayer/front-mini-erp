import { useState } from "react";

const FORM_INICIAL = {
    valor: "",
    tipo: "",
    vencimento: "",
    descricao: "",
    status: ""
}
export default function useFormTransacao() {
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(FORM_INICIAL);

    const iniciarEdicao = (transacao) => {
        setEditId(transacao.id);
        setForm({
            valor: transacao.valor,
            tipo: transacao.tipo,
            vencimento: transacao.vencimento,
            descricao: transacao.descricao,
            status: transacao.status
        })
    }
    const limparForm = () => {
        setEditId(null)
        setForm(FORM_INICIAL)
    }


    return (
        { editId, setEditId, form, setForm, iniciarEdicao, limparForm }
    )
}