import { useState } from "react";
import { toast } from "react-toastify";
import ClienteTabela from "../components/cliente/ClienteTabela";
import ClienteForm from "../components/cliente/ClienteForm";
import DivsDosConteudos from "../components/DivsDosConteudos";
import { useClientes } from "../components/context/ClienteContext";
import useFormCliente from "../components/cliente/useFormCliente";

export default function Cliente() {
    const { form, editId, iniciarEdicao, limparForm } = useFormCliente();
    const { clientes, error, addCliente, updateCliente, deletarCliente } = useClientes();
    const [abaAberta, setAbaAberta] = useState("lista");

    const handleFormSubmit = async (data) => {
        try {
            if (editId !== null) {
                const clienteAtualizado = { ...data, id: editId };
                updateCliente(clienteAtualizado);
                toast.success("Cliente atualizado com sucesso!");
            } else {
                const novoCliente = { ...data, id: Date.now() };
                if (!addCliente(novoCliente)) {
                    toast.error("Já existe um cliente com esse nome.");
                    return;
                }
                toast.success("Cliente criado com sucesso!");
            }
            limparForm();
            setAbaAberta("lista");
        } catch (error) {
            toast.error(error.message || "Erro desconhecido");
        }
    };

    const handlerDeletar = (id) => {
        if (!window.confirm("Tem certeza que quer deletar?")) return;
        try {
            deletarCliente(id);
            toast.success("Cliente excluído com sucesso!");
        } catch (err) {
            toast.error("Erro ao excluir o produto", err);
        }
    }

    // const onExcluir = async (id) => {
    //     if (!window.confirm("Deseja realmente excluir?")) return;

    //     try {
    //         await axios.delete(`https://mini-erp-y8nj.onrender.com//clientes/${id}`);
    //         setClientes(clientes => clientes.filter(cliente => cliente.id !== id));
    //         limparForm();
    //         toast.success("Cliente excluído com sucesso!!");
    //     } catch (error) {
    //         toast.error(error.message || "Erro ao excluir cliente");
    //     }
    // };

    return (
        <DivsDosConteudos
            title="Clientes">
            <div className="d-flex gap-3 mb-2">
                <button className="btn btn-primary"
                    onClick={() => setAbaAberta("lista")}>Lista</button>
            </div>
            {error && <p className="text-danger">{error}</p>}

            <>

                {abaAberta === "formulario" && <ClienteForm
                    handleFormSubmit={handleFormSubmit}
                    defaultValues={form}
                    onCancel={() => setAbaAberta("lista")}
                />
                }


                {abaAberta === "lista" && (
                    <ClienteTabela
                        clientes={clientes}
                        onEditar={(c) => {
                            iniciarEdicao(c)
                            setAbaAberta("formulario")
                        }}
                        onAdicionar={() => {
                            limparForm()
                            setAbaAberta("formulario")
                        }}
                        onExcluir={handlerDeletar}
                    />
                )}
            </>
        </DivsDosConteudos>
    );
}
