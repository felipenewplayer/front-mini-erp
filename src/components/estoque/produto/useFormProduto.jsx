import { useState } from "react";

const FORM_INICIAL = {
  nome: "",
  codDoProduto: "",
  categoria: "",
  precoUN: "",
  quantidade: "",
  precoTotal:"",
  data:""
}


export default function useFormProduto() {
  const [form, setForm] = useState(FORM_INICIAL);
  const [editId, setEditId] = useState(null);


  function iniciarEdicao(produto) {
    setEditId(produto.id);
    setForm({
      nome: produto.nome,
      codDoProduto: produto.codDoProduto,
      categoria: produto.categoria,
      precoUN: produto.precoUN,
      quantidade: produto.quantidade,
      precoTotal: produto.precoTotal ,
      data:produto.data
    })
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
