import { createContext, useContext, useState } from "react";

const ClienteContext = createContext();
export const useClientes = () => useContext(ClienteContext);

export const ClienteProvider = ({ children }) => {
    const [clienteSelecionado, setClienteSelecionado] = useState(null);

    const getClientes = () => JSON.parse(localStorage.getItem("clientes")) || [];

    const addCliente = (novoCliente) => {
        const clientes = getClientes();
        if (clientes.some(c => c.nome === novoCliente.nome)) return false;
        const novosClientes = [...clientes, { ...novoCliente, id: Date.now() }];
        localStorage.setItem("clientes", JSON.stringify(novosClientes));
        return true;
    };

    const atualizarCliente = (clienteAtualizado) => {
        const clientes = getClientes();
        const atualizados = clientes.map(c => c.id === clienteAtualizado.id ? clienteAtualizado : c);
        localStorage.setItem("clientes", JSON.stringify(atualizados));
    };

    const deletarCliente = (id) => {
        const clientes = getClientes().filter(c => c.id !== id);
        localStorage.setItem("clientes", JSON.stringify(clientes));
    };

    return (
        <ClienteContext.Provider value={{ getClientes, addCliente, atualizarCliente, deletarCliente, clienteSelecionado, setClienteSelecionado }}>
            {children}
        </ClienteContext.Provider>
    );
};
