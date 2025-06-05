import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import ClienteTabela from "../components/cliente/ClienteTabela";

export default function Cliente() {
    const [showTable, setshowTable] = useState(true);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({
        nome: "",
        email: "",
        telefone: "",
        endereco: ""
    })
    const [clientes, setClientes] = useState([

    ])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fecthClientes = async () => {
            try {
                const { data } = await axios.get("http://localhost:8080/clientes");
                setClientes(data);
            } catch (error) {
                toast.error(error)
            }
            finally {
                setIsLoading(false);
            }
        }
        fecthClientes();
    }, [])

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    const onsubmit = async (e) => {
        e.preventDefault();

        if (!form.nome || !form.email || !form.telefone || !form.endereco) {
            toast.error("Preencha todos os campos");
            return;
        }
        try {
            if (editId !== null) {
                const { data } = await axios.put(`http://localhost:8080/clientes/${editId}`, form);
                setClientes(c => c.map(c => c.id === editId ? data : c));
                toast.success("Cliente atualizado com sucesso!!")

            } else {
                const { data } = await axios.post("http://localhost:8080/clientes", form);
                setClientes(prev => [...prev, data]);
                setForm({ valor: "", tipo: "", vencimento: "", descricao: "", status: "" });
                toast.success("Cliente criado com sucesso");
            }

            setForm({
                nome: "",
                email: "",
                telefone: "",
                endereco: ""
            });
            setEditId(null);
            setshowTable(true);
            
        }
        catch (error) {
            toast.error(error)

        }
    }
    const onExluir = async (id) => {
        if (!window.confirm("Deseja realmente excluir!!")) return;

        try {
            await axios.delete(`http://localhost:8080/clientes/${id}`);
            setClientes(cliente => cliente.filter(cliente.id !== id));
            setForm(false);
            setEditId(null);
            toast.success("Cliente excluido com sucesso!!")
        } catch (error) {
            toast.error(error);
        }

    }


    return (
        <div className="container p-5 bg-secondary rounded">
            <h1 className="text-center">Clientes</h1>
            <div>
                <button
                    className="btn btn-success p-2"
                    onClick={() => setshowTable(!showTable)}>
                    {showTable ? "Adicionar Clientes" : "Cancelar"}</button>

                {isLoading && <p>...carregando !!!</p>}
            </div>
            {showTable && (
                <>
                    {clientes.length >= 1 ? (
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
                                setshowTable(false);
                            }}
                            onExluir={onExluir}
                        />
                    ) : (
                        <p className="text-center p-5">Ainda sem clientes</p>
                    )}
                </>
            )}

            {!showTable && (
                <form className="form" onSubmit={onsubmit}>
                    <div>
                        <label className="form-label mt-4">Nome</label>
                        <input
                            className="form-control w-50"
                            type="text"
                            name="nome"
                            value={form.nome}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div>
                        <label className="form-label mt-4">Email</label>
                        <input
                            className="form-control w-50"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div>
                        <label className="form-label mt-4">Telefone</label>
                        <input
                            className="form-control w-50"
                            type="number"
                            name="telefone"
                            value={form.telefone}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div>
                        <label className="form-label mt-4">Endereço</label>
                        <input
                            className="form-control w-50"
                            type="text"
                            name="endereco"
                            value={form.endereco}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <button className="btn btn-success mt-3 p-2" type="submit" >Confirmar</button>
                </form>
            )}



        </div>
    )
}