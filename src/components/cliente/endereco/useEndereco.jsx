import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useEndereco() {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState("");

  // Buscar estados ao montar
  useEffect(() => {
    async function carregarEstados() {
      try {
        const res = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
        const ordenados = res.data.sort((a, b) => a.nome.localeCompare(b.nome));
        setEstados(ordenados);
      } catch (error) {
        toast.error("Erro ao buscar estados:", error);
      }
    }

    carregarEstados();
  }, []);

  useEffect(() => {
    async function carregarCidades() {
      if (estadoSelecionado) {
        try {
          const res = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`);
          const ordenados = res.data.sort((a, b) => a.nome.localeCompare(b.nome));
          setCidades(ordenados);
        } catch (error) {
          toast.error("Erro ao buscar cidades:", error);
        }
      } else {
        setCidades([]);
      }
    }

    carregarCidades();
  }, [estadoSelecionado]);

  return {
    estados,
    cidades,
    estadoSelecionado,
    setEstadoSelecionado
  };
}
