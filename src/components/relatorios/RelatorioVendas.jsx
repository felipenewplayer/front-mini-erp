import { useEffect, useState } from "react";
import { useVendas } from "../context/VendasContext";

import ComponenteGrafico from "./ComponenteGrafico";
import DivsDosConteudos from "../DivsDosConteudos";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";


export default function RelatorioVendas() {
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState([]);
  const { getVendas } = useVendas();
  const [ordem, setOrdem] = useState("desc");


  useEffect(() => {
    try {
      const vendas = getVendas();
      setDados(vendas);
    } catch (error) {
      toast.error("Erro ao buscar vendas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Carregando relatório...</p>;
  if (!dados || dados.length === 0) return <p>Nenhuma venda encontrada.</p>;


  function agruparPorCliente() {
    const agrupado = dados.reduce((acc, dado) => {
      const nome = dado?.nomeCliente ?? "Sem nome!";
      if (!acc[nome]) {
        acc[nome] = 0;
      }
      acc[nome] += dado.quantidade;
      return acc;
    }, {})

    return Object.entries(agrupado).map(([nomeCliente, quantidade]) => {

      return {
        nomeCliente,
        quantidade
      }
    })
  }

  function agruparPorProduto() {
    const agrupar = dados.reduce((acc, dado) => {
      const produtoNome = dado?.produto?.nome ?? "Sem nome";
      if (!acc[produtoNome]) {
        acc[produtoNome] = 0;
      }
      acc[produtoNome] += dado.quantidade;
      return acc;
    }, {});

    return Object.entries(agrupar).map(([produtoNome, quantidade]) => {
      return {
        produtoNome,
        quantidade
      }
    })
  }


  function agruparPorCategoria() {
    const agrupar = dados.reduce((acc, dado) => {
      const categoria = dado?.produto?.categoria ?? "Sem Categoria";
      if (!acc[categoria]) {
        acc[categoria] = 0;
      }
      acc[categoria] += dado.quantidade;
      return acc;
    }, {})

    return Object.entries(agrupar).map(([categoria, quantidade]) => {
      return {
        categoria,
        quantidade
      }
    })
  }
  const totaTDeVendas = dados.length;

  const ordenarDados = (dados) => {
    return [...dados].sort((a, b) =>
      ordem === "asc" ? a.quantidade - b.quantidade : b.quantidade - a.quantidade
    );
  }

  return (
    <>
      <DivsDosConteudos>
        <Outlet />{<div className="d-flex flex-column ms-4">
          <div className="m-1 mb-3 d-flex justify-content-evenly gap-3" >
            <select
              value={ordem}
              onChange={(e) => setOrdem(e.target.value)}
              className="rounded">
              <option value="asc">Maior para o menor</option>
              <option value="desc">Menor para o maior</option>
            </select>
            <h2 className="text-primary">Total de vendas: {totaTDeVendas}</h2>
          </div>
          <div className="pb-3" style={{ height: 400 }}>
            <ComponenteGrafico
              titulo="Vendas por Cliente"
              dados={ordenarDados(agruparPorCliente()).map(item => ({
                nome: item?.nomeCliente ?? "Sem nome",
                quantidade: item.quantidade
              }))}
            />
          </div>
          <div className="pb-3" style={{ height: 400 }}>
            <ComponenteGrafico
              titulo="Vendas Por Produto"
              dados={ordenarDados(agruparPorProduto()).map(item => ({
                nome: item?.produtoNome ?? "Sem produto",
                quantidade: item.quantidade
              }))
              }
              color="#ffffff"
            />
          </div>
          <div className="pb-3" style={{ height: 400 }}>
            <ComponenteGrafico
              titulo="Vendas por Categoria"
              dados={ordenarDados(agruparPorCategoria()).map(item => ({
                nome: item?.categoria ?? "Sem categoria",
                quantidade: item.quantidade
              }))}
              color="#c82e1a"
            />
          </div>
        </div>}
      </DivsDosConteudos>
    </>

  );
}
