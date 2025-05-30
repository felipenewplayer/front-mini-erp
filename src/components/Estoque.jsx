import { useEffect, useState } from "react";

export default function Estoque() {
  const [produtos, setProdutos] = useState([{
    nome: "Cama",
    preco: 99,
    estoque:{
      id:1,
      quantidadeAtual:1

    }
  }]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:8080/produtos")
        .then(res => res.json())
        .then(data => setProdutos(data));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h2>Estoque</h2>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th className="p-3">Nome</th>
            <th className="p-3">Preço (R$)</th>
            <th className="p-3">Quantidade em Estoque</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>R$ {produto.preco.toFixed(2)}</td>
              <td>{produto.estoque?.quantidadeAtual ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
