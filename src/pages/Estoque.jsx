import axios from "axios";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import TabelaProdutos from "../components/estoque/TabelaProdutos";
import FormProduto from "../components/estoque/FormProduto";

export default function Estoque() {
  const [isLoading, setIsLoading] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nome: "",
    preco: "",
    quantidade: ""
  });
  const [editId, setEditId] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [ordemPreco, setOrdemPreco] = useState("");

  useEffect(() => {
    const fectchProdutos = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/produtos");
        setProdutos(data);
      } catch (err) {
        setError("Não foi possível carregar os produtos 😢", err);
      } finally {
        setIsLoading(false);
      }
    };
    fectchProdutos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nome: form.nome,
        preco: parseFloat(form.preco),
        estoque: {
          quantidadeAtual: parseInt(form.quantidade)
        }
      };
      if (editId !== null) {
        const { data } = await axios.put(`http://localhost:8080/produtos/${editId}`, payload);
        setProdutos(prev => prev.map(p => (p.id === editId ? data : p)));
        toast.success("Produto atualizado com sucesso!");
      } else {
        const { data } = await axios.post("http://localhost:8080/produtos", payload);
        setProdutos((prev) => [...prev, data]);
        toast.success("Produto salvo com sucesso!");
      }

      setForm({ nome: "", preco: "", quantidade: "" });
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
      await axios.delete(`http://localhost:8080/produtos/${id}`);
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
    <div className="container p-4 bg-secondary rounded">
      <h1 className="text-center mb-4">Estoque</h1>

      <div className="d-flex mb-3 align-items-center gap-2">
        {!showTable && (
          <>
            <input
              className="form-control"
              style={{ width: "200px" }}
              type="text"
              placeholder="Filtrar por nome"
              value={filtroNome}
              onChange={(e) => setFiltroNome(e.target.value)}
            />

            <select
              className="form-select"
              style={{ width: "200px" }}
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

        <button className="btn btn-success" onClick={() => setShowTable(!showTable)}>
          {showTable ? "Cancelar" : "Adicionar Produto"}
        </button>
      </div>

      {showTable && (
        <FormProduto
          form={form}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
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
                quantidade: p.estoque?.quantidadeAtual ?? 0
              });
              setShowTable(true);
            }}
            onExcluir={handleDelete
            } />
        </>
      )}
    </div>
  );
}
