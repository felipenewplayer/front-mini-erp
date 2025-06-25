import { createContext, useContext, useEffect } from "react";

const ProdutoContext = createContext();
export const useProduto = () => useContext(ProdutoContext);


const produtosIniciais = [
    {
        id: 1,
        categoria: "CONSOLE",
        nome: "PlayStation 5",
        codigo: "PS5-001",
        precoUN: 4999.99,
        quantidade: 10,
        dataEntrada: "2024-06-20",
    },
    {
        id: 2,
        categoria: "CONSOLE",
        nome: "Super Nintendo",
        codigo: 6,
        precoUN: 199.9,
        quantidade: 25,
        dataEntrada: "2024-06-18",
    },
];

export const ProdutoProvider = ({ children }) => {

    useEffect(() => {
        const produtos = getProdutos();

        if (!produtos || produtos.length === 0) {
            localStorage.setItem("produtos_cadastrados", JSON.stringify(produtosIniciais))
        }
    }, [])
    
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
