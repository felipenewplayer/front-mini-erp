import { createContext, useContext } from "react";

const VendasContext = createContext();
export const useVendas = () => useContext(VendasContext);

export const VendasProvider = ({ children }) => {
    const getVendas = () => {
        return JSON.parse(localStorage.getItem("vendas")) || [];
    };

    const addVendas = (novaVenda) => {
        const vendas = getVendas();

        const vendaFormatada = {
            ...novaVenda,
            clienteId: novaVenda.cliente.id,
            nomeCliente: novaVenda.cliente.nome,
            total: novaVenda.quantidade * novaVenda.precoUN,
            id: Date.now()
        };

        const novasVendas = [...vendas, vendaFormatada];
        localStorage.setItem("vendas", JSON.stringify(novasVendas));
        return true;
    };


    return (
        <VendasContext.Provider value={{ getVendas, addVendas }}>
            {children}
        </VendasContext.Provider>
    );
};
