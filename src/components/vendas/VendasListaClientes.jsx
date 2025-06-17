export default function VendasListaClientes() {
  const vendas = JSON.parse(localStorage.getItem("vendas")) || [];


  // Soma total geral de todas as vendas
  const totalGeral = vendas.reduce((acc, venda) => {
    const total = (venda.produto?.precoUN || 0) * (venda.quantidade || 0);
    return acc + total;
  }, 0);

  return (

    <div className="table-responsive">
      <table className="table table-dark table-bordered overflow-auto ">
        <thead>
          <tr>
            <th className="p-3 text-center">Clientes</th>
            <th className="p-3 text-center">Produto</th>
            <th className="p-3 text-center">Quantidade</th>
            <th className="p-3 text-center">Total</th>
          </tr>
        </thead>

        <tbody>
          {vendas.map((venda, index) => {
            const nomeCliente = venda.cliente?.nome || "Cliente Desconhecido";
            const produtoNome = venda.produto?.nome || "Item Desconhecido";
            const quantidade = venda.quantidade || 0;
            const total = (venda.produto?.precoUN || 0) * quantidade;

            return (
              <tr key={index}>
                <td className="text-center">{nomeCliente}</td>
                <td className="text-center">{produtoNome}</td>
                <td className="text-end">{quantidade}</td>
                <td className="text-end">
                  R$ {Number(total).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-3 d-flex justify-content-evenly me-5">
        <strong>
          Total Geral: R$ {Number(totalGeral).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </strong>
      </div>
    </div>
  );
}
