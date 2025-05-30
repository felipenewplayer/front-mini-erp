import { useState } from "react"

export default function Financeiro() {
    const [telaAdicionar, setTelaAdicionar] = useState(false);
    const [listDeTransacoes, setListDeTransacoes] = useState([{
        valor: 12.00,
        tipo: "Pago",
        vencimento: "12/12/2025",
        descricao: "Pagamento do cliente X",
        status: "pendente"
    }]);

    const [novaTransacao, setNovaTransacao] = useState({
        valor: "",
        tipo: "",
        vencimento: "",
        descricao: "",
        status: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setNovaTransacao(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="bg-secondary d-flex flex-column justify-content-around h-75 container rounded p-2">
            <h1 className="text-center mb-5">Financeiro</h1>

            <div className="d-flex h-100">
                <div className="d-flex flex-column">
                    <button className="p-3 w-100 rounded m-2">Filtrar</button>
                    <button
                        className="p-3 w-100 rounded m-2"
                        onClick={() => setTelaAdicionar(!telaAdicionar)}>
                        Adicionar lançamento
                    </button>
                </div>

                <div className="w-100 p-2 d-flex flex-column align-items-center">
                    <h2>Lista de Transações</h2>

                    {telaAdicionar && (
                        <div className="m-5 w-75 d-flex flex-column h-100">
                            <form>
                                <p>Valor</p>
                                <input
                                    name="valor"
                                    value={novaTransacao.valor}
                                    onChange={handleChange}
                                    className="w-75 m-1 p-2 rounded"
                                    type="text"
                                    placeholder="Digite o valor"
                                />
                                <p>Tipo</p>
                                <input
                                    name="tipo"
                                    value={novaTransacao.tipo}
                                    onChange={handleChange}
                                    className="w-75 m-1 p-2 rounded"
                                    type="text"
                                    placeholder="Digite o tipo, pago ou não"
                                />
                                <p>Vencimento</p>
                                <input
                                    name="vencimento"
                                    value={novaTransacao.vencimento}
                                    onChange={handleChange}
                                    className="w-75 m-1 p-2 rounded"
                                    type="text"
                                    placeholder="Digite o vencimento"
                                />
                                <p>Descrição</p>
                                <input
                                    name="descricao"
                                    value={novaTransacao.descricao}
                                    onChange={handleChange}
                                    className="w-75 m-1 p-2 rounded"
                                    type="text"
                                    placeholder="Digite a descrição"
                                />
                                <p>Status</p>
                                <input
                                    name="status"
                                    value={novaTransacao.status}
                                    onChange={handleChange}
                                    className="w-75 m-1 p-2 rounded"
                                    type="text"
                                    placeholder="Digite o status"
                                />
                            </form>

                            <button
                                className="btn btn-success w-75 p-3 m-5"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setListDeTransacoes([...listDeTransacoes, novaTransacao]);
                                    setNovaTransacao({
                                        valor: "",
                                        tipo: "",
                                        vencimento: "",
                                        descricao: "",
                                        status: ""
                                    });
                                    setTelaAdicionar(false);
                                }}
                            >
                                Salvar Transação
                            </button>
                        </div>
                    )}

                    {!telaAdicionar && listDeTransacoes.map((transacao, index) => (
                        <ul className="list-group w-75 mb-3" key={index}>
                            <li className="list-group-item">Vencimento: {transacao.vencimento}</li>
                            <li className="list-group-item">Tipo: {transacao.tipo}</li>
                            <li className="list-group-item">Descrição: {transacao.descricao}</li>
                            <li className="list-group-item">Valor: R$ {transacao.valor}</li>
                            <li className="list-group-item">Status: {transacao.status}</li>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
}
