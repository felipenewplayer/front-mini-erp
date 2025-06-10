export default function ListaDasTransacoes({
    transacoes,
    filtroStatus,
    onEdit,
    onExcluir
}) {
    return (

        <div className="list-container overflow-auto " style={{ maxHeight: 580 }}>
            {transacoes.filter((t) => !filtroStatus || t.status === filtroStatus)
                .map((t) => (
                    <ul key={t.id} className="list-group w-75 ">
                        <li className="list-group-item">Descrição: {t.descricao}</li>
                        <li className="list-group-item">Valor: {parseFloat(t.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</li>
                        <li className="list-group-item">Tipo: {t.tipo}</li>
                        <li className="list-group-item">Vencimento: {t.vencimento}</li>

                            <li className="list-group-item">Status: {t.status}</li>

                            <div className="d-flex gap-3 mt-4 mb-4">
                                <button className="btn btn-danger p-2" onClick={() => onExcluir(t.id)}>Excluir</button>
                                <button className="btn btn-warning p-2" onClick={() => onEdit(t)}>Editar</button>
                            </div>
                    </ul>
                ))}
        </div>
    )
}