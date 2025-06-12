import { toast } from 'react-toastify';
import { useState } from "react";
import TabelaProdutos from "../components/estoque/TabelaProdutos";
import FormProduto from "../components/estoque/FormProduto";
import DivsDosConteudos from "../components/DivsDosConteudos";
import { atualizarProduto, criarProduto, deletarProduto } from "../services/produtoService";
import useProdutos from '../components/estoque/produto/useProduto';
import useFormProduto from '../components/estoque/produto/useFormProduto';


export default function Estoque() {
  const { produtos, setProdutos, isLoading, error } = useProdutos();
  const { form, editId, setEditId, iniciarEdicao, limparForm } = useFormProduto();
  const [formAberto, setFormAberto] = useState(false);
  const [colunaOrdenada, setColunaOrdenada] = useState("");
  const [ordemAscendente, setOrdemAscendente] = useState(true);

  const handleSubmit = async (data) => {
    try {
      if (editId !== null) {
        const res = await atualizarProduto(editId, data);
        setProdutos(prev => prev.map(p => (p.id === editId ? res.data : p)));
        toast.success("Produto atualizado com sucesso!");
      } else {
        const res = await criarProduto(data);
        setProdutos((prev) => [...prev, res.data]);
        toast.success("Produto salvo com sucesso!");
      }
      limparForm()
      setFormAberto(false);
    } catch (err) {
      const msg = err.response?.data?.message || "Erro ao salvar. Tente novamente.";
      toast.error(msg);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que quer deletar")) return;

    try {
      await deletarProduto(id)
      setProdutos(prev => prev.filter(p => p.id !== id));
      limparForm();
      setFormAberto(false);
      toast.success("Produto excluido com sucesso!");
    }
    catch (err) {
      toast.error("Erro ao excluir o produto, tente novamente.", err);
    }
  }

  const produtosFiltrados = [...produtos]
    .sort((a, b) => {
      const ordem = ordemAscendente ? 1 : -1;

      if (colunaOrdenada === "preco") return ordem * (a.preco - b.preco);
      if (colunaOrdenada === "quantidade") {
        const qa = a.estoque?.quantidade ?? 0;
        const qb = b.estoque?.quantidade ?? 0;
        return ordem * (qa - qb);
      }

      return 0;
    });

  const handleOrdenar = (coluna) => {
    if (colunaOrdenada === coluna) {
      setOrdemAscendente(!ordemAscendente);
    } else {
      setColunaOrdenada(coluna);
      setOrdemAscendente(true);
    }
  };

  return (
    <DivsDosConteudos>
      <h1 className="text-center text-light mb-4">Estoque</h1>

      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-4 gap-2">
        <button
          className="btn btn-success"
          onClick={() => {
            if (formAberto) {
              // Se estava no modo "formulário visível", clicou para cancelar
              setFormAberto(false);
              setEditId(null);
              limparForm()
            } else {
              // Se estava oculto, clicou para adicionar novo → limpa tudo
              limparForm()
              setFormAberto(true);
            }
          }}
        >
          {formAberto ? "Cancelar" : "Adicionar Produto"}
        </button>
      </div>

      {formAberto && (
        <FormProduto
          onHandleSubmit={handleSubmit}
          defaultValues={form}
        />
      )}

      {!formAberto && (
        <>
          {isLoading &&
            (<div className="text-center">
              <div className="spinner-border text-light" role="status" />
            </div>
            )}
          {error && <p className="text-danger">{error}</p>}
          <TabelaProdutos
            produtos={produtosFiltrados}
            onEditar={(p) => {
              iniciarEdicao(p);
              setFormAberto(true);
            }}
            onExcluir={handleDelete}
            onOrdenar={handleOrdenar}
            colunaOrdenada={colunaOrdenada}
            ordemAscendente={ordemAscendente} />
        </>
      )}
    </DivsDosConteudos>
  );
}
