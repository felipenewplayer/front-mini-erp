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
    return (
        <div className="table-responsive">
            <button
                className="btn btn-sm btn-success mb-2"
                onClick={onAdicionar}
            >
                {onAdicionar ? "Adicionar Produto" : "Voltar"}
            </button>


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
                    {produtos.map((p) => (
                        <tr key={p.id}>
                            <td>{p.nome}</td>
                            <td>{p.categoria}</td>
                            <td className="text-end">R$ {Number(p.precoUN).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                            <td className="text-end">{p.quantidade === null ? 0 : p.quantidade}</td>
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
        </div>
    );
}
