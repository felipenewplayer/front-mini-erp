import axios from "axios";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import TabelaProdutos from "../components/estoque/TabelaProdutos";
import FormProduto from "../components/estoque/FormProduto";
import DivsDosConteudos from "../components/DivsDosConteudos";
export default function Estoque() {
  const [isLoading, setIsLoading] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nome: "",
    preco: "",
    estoque:{
      quantidade:""
    }
  });
  const [editId, setEditId] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [ordemPreco, setOrdemPreco] = useState("");

  const url = "https://mini-erp-y8nj.onrender.com/produtos"
  useEffect(() => {
    const fectchProdutos = async () => {
      try {
        const { data } = await axios.get(`${url}`);
        setProdutos(data);
      } catch (err) {
        setError("Não foi possível carregar os produtos ", err);
      } finally {
        setIsLoading(false);
      }
    };
    fectchProdutos();
  }, []);

  const handleSubmit = async (data) => {
    try {
    
      if (editId !== null) {
        const res = await axios.put(`${url}/${editId}`, data);
        setProdutos(prev => prev.map(p => (p.id === editId ? res.data : p)));
        toast.success("Produto atualizado com sucesso!");
      } else {
        const res = await axios.post(`${url}`, data);
        setProdutos((prev) => [...prev, res.data]);
        toast.success("Produto salvo com sucesso!");
      }

      setForm({ nome: "", preco: "", estoque:{ quantidade: ""}});
      setEditId(null);
      setShowTable(false);
    } catch (err) {
      const msg = err.response?.data?.message || "Erro ao salvar. Tente novamente.";
      toast.error(msg);
    }
  };

  const produtosFiltrados = [...produtos]
    .filter(p => p.nome.toLowerCase().includes(filtroNome.toLowerCase()))
    .sort((a, b) => {
      if (ordemPreco === "asc") return a.preco - b.preco;
      if (ordemPreco === "desc") return b.preco - a.preco;
      return 0;
    });


  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que quer deletar")) return;

    try {
      await axios.delete(`${url}/${id}`);
      setProdutos(prev => prev.filter(p => p.id !== id));
      setShowTable(false);
      setEditId(null);
      toast.success("Produto excluido com sucesso!")
    }
    catch (err) {
      toast.error("Erro ao excluir o produto, tente novamente.", err);
    }
  }
  return (
    <DivsDosConteudos>
      <h1 className="text-center mb-4">Estoque</h1>

      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-4 gap-2">
        {!showTable && (
          <>
            <input
              className="form-control"
              style={{ width: "150px" }}
              type="text"
              placeholder="Filtrar por nome"
              value={filtroNome}
              onChange={(e) => setFiltroNome(e.target.value)}
            />

            <select
              className="form-select"
              style={{ width: "150px" }}
              value={ordemPreco}
              onChange={(e) => setOrdemPreco(e.target.value)}
            >
              <option value="">Ordenar por</option>
              <option value="asc">Menor Preço</option>
              <option value="desc">Maior Preço</option>
            </select>

            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                setFiltroNome("");
                setOrdemPreco("");
              }}
            >
              Limpar Filtros
            </button>
          </>
        )}

        <button className="btn btn-success " onClick={() => setShowTable(!showTable)}>
          {showTable ? "Cancelar" : "Adicionar Produto"}
        </button>
      </div>

      {showTable && (
        <FormProduto
          onHandleSubmit={handleSubmit}
          defaultValues={form}
        />
      )}

      {!showTable && (
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
              setEditId(p.id);
              setForm({
                nome: p.nome,
                preco: p.preco,
                estoque:{
                quantidade: p.estoque?.quantidadeAtual ?? 0}
              });
              setShowTable(true);
            }}
            onExcluir={handleDelete
            } />
        </>
      )}
    </DivsDosConteudos>
  );
}
