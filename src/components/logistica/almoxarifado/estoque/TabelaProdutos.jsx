import { useState } from 'react';
import './estoque.css';

export default function TabelaProdutos({
    produtos,
    onEditar,
    onExcluir,
    onOrdenar,
    colunaOrdenada,
    ordemAscendente,
    onAdicionar
}) {
    const [filtro, setFiltro] = useState(null);
    function obterClasseEstoque(quantidade) {
        if (quantidade <= 2) return "estoque-baixo";
        if (quantidade <= 5) return "estoque-medio";
        return "estoque-bom";
    }

    function filtraStatusEstoque(status) {
        setFiltro(p => p === status ? null : status);
    }

    return (
        <div className="table-responsive">
            <section className="d-flex justify-content-between mb-2 align-items-center">
                <button
                    className="btn btn-sm btn-success me-1"
                    onClick={onAdicionar}
                >
                    {onAdicionar ? "Adicionar Produto" : "Voltar"}
                </button>
                <div className="d-flex gap-2 align-items-center">
                    <button
                        onClick={() => filtraStatusEstoque("estoque-baixo")}
                        className='btn btn-sm text-light'
                        style={{ backgroundColor: "#ff4d4d" }}
                    >
                        Estoque baixo
                    </button>

                    <button
                        onClick={() => filtraStatusEstoque("estoque-medio")}
                        className='btn btn-sm text-dark'
                        style={{ backgroundColor: "#fff3cd" }}
                    >
                        Estoque médio
                    </button>

                    <button
                        onClick={() => filtraStatusEstoque("estoque-bom")}
                        className='btn btn-sm text-light'
                        style={{ backgroundColor: "#3a5641" }}
                    >
                        Estoque bom
                    </button>

                </div>
            </section>

            <table className="table table-dark table-bordered overflow-auto">
                <thead className="table-dark">
                    <tr>
                        <th className="pt-2 pb-2  text-center">Nome</th>
                        <th className="pt-2 pb-2  text-center">Categoria</th>
                        <th
                            className="pt-2 pb-2  text-center"
                            style={{ cursor: "pointer" }}
                            onClick={() => onOrdenar("precoUN")}
                        >
                            Preço(UN){" "}
                            {colunaOrdenada === "precoUN" && (ordemAscendente ? "↑" : "↓")}
                        </th>

                        <th
                            className="pt-2 pb-2 text-center"
                            style={{ cursor: "pointer" }}
                            onClick={() => onOrdenar("quantidade")}
                        >
                            Quantidade{" "}
                            {colunaOrdenada === "quantidade" &&
                                (ordemAscendente ? "↑" : "↓")}
                        </th>
                        <th
                            className="pt-2 pb-2 text-center"
                            style={{ cursor: "pointer" }}
                            onClick={() => onOrdenar("precoUN")}
                        >
                            Preço(T){" "}
                            {colunaOrdenada === "precoUN" && (ordemAscendente ? "↑" : "↓")}
                        </th>
                        <th className="pt-2 pb-2 text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos
                        .filter(p => {
                            const classe = obterClasseEstoque(p.quantidade ?? 0);
                            return !filtro || classe === filtro;
                        })
                        .map((p) => (
                            <tr key={p.id} className={obterClasseEstoque(p.quantidade ?? 0)}>
                                <td>{p.nome}</td>
                                <td className="text-center">{p.categoria}</td>
                                <td className="text-end">R$ {Number(p.precoUN).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                                <td
                                    className="text-end">{p.quantidade === null ? 0 : p.quantidade}</td>
                                <td className="text-end">
                                    R$ {Number(p.quantidade * p.precoUN).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                </td>
                                <td>
                                    <div className="d-flex justify-content-evenly gap-2">
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => onEditar(p)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => onExcluir(p.id)}
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div >
    );
}
