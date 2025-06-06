import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ClienteTabela from "../components/cliente/ClienteTabela";
import ClienteForm from "../components/cliente/ClienteForm";

export default function Cliente() {
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({
        nome: "",
        email: "",
        telefone: "",
        endereco: ""
    });
    const [clientes, setClientes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const { data } = await axios.get("http://localhost:8080/clientes");
                setClientes(data);
            } catch (error) {
                toast.error(error.message || "Erro ao buscar clientes");
            } finally {
                setIsLoading(false);
            }
        };
        fetchClientes();
    }, []);

    const handleFormSubmit = async (data) => {
        try {
            if (editId !== null) {
                const res = await axios.put(`http://localhost:8080/clientes/${editId}`, data);
                setClientes(c => c.map(c => c.id === editId ? res.data : c));
                toast.success("Cliente atualizado com sucesso!!");
            } else {
                const res = await axios.post("http://localhost:8080/clientes", data);
                setClientes(prev => [...prev, res.data]);
                toast.success("Cliente criado com sucesso");
            }
            setEditId(null);
            setForm({ nome: "", email: "", telefone: "", endereco: "" });
            setShowForm(false);
        } catch (error) {
            toast.error(error.message || "Erro desconhecido");
        }
    };

    const onExcluir = async (id) => {
        if (!window.confirm("Deseja realmente excluir?")) return;

        try {
            await axios.delete(`http://localhost:8080/clientes/${id}`);
            setClientes(clientes => clientes.filter(cliente => cliente.id !== id));
            setForm({ nome: "", email: "", telefone: "", endereco: "" });
            setEditId(null);
            toast.success("Cliente excluído com sucesso!!");
        } catch (error) {
            toast.error(error.message || "Erro ao excluir cliente");
        }
    };

    return (
        <div className="container p-4 bg-secondary rounded mt-3">
            <h1 className="text-center mb-4 text-light">Clientes</h1>
            <div className="d-flex ">
                <button
                    className="btn btn-success ms-5"
                    onClick={() => {
                        setShowForm(!showForm);
                        if (showForm) {
                            setEditId(null);
                            setForm({ nome: "", email: "", telefone: "", endereco: "" });
                        }
                    }}
                >
                    {showForm ? "Cancelar" : "Adicionar Cliente"}
                </button>
            </div>

            {isLoading && (
                <div className="text-center text-light">
                    <div className="spinner-border" role="status" />
                    <p>Carregando...</p>
                </div>
            )}

            {!isLoading && (
                <>
                    {showForm ? (
                        <ClienteForm
                            handleFormSubmit={handleFormSubmit}
                            defaultValues={form}
                        />
                    ) : (
                        <>
                            {clientes.length > 0 ? (
                                <ClienteTabela
                                    clientes={clientes}
                                    onEditar={(c) => {
                                        setEditId(c.id);
                                        setForm({
                                            nome: c.nome,
                                            email: c.email,
                                            telefone: c.telefone,
                                            endereco: c.endereco
                                        });
                                        setShowForm(true);
                                    }}
                                    onExcluir={onExcluir}
                                />
                            ) : (
                                <p className="text-center p-5 text-light">Ainda sem clientes cadastrados.</p>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}
