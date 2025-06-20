export default function VendasListaClientesAgrupado() {
  const vendas = JSON.parse(localStorage.getItem("vendas")) || [];

  const vendasPorCliente = vendas.reduce((acc, venda) => {
    const clienteNome = venda.cliente?.nome || "Cliente Desconhecido";
    if (!acc[clienteNome]) acc[clienteNome] = [];
    acc[clienteNome].push(venda);
    return acc;
  }, {});

  const totalGeral = vendas.reduce((acc, venda) => {
    const total = (venda.produto?.precoUN || 0) * (venda.quantidade || 0);
    return acc + total;
  }, 0);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-light text-center">Vendas Agrupadas por Cliente</h2>

      <div className="row g-4">
        {Object.entries(vendasPorCliente).map(([clienteNome, vendasCliente]) => {
          const totalCliente = vendasCliente.reduce((acc, venda) => {
            const total = (venda.produto?.precoUN || 0) * (venda.quantidade || 0);
            return acc + total;
          }, 0);

          return (
            <div key={clienteNome} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow bg-dark text-light border-primary">
                <div className="card-header fs-5 fw-bold border-primary">
                  {clienteNome}
                </div>
                <ul className="list-group list-group-flush">
                  {vendasCliente.map((venda, i) => (
                    <li key={i} className="list-group-item bg-dark text-light d-flex justify-content-between align-items-center border-primary">
                      <div>
                        <div><strong>Produto:</strong> {venda.produto?.nome || "Produto desconhecido"}</div>
                        <div><small>Qtd: {venda.quantidade}</small></div>
                      </div>
                      <span>
                        R$ {(venda.produto?.precoUN * venda.quantidade).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="card-footer text-end border-primary fw-semibold fs-6">
                  Total do cliente: R$ {totalCliente.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 text-center text-light fs-5 fw-bold">
        Total Geral: R$ {totalGeral.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </div>
    </div>
  );
}
