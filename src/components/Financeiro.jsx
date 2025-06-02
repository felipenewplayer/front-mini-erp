import { useState, useEffect } from "react";
import axios from "axios";

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
        try {
            if (editId !== null) {
                const { data } = await axios.put(`http://localhost:8080/transacao/${editId}`, form);
                setTransacoes(prev => prev.map(t => (t.id === editId ? data : t)));
                alert("Transação atualizada com sucesso!");
            }
            else {
                const { data } = await axios.post("http://localhost:8080/transacao", form);
                setTransacoes((prev) => [...prev, data]);
                setForm({ valor: "", tipo: "", vencimento: "", descricao: "", status: "" });
                setShowForm(false);
                alert("Transação salva com sucesso!");
            }
        } catch (err) {
            const msg = err.response?.data?.message || "Erro ao salvar, tente novamente.";
            alert(msg);
        }
        setEditId(null);
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir essa transação?")) return;

        try {
            await axios.delete(`http://localhost:8080/transacao/${id}`);
            setTransacoes(prev => prev.filter(t => t.id !== id));
            setShowForm(false);
            setEditId(null);
            alert("Transação excluída com sucesso!");
            showForm
        }
        catch (err) {
            alert("Erro ao excluir a transação, tente novamente.", err);
        }

    };

    return (
        <div className="container p-4 bg-secondary rounded">
            <h1 className="text-center mb-4">Financeiro</h1>

            <div className="d-flex mb-3">
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

                        <button className="btn btn-outline-secondary" onClick={() => setFiltroStatus("")}>
                            Limpar Filtro
                        </button>
                    </>
                )}


                <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cancelar" : "Adicionar lançamento"}
                </button>
            </div>

            {showForm && (
                <form className="card p-3 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="form-label">Valor</label>
                        <input
                            className="form-control"
                            name="valor"
                            type="number"
                            value={form.valor}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Tipo</label>
                        <input
                            className="form-control"
                            name="tipo"
                            value={form.tipo}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Vencimento</label>
                        <input
                            className="form-control"
                            name="vencimento"
                            type="date"
                            value={form.vencimento}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Descrição</label>
                        <input
                            className="form-control"
                            name="descricao"
                            value={form.descricao}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Status</label>
                        <select
                            className="form-control"
                            name="status"
                            value={form.status}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecione...</option>
                            <option value="PENDENTE">PENDENTE</option>
                            <option value="CANCELADO">CANCELADO</option>
                            <option value="PAGO">PAGO</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-success mt-3">
                        Salvar Transação
                    </button>
                </form>
            )}
            {!showForm && (
                <>
                    {isLoading && <p>Carregando...</p>}
                    {error && <p className="text-danger">{error}</p>}
                    {!isLoading && !error && (
                        <div className="list-container overflow-auto" style={{ maxHeight: 600 }}>
                            {transacoes.filter((t) => !filtroStatus || t.status === filtroStatus)
                                .map((t) => (
                                    <ul key={t.id} className="list-group mb-2">
                                        <li className="list-group-item">Vencimento: {t.vencimento}</li>
                                        <li className="list-group-item">Tipo: {t.tipo}</li>
                                        <li className="list-group-item">Descrição: {t.descricao}</li>
                                        <li className="list-group-item">Valor: {parseFloat(t.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</li>
                                        <li className="list-group-item">Status: {t.status}</li>

                                        <div className="d-flex gap-2 mt-3">
                                            <button className="btn btn-danger" onClick={() => handleDelete(t.id)}>Excluir</button>
                                            <button className="btn btn-warning" onClick={() => {
                                                setForm({ valor: t.valor, tipo: t.tipo, vencimento: t.vencimento, descricao: t.descricao, status: t.status });
                                                setEditId(t.id);
                                                setShowForm(true);
                                            }}>Editar</button>
                                        </div>
                                    </ul>
                                ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
