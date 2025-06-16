export default function VendasListaClientes() {
  const vendas = JSON.parse(localStorage.getItem("vendas")) || [];

  // Soma total geral de todas as vendas
  const totalGeral = vendas.reduce((acc, venda) => {
    const total = (venda.produto?.precoUN || 0) * (venda.quantidade || 0);
    return acc + total;
  }, 0);

  return (
    <div className="shadow rounded border p-1 text-light">
      <section className="d-flex justify-content-evenly me-5 ms-5 mt-2 border-bottom align-items-center">
        <span>Clientes</span>
        <span>Total</span>
      </section>

      <section className="d-flex">
        <ul className="d-flex flex-column pt-3 w-100">
          {vendas.map((venda) => {
            const nomeCliente = venda.cliente?.nome || "Cliente Desconhecido";
            const total = (venda.produto?.precoUN || 0) * (venda.quantidade || 0);

            return (
              <li
                key={venda.id}
                className="d-flex gap-4 w-100 justify-content-around me-5"
              >
                {`Cliente:  ${nomeCliente}`}
                <p>
                  R$ {total.toFixed(2).replace(".", ",")} <strong className="ps-4">VENDA</strong>
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-3 d-flex justify-content-evenly me-5">
        <strong>Total Geral: R$ {totalGeral.toFixed(2).replace(".", ",")}</strong>
      </section>
    </div>
  );    
}
