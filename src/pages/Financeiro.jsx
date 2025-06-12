import { useState } from "react";
import { toast } from 'react-toastify';
import { transacaoSchema } from "../components/schemas/transacaoSchema.js";
import FormFinanceiro from "../components/financeiro/FormFinanceiro";
import ListaDasTransacoes from "../components/financeiro/ListaDasTransacoes";
import DivsDosConteudos from "../components/DivsDosConteudos.jsx"
import { atualizarTransacao, criarTransacao, deletarTransacao } from "../services/transacaoService.js";
import useTransacao from "../components/financeiro/transacao/useTransacao.jsx";
import useFormTransacao from "../components/financeiro/transacao/useFormTransacao.jsx";
export default function Financeiro() {
  const [showForm, setShowForm] = useState(false);
  const { transacoes, setTransacoes, isLoading, error } = useTransacao();
  const [filtroStatus, setFiltroStatus] = useState("");
  const { editId, setEditId, form,iniciarEdicao, limparForm} = useFormTransacao();


  const handleSubmit = async (data) => {
    const parsed = transacaoSchema.safeParse(data);
    if (!parsed.success) {
      const msg = parsed.error.errors[0]?.message || "Erro de validação.";
      toast.error(msg);
      return;
    }
    try {
      if (editId !== null) {
        const res = await atualizarTransacao(editId, data);
        setTransacoes(prev => prev.map(t => (t.id === editId ? res.data : t)));
        toast.success("Transação atualizada com sucesso!");
      } else {
        const res = await criarTransacao(data);
        setTransacoes((prev) => [...prev, res.data]);
        setShowForm(false);
        limparForm();
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
      await deletarTransacao(id);
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
    <DivsDosConteudos
    title="Financeiro">
      
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
            limparForm();
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
                iniciarEdicao(t)
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
