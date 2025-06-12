import { toast } from 'react-toastify';
import { useState } from "react";
import TabelaProdutos from "../components/estoque/TabelaProdutos";
import FormProduto from "../components/estoque/FormProduto";
import DivsDosConteudos from "../components/DivsDosConteudos";
import useProdutos from '../components/estoque/produto/useProduto';
import useFormProduto from '../components/estoque/produto/useFormProduto';
import EstoqueDashBoard from '../components/estoque/EstoqueDashBoard';
import { useUser } from '../components/context/UserContext';

export default function Estoque() {
  const { produtos, setProdutos, isLoading, error } = useProdutos();
  const { form, editId, setEditId, iniciarEdicao, limparForm } = useFormProduto();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [mostrarTabela, setMostrarTabela] = useState(false);
  const [mostrarDashBoard, setMostrarDashBoard] = useState(true);
  const [colunaOrdenada, setColunaOrdenada] = useState("");
  const [ordemAscendente, setOrdemAscendente] = useState(true);
  const { adicionarProduto, deletarProdutoLocal, atualizarProdutoLocal } = useUser();

  // Usado com a api vindo do backend, adicione o editId no useFormProduto(), atualizarProduto, criarProduto do service/produtos ;
  // const handleSubmit = async (data) => {
  //   try {
  //     if (editId !== null) {
  //       const res = await atualizarProduto(editId, data);
  //       setProdutos(prev => prev.map(p => (p.id === editId ? res.data : p)));
  //       toast.success("Produto atualizado com sucesso!");
  //     } else {
  //       const res = await criarProduto(data);
  //       setProdutos((prev) => [...prev, res.data]);
  //       toast.success("Produto salvo com sucesso!");
  //     }
  //     limparForm()
  //     setMostrarForm(false);
  //     setMostrarDashBoard(true);
  //   } catch (err) {
  //     const msg = err.response?.data?.message || "Erro ao salvar. Tente novamente.";
  //     toast.error(msg);
  //   }
  // };


  //Usado com localstorage//
  const handleSubmit = (data) => {
    if (editId) {
      const produtoAtualizado = { ...data, id: editId };
      atualizarProdutoLocal(produtoAtualizado);
      setProdutos(prev => prev.map(p => p.id === editId ? produtoAtualizado : p));
      toast.success("Produto atualizado com sucesso!");
      limparForm();
    } else {
      const produtoComId = {
        ...data,
        id: Date.now() // gera um ID único
      };

      const sucesso = adicionarProduto(produtoComId);
      if (sucesso) {
        setProdutos(prev => [...prev, produtoComId]);
        toast.success("Produto cadastrado com sucesso!");
      } else {
        toast.error("Erro ao cadastrar produto");
      }
      limparForm();
    }
    setMostrarForm(false);
    setMostrarDashBoard(true);
    setEditId(null); // resetar edição após submit
  };



  const handleDeletar = (id) => {
    if (!window.confirm("Tem certeza que quer deletar")) return;

    try {
      deletarProdutoLocal(id)
      setProdutos(prev => prev.filter(p => p.id !== id));
      toast.success("Produto excluído com sucesso!");
    } catch (err) {
      toast.error("Erro ao excluir o produto, tente novamente.", err);
    }
  }
  //Usado com a api 
  // const handleDelete = async (id) => {
  //   if (!window.confirm("Tem certeza que quer deletar")) return;

  //   try {
  //     await deletarProduto(id)
  //     setProdutos(prev => prev.filter(p => p.id !== id));
  //     limparForm();
  //     setMostrarForm(false);
  //     toast.success("Produto excluido com sucesso!");
  //   }
  //   catch (err) {
  //     toast.error("Erro ao excluir o produto, tente novamente.", err);
  //   }
  // }

  const produtosFiltrados = [...produtos]
    .sort((a, b) => {
      const ordem = ordemAscendente ? 1 : -1;

      if (colunaOrdenada === "precoUN") return ordem * (a.precoUN - b.precoUN);
      if (colunaOrdenada === "quantidade") {
        const qa = a.quantidade;
        const qb = b.quantidade;
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
    <DivsDosConteudos
    title="Estoque">
      <button className="btn btn-sm mb-2 ms-4 text-light "
        style={{ background: "linear-gradient(to right, var(--purple-20), var(--purple-40))" }}
        onClick={() => {
          if (mostrarTabela) {
            setMostrarTabela(false);
            setMostrarDashBoard(true);
          } else {
            setMostrarForm(false);
            setMostrarTabela(true)
          }
        }

        }>{mostrarTabela ? "Voltar" : "Mostrar Tabela"}
      </button>

      {mostrarDashBoard && !mostrarForm && !mostrarTabela && (
        <div className="col-md-8">
          <EstoqueDashBoard />
        </div>
      )}
      {mostrarForm && (
        <FormProduto
          onHandleSubmit={handleSubmit}
          defaultValues={form}
          onCancel={() => {
            setMostrarForm(false);
            setMostrarTabela(true);
          }}
        />
      )
      }

      {
        mostrarTabela && (
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
                setMostrarForm(true);
                setMostrarTabela(false);
                setMostrarDashBoard(false);
              }}

              onAdicionar={() => {
                setMostrarForm(true);
                setMostrarTabela(false);
                limparForm();
              }}

              onExcluir={handleDeletar}
              onOrdenar={handleOrdenar}
              colunaOrdenada={colunaOrdenada}
              ordemAscendente={ordemAscendente} />
          </>
        )
      }
    </DivsDosConteudos >
  );
}
