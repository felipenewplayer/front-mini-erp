// useFormProduto.js
import { useState } from "react";

const FORM_INICIAL = {
  nome: "",
  preco: "",
  estoque: { quantidade: "" }
};

export default function useFormProduto() {
  const [form, setForm] = useState(FORM_INICIAL);
  const [editId, setEditId] = useState(null);

  function iniciarEdicao(produto) {
    setEditId(produto.id);
    setForm({
      nome: produto.nome,
      preco: produto.preco,
      estoque: { quantidade: produto.estoque?.quantidade ?? "" }
    });
  }

  function limparForm() {
    setForm(FORM_INICIAL);
    setEditId(null);
  }

  return {
    form,
    setForm,
    editId,
    setEditId,
    iniciarEdicao,
    limparForm
  };
}
