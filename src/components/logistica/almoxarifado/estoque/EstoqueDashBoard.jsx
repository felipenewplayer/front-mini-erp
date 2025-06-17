import { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useUser } from "../../../context/AuthContext";


export default function EstoqueDashBoard() {
  const { getProdutosLocal } = useUser();
  const [produtos, setProdutos] = useState([]);
  const [filtro, setFiltro] = useState("categoria");

  useEffect(() => {
    const lista = getProdutosLocal();
    setProdutos(lista);
  }, [getProdutosLocal]);

  const dadosPorCategoria = () => {
    const map = {};
    produtos.forEach((p) => {
      const cat = p.categoria || "Sem Categoria";
      const qtd = Number(p.quantidade) || 0;
      map[cat] = (map[cat] || 0) + qtd;
    });
    return Object.entries(map).map(([categoria, quantidade]) => ({ categoria, quantidade }));
  };

  const dadosPorAno = () => {
    const map = {};
    produtos.forEach((p) => {
      if (!p.dataEntrada) return;
      const data = new Date(p.dataEntrada);
      if (isNaN(data)) return;
      const ano = data.getFullYear();
      const qtd = Number(p.quantidade) || 0;
      map[ano] = (map[ano] || 0) + qtd;
    });
    return Object.entries(map).map(([ano, quantidade]) => ({ ano, quantidade }));
  };

  const dadosPorMes = () => {
    const map = {};
    produtos.forEach((p) => {
      if (!p.dataEntrada) return;
      const data = new Date(p.dataEntrada);
      if (isNaN(data)) return;
      const mesAno = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}`;
      const qtd = Number(p.quantidade) || 0;
      map[mesAno] = (map[mesAno] || 0) + qtd;
    });
    return Object.entries(map).map(([mesAno, quantidade]) => ({ mesAno, quantidade }));
  };

  let dadosGrafico = [];
  let indexBy = "";

  if (filtro === "categoria") {
    dadosGrafico = dadosPorCategoria();
    indexBy = "categoria";
  } else if (filtro === "ano") {
    dadosGrafico = dadosPorAno();
    indexBy = "ano";
  } else if (filtro === "mes") {
    dadosGrafico = dadosPorMes();
    indexBy = "mesAno";
  }

  return (
    <>
      <h1
        className="text-center"
        style={{
          background: "linear-gradient(to right, var(--gray-50), var(--black-90))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Dashboard
      </h1>

      <select
        className="form-select form-select-sm ms-4 pl-1"
        style={{ fontSize: "0.75rem", width: "100px", height: "30px" }}
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      >
        <option value="ano">Ano</option>
        <option value="mes">Mês</option>
        <option value="categoria">Categoria</option>
      </select>

      <div style={{ width: "100%", height: 400, marginTop: 30 }}>
        <ResponsiveBar
          data={dadosGrafico}
          keys={["quantidade"]}
          indexBy={indexBy}
          margin={{ top: 50, right: 50, bottom: 60, left: 60 }}
          padding={0.3}
          colors={{ scheme: "nivo" }}
          axisBottom={{
            tickRotation: filtro !== "categoria" ? -20 : 0,
            legend: indexBy,
            legendPosition: "middle",
            legendOffset: 40,
            tickSize: 5,
            tickPadding: 5,
          }}
          axisLeft={{
            legend: "Quantidade",
            legendPosition: "middle",
            legendOffset: -50,
          }}
          tooltip={({value, indexValue }) => (
            <div style={{ padding: "6px", background: "#333", color: "#fff" }}>
              <strong>{indexValue}</strong>: {value}
            </div>
          )}
          theme={{
            axis: {
              ticks: {
                text: { fill: "#ffffff" },
              },
              legend: {
                text: { fill: "#ffffff" },
              },
            },
            tooltip: {
              container: {
                background: "#000",
                color: "#fff",
              },
            },
          }}
        />
      </div>
    </>
  );
}
