

export default function ClienteTabela({
    clientes,
    onEditar,
    onExluir
}){
    return (
        <table className="table table-primary table-striped  m-3">
                    <thead >
                        <tr >
                            <th >Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Endereco</th>
                            <th className="text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(cliente => (
                            <tr key={cliente.id}>
                                <td>{cliente.nome}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.telefone}</td>
                                <td>{cliente.endereco}</td>
                                <td>
                                    <div className="d-flex justify-content-evenly">
                                        <button
                                            className="btn btn-warning" onClick={() => onEditar(cliente)}
                                        >Editar
                                        </button>
                                        <button
                                            className="btn btn-danger" onClick={() => onExluir(cliente.id)}
                                        >Excluir
                                        </button>
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
    )
}