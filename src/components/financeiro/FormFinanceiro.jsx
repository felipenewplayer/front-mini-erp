export default function FormFinanceiro({
    form,
    onSubmit,
    onChange

}) {

    return (
        <form className="card p-3 mb-4" onSubmit={onSubmit}>
            <div className="mb-2">
                <label className="form-label">Valor</label>
                <input
                    className="form-control"
                    name="valor"
                    type="number"
                    value={form.valor}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="mb-2">
                <label className="form-label">Tipo</label>
                <input
                    className="form-control"
                    name="tipo"
                    value={form.tipo}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="mb-2">
                <label className="form-label">Vencimento</label>
                <input
                    className="form-control"
                    name="vencimento"
                    type="date"
                    value={form.vencimento}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="mb-2">
                <label className="form-label">Descrição</label>
                <input
                    className="form-control"
                    name="descricao"
                    value={form.descricao}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="mb-2">
                <label className="form-label">Status</label>
                <select
                    className="form-control"
                    name="status"
                    value={form.status}
                    onChange={onChange}
                    required
                >
                    <option value="">Selecione...</option>
                    <option value="PENDENTE">PENDENTE</option>
                    <option value="CANCELADO">CANCELADO</option>
                    <option value="PAGO">PAGO</option>
                </select>
            </div>

            <button type="submit" className="btn btn-success mt-3">
                Salvar Transação
            </button>
        </form>
    )
}