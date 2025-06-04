

export default function TabelaProdutos({
    produtos,
    onEditar,
    onExcluir

}) {
    return (
        <table className="table table-bordered">
            <thead className="table-dark">
                <tr>
                    <th className="p-3">Nome</th>
                    <th className="p-3">Preço (R$)</th>
                    <th className="p-3">Quantidade em Estoque</th>
                    <th className="p-3">Ações</th>
                </tr>
            </thead>
            <tbody>
                {produtos.map((p,) => (
                    <tr key={p.id}>
                        <td>{p.nome}</td>
                        <td>R$ {p.preco.toFixed(2)}</td>
                        <td>{p.estoque?.quantidadeAtual ?? 0}</td>
                        <td>
                            <button
                                className="btn btn-warning btn-sm me-2 p-1"
                                onClick={() => {onEditar(p)}}
                            >
                                Editar
                            </button>

                            <button
                                className="btn btn-danger btn-sm p-1"
                                onClick={() => onExcluir(p.id)}
                            >
                                Excluir
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}