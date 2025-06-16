import { createContext, useContext} from "react";

const ProdutoContext = createContext();
export const useProduto = () => useContext(ProdutoContext);

export const ProdutoProvider = ({ children }) => {
    
    const getProdutos = () =>
        JSON.parse(localStorage.getItem("produtos_cadastrados")) || [];

    const addProduto = (produto) => {
        const produtos = getProdutos();
        if (produtos.some(p => p.nome === produto.nome)) return false;

        const atualizados = [...produtos, produto];
        localStorage.setItem("produtos_cadastrados", JSON.stringify(atualizados));
        return true;
    };

    const updateProduto = (produto) => {
        const produtos = getProdutos().map(p =>
            p.id === produto.id ? produto : p
        );
        localStorage.setItem("produtos_cadastrados", JSON.stringify(produtos));
    };

    const deleteProduto = (id) => {
        const produtos = getProdutos().filter(p => p.id !== id);
        localStorage.setItem("produtos_cadastrados", JSON.stringify(produtos));
    };

    return (
        <ProdutoContext.Provider value={{ getProdutos, addProduto, updateProduto, deleteProduto }}>
            {children}
        </ProdutoContext.Provider>
    );
};
