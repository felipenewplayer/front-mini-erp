import DivsDosConteudos from "../../../DivsDosConteudos";
import EstoqueDashBoard from "./EstoqueDashBoard";
import { useState } from "react";
import useFormProduto from "./produto/useFormProduto";
import FormProduto from "./FormProduto";
import { useProduto } from "../../../context/ProdutoContext.jsx";
import useProdutos from "./produto/useProduto";
import { toast } from "react-toastify";
import TabelaProdutos from "../estoque/TabelaProdutos.jsx";

export default function Estoque() {
    const [abaAtiva, setAbaAtiva] = useState("");
    const { form, editId, setEditId, iniciarEdicao, limparForm } = useFormProduto();
    const { addProduto , updateProduto, deleteProduto } = useProduto();
    const { produtos, setProdutos, isLoading, error } = useProdutos();
    const [colunaOrdenada, setColunaOrdenada] = useState("");
    const [ordemAscendente, setOrdemAscendente] = useState(true);

    const handleSubmit = (data) => {
        if (editId) {
            const produtoAtualizado = { ...data, id: editId };
            updateProduto(produtoAtualizado);
            setProdutos(prev => prev.map(p => p.id === editId ? produtoAtualizado : p));
            toast.success("Produto atualizado com sucesso!");
        } else {
            const produtoComId = { ...data, id: Date.now() };
            const sucesso = addProduto(produtoComId);
            if (sucesso) {
                setProdutos(prev => [...prev, produtoComId]);
                toast.success("Produto cadastrado com sucesso!");
            } else {
                toast.error("Erro ao cadastrar produto");
            }
        }
        limparForm();
        setEditId(null);
        setAbaAtiva("tabela");
    };

    const handleDeletar = (id) => {
        if (!window.confirm("Tem certeza que quer deletar?")) return;

        try {
            deleteProduto(id);
            setProdutos(prev => prev.filter(p => p.id !== id));
            toast.success("Produto excluído com sucesso!");
        } catch (err) {
            toast.error("Erro ao excluir o produto", err);
        }
    };

    const produtosFiltrados = [...produtos].sort((a, b) => {
        const ordem = ordemAscendente ? 1 : -1;
        if (colunaOrdenada === "precoUN") return ordem * (a.precoUN - b.precoUN);
        if (colunaOrdenada === "quantidade") return ordem * (a.quantidade - b.quantidade);
        return 0;
    });

    const handleOrdenar = (coluna) => {
        if (colunaOrdenada === coluna) {
            setOrdemAscendente(!ordemAscendente);
        } else {
            setColunaOrdenada(coluna);
            setOrdemAscendente(true);
        }
    };

    return (
        <div>
            <div className="d-flex gap-2 mb-3 mt-1">
                <button
                    className="btn btn-sm text-light"
                    style={{ background: "linear-gradient(to right, var(--purple-20), var(--purple-40))" }}
                    onClick={() => setAbaAtiva(abaAtiva === "tabela" ? "" : "tabela")}
                >
                    {abaAtiva === "tabela" ? "Fechar Tabela" : "Mostrar Tabela"}
                </button>
            </div>

            {abaAtiva === "tabela" && (
                <>
                    {isLoading && (
                        <div className="text-center">
                            <div className="spinner-border text-light" role="status" />
                        </div>
                    )}
                    {error && <p className="text-danger">{error}</p>}
                    <TabelaProdutos
                        produtos={produtosFiltrados}
                        onEditar={(p) => {
                            iniciarEdicao(p);
                            setAbaAtiva("formulario");
                        }}
                        onAdicionar={() => {
                            limparForm();
                            setAbaAtiva("formulario");
                        }}
                        onExcluir={handleDeletar}
                        onOrdenar={handleOrdenar}
                        colunaOrdenada={colunaOrdenada}
                        ordemAscendente={ordemAscendente}
                    />
                </>
            )}

            {abaAtiva === "formulario" && (
                <FormProduto
                    onHandleSubmit={handleSubmit}
                    defaultValues={form}
                    onCancel={() => setAbaAtiva("tabela")}
                />
            )}

            {/* {abaAtiva === "" && <EstoqueDashBoard />} */}
        </div>
    );
}
