import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { FaGamepad, FaMouse, FaCube, FaProcedures } from "react-icons/fa";
import { FiCpu, FiMonitor } from "react-icons/fi";
import { FaKeyboard } from "react-icons/fa6";

export default function EstoqueDashBoard() {
  const { getProdutosLocal } = useUser();
  const [produtos, setProdutos] = useState([]);
  const [filtro, setFiltro] = useState("categoria"); // "ano", "mes", "categoria"

  useEffect(() => {
    const lista = getProdutosLocal();
    setProdutos(lista);
  }, [getProdutosLocal]);

  const dadosPorCategoria = () => {
    const map = {};
    produtos.forEach(p => {
      const cat = p.categoria || "Sem Categoria";
      const qtd = Number(p.quantidade) || 0;
      map[cat] = (map[cat] || 0) + qtd;
    });
    return Object.entries(map).map(([categoria, quantidade]) => ({ categoria, quantidade }));
  };

  const dadosPorAno = () => {
    const map = {};
    produtos.forEach(p => {
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
    produtos.forEach(p => {
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
  let dataKey = "";
  if (filtro === "categoria") {
    dadosGrafico = dadosPorCategoria();
    dataKey = "categoria";
  } else if (filtro === "ano") {
    dadosGrafico = dadosPorAno();
    dataKey = "ano";
  } else if (filtro === "mes") {
    dadosGrafico = dadosPorMes();
    dataKey = "mesAno";
  }

  const TickComIcone = ({ x, y, payload }) => {
    if (filtro !== "categoria") {
      // Mostrar texto normal para filtros ano e mes, com rotação
      return (
        <text
          x={x}
          y={y + 10}
          textAnchor="end"
          fill="#ffffff"
          fontSize={12}
          transform={`rotate(-19, ${x}, ${y + 10})`}
        >
          {payload.value}
        </text>
      );
    }

    // Para categoria, mostrar ícone e texto
    const valor = payload.value.toLowerCase();

    let icone;
    switch (true) {
      case valor.includes("console"):
        icone = <FaGamepad color="#ffffff" size={20} />
        break;
      case valor.includes("teclado"):
        icone = <FaKeyboard color="#ffffff" size={20} />;
        break;
      case valor.includes("monitor"):
        icone = <FiMonitor color="#ffffff" size={20} />;
        break;
      case valor.includes("processador"):
        icone = <FiCpu color="#ffffff" size={20} />;
        break;
    }


    return (
      <g transform={`translate(${x},${y})`}>
        {icone}

      </g>
    );
  };

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
        style={{
          fontSize: "0.75rem",
          width: "100px",
          height: "30px",
        }}
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      >
        <option value="ano">Ano</option>
        <option value="mes">Mês</option>
        <option value="categoria">Categoria</option>
      </select>

      <div style={{ width: "100%", height: 400, marginTop: 30 }}>
        <ResponsiveContainer height={400}>
          <BarChart data={dadosGrafico} margin={{ top: 10, right: 0, left: 0, bottom: 60 }}>
            <defs>
              <linearGradient id="gradienteBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="20%" stopColor="#18756c" stopOpacity={1} />
                <stop offset="50%" stopColor="#25338d" stopOpacity={1} />
                <stop offset="80%" stopColor="#2f392d" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={dataKey}
              textAnchor="end"
              interval={0}
              height={10}
              stroke="#461212F"
              tick={TickComIcone}
            />
            <YAxis tick={{ fill: "#ffffff" }} />
            <Tooltip />
            <Bar dataKey="quantidade" fill="url(#gradienteBar)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
