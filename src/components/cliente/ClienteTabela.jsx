export default function ClienteTabela({
    clientes,
    onEditar,
    onExcluir,
    onAdicionar
}) {
    return (
        <>
            <div className="table-responsive">
                <button
                    className="btn btn-sm btn-success mb-2"
                    onClick={onAdicionar}
                >
                    {onAdicionar ? "Adicionar Cliente" : "Voltar"}
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-dark table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Endereco</th>
                            <th className="text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(cliente => (
                            <tr key={cliente.id}>
                                <td style={{ maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cliente.nome}</td>
                                <td style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cliente.email}</td>
                                <td style={{ maxWidth: "120px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cliente.telefone}</td>
                                <td style={{ maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cliente.endereco}</td>
                                <td>
                                    <div className="d-flex justify-content-evenly">
                                        <button className="btn btn-warning" onClick={() => onEditar(cliente)}>
                                            Editar
                                        </button>
                                        <button className="btn btn-danger" onClick={() => onExcluir(cliente.id)}>
                                            Excluir
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
