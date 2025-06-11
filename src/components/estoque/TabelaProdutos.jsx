

export default function TabelaProdutos({
    produtos,
    onEditar,
    onExcluir

}) {
    return (
        <div className="table-responsive ">
            <table className="table table-dark table-bordered overflow-auto mt-4">
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
                            <td>{p.estoque?.quantidade ?? 0}</td>
                            <td>
                                <div className="d-flex justify-content-evenly gap-2" >
                                    <button
                                        className="btn btn-warning "
                                        onClick={() => { onEditar(p) }}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-danger "
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

    )
}