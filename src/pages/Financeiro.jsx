import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { transacaoSchema } from "../components/financeiro/TransacaoSchema.js";
import axios from "axios";
import FormFinanceiro from "../components/financeiro/FormFinanceiro";
import ListaDasTransacoes from "../components/financeiro/ListaDasTransacoes";
import DivsDosConteudos from "../components/DivsDosConteudos.jsx"
export default function Financeiro() {
  const [showForm, setShowForm] = useState(false);
  const [transacoes, setTransacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState("");
  const [form, setForm] = useState({
    valor: "",
    tipo: "",
    vencimento: "",
    descricao: "",
    status: ""
  });
  const url = "https://mini-erp-y8nj.onrender.com/transacao";
  useEffect(() => {
    const fetchTransacoes = async () => {
      try {
        const { data } = await axios.get(`${url}`);
        setTransacoes(data);
      } catch (errr) {
        setError("Não foi possível carregar as transações", errr);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransacoes();
  }, []);

  const handleSubmit = async (data) => {
    const parsed = transacaoSchema.safeParse(data);
    if (!parsed.success) {
      const msg = parsed.error.errors[0]?.message || "Erro de validação.";
      toast.error(msg);
      return;
    }
    try {
      if (editId !== null) {
        const res = await axios.put(`${url}/${editId}`, data);
        setTransacoes(prev => prev.map(t => (t.id === editId ? res.data : t)));
        toast.success("Transação atualizada com sucesso!");
      } else {
        const res = await axios.post(`${url}`, data);
        setTransacoes((prev) => [...prev, res.data]);
        setShowForm(false);
        setForm({
          valor: "",
          tipo: "",
          vencimento: "",
          descricao: "",
          status: ""
        });
        toast.success("Transação salva com sucesso!");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Erro ao salvar, tente novamente.";
      toast.error(msg);
    }
    setEditId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente excluir??")) return;
    try {
      await axios.delete(`${url}/${id}`);
      setTransacoes(prev => prev.filter(t => t.id !== id));
      setShowForm(false);
      setEditId(null);
      toast.success("Transação excluída com sucesso!");
    }
    catch (err) {
      const msg = err.response?.data?.message || "Erro ao excluir a transação, tente novamente.";
      toast.error(msg);
    }
  };

  return (
    <DivsDosConteudos>
      <h1 className="text-center mb-4 text-light">Financeiro</h1>

      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-4 gap-2">
        {!showForm && (
          <>
            <select
              className="form-select w-100"
              style={{ maxWidth: "200px" }}
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <option value="">Todos os Status</option>
              <option value="PENDENTE">PENDENTE</option>
              <option value="PAGO">PAGO</option>
              <option value="CANCELADO">CANCELADO</option>
            </select>

            <button
              className="btn btn-secondary w-50"
              onClick={() => setFiltroStatus("")}
            >
              Limpar Filtro
            </button>
          </>
        )}

        <button
          className="btn btn-success rounded w-50 w-md-auto"
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
          }}
        >
          {showForm ? "Cancelar" : "Adicionar lançamento"}
        </button>
      </div>

      {showForm && (
        <FormFinanceiro
          defaultValues={form}
          onHandleSubmit={handleSubmit}
        />
      )}

      {!showForm && (
        <>
          {isLoading && <p>Carregando...</p>}
          {error && <p className="text-danger">{error}</p>}
          {!isLoading && !error && (
            <ListaDasTransacoes
              transacoes={transacoes}
              filtroStatus={filtroStatus}
              onEdit={(t) => {
                setEditId(t.id);
                setShowForm(true);
              }}
              onExcluir={handleDelete}
            />
          )}
        </>
      )}
    </DivsDosConteudos>
  );
}
