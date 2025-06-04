export default function FormProduto({
    form,
    onChange,
    onSubmit
}) {
    return (
        <form className="card p-3 mb-4" onSubmit={onSubmit}>
            <div className="mb-2">
                <label className="form-label">Nome</label>
                <input
                    type="text"
                    name="nome"
                    className="form-control"
                    required
                    value={form.nome}
                    onChange={onChange}
                />
            </div>
            <div className="mb-2">
                <label className="form-label">Preço</label>
                <input
                    type="number"
                    name="preco"
                    className="form-control"
                    required
                    value={form.preco}
                    onChange={onChange}
                />
            </div>
            <div className="mb-2">
                <label className="form-label">Quantidade</label>
                <input
                    type="number"
                    name="quantidade"
                    className="form-control"
                    required
                    value={form.quantidade}
                    onChange={onChange}
                />
            </div>
            <button type="submit" className="btn btn-success mt-3">
                Salvar Produto
            </button>
        </form>
    )
}