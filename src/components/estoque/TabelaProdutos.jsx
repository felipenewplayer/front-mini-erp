import './estoque.css'

export default function TabelaProdutos({
    produtos,
    onEditar,
    onExcluir

}) {
    return (
        <div className="table-responsive ">
            <table className="table table-dark table-bordered mt-4">
                <thead className="table-dark">
                    <tr>
                        <th className="p-3 text-center">Nome</th>
                        <th className="p-3 text-center">Preço (R$)</th>
                        <th className="p-3 text-center">Quantidade</th>
                        <th className="p-3 text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((p,) => (
                        <tr key={p.id}>
                            <td>{p.nome}</td>
                            <td className="text-end">R$ {p.preco.toFixed(2)}</td>
                            <td className="text-end">{p.estoque?.quantidade ?? 0}</td>
                            <td>
                                <div className="d-flex justify-content-evenly gap-2" >
                                    <button
                                        className="btn btn-warning btn-sm "
                                        onClick={() => { onEditar(p) }}
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

    )
}