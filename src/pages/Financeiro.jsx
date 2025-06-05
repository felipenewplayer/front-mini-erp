import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { schemaFinanceiro } from "../components/financeiro/schemaFinanceiro";
import axios from "axios";

import FormFinanceiro from "../components/financeiro/FormFinanceiro";
import ListaDasTransacoes from "../components/financeiro/ListaDasTransacoes";

export default function Financeiro() {
    const [showForm, setShowForm] = useState(false);
    const [transacoes, setTransacoes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        valor: "",
        tipo: "",
        vencimento: "",
        descricao: "",
        status: "",
    });
    const [editId, setEditId] = useState(null);
    const [filtroStatus, setFiltroStatus] = useState("");
    

    useEffect(() => {
        const fetchTransacoes = async () => {
            try {
                const { data } = await axios.get("http://localhost:8080/transacao");
                setTransacoes(data);
            } catch (err) {
                setError("Não foi possível carregar as transações 😢", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTransacoes();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const parsed = schemaFinanceiro.safeParse(form);
        if (!parsed.success) {
            const msg = parsed.error.errors[0]?.message || "Erro de validação.";
            toast.error(msg);
            return;
        }
        try {
            if (editId !== null) {
                const { data } = await axios.put(`http://localhost:8080/transacao/${editId}`, form);
                setTransacoes(prev => prev.map(t => (t.id === editId ? data : t)));
                toast.success("Transação atualizada com sucesso!");
            }
            else {
                const { data } = await axios.post("http://localhost:8080/transacao", form);
                setTransacoes((prev) => [...prev, data]);
                setForm({ valor: "", tipo: "", vencimento: "", descricao: "", status: "" });
                setShowForm(false);
                toast.success("Transação salva com sucesso!");
            }
        } catch (err) {
            const msg = err.response?.data?.message || "Erro ao salvar, tente novamente.";
            toast.error(msg);
        }
        setEditId(null);
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Deseja realmente excluir??")) return;
        try {
            await axios.delete(`http://localhost:8080/transacao/${id}`);
            setTransacoes(prev => prev.filter(t => t.id !== id));
            setShowForm(false);
            setEditId(null);
            toast.success("Transação excluída com sucesso!");
        }
        catch (err) {
            toast.error("Erro ao excluir a transação, tente novamente.", err);
        }


    };

    return (
        <div className="container p-4 bg-secondary rounded">
            <h1 className="text-center mb-5">Financeiro</h1>

            <div className="d-flex mb-4">
                {!showForm && (
                    <>
                        <select
                            className="form-select"
                            style={{ width: "200px" }}
                            value={filtroStatus}
                            onChange={(e) => setFiltroStatus(e.target.value)}
                        >
                            <option value="">Todos os Status</option>
                            <option value="PENDENTE">PENDENTE</option>
                            <option value="PAGO">PAGO</option>
                            <option value="CANCELADO">CANCELADO</option>
                        </select>

                        <button className="btn btn-outline-secondary ms-2 aria-labels" onClick={() => setFiltroStatus("")}>
                            Limpar Filtro
                        </button>
                    </>
                )}
                <button
                    className="btn btn-success p-3 rounded"
                    onClick={() => {
                        setShowForm(!showForm);
                        setForm({ valor: "", tipo: "", vencimento: "", descricao: "", status: "" });
                        setEditId(null);
                    }}
                >
                    {showForm ? "Cancelar" : "Adicionar lançamento"}
                </button>
            </div>

            {showForm && (
                <FormFinanceiro
                    form={form}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
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
                                setEditId(t.id)
                                setForm({
                                    valor: t.valor,
                                    tipo: t.tipo,
                                    vencimento: t.vencimento,
                                    descricao: t.descricao,
                                    status: t.status
                                })
                                setShowForm(true)
                            }
                            }
                            onExcluir={handleDelete}
                        />
                    )}
                </>
            )}
        </div>
    );
}
