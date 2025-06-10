import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import axios from "axios";

export default function EstoqueRelatorio() {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [ordem, setOrdem] = useState("desc");
    useEffect(() => {
        axios.get("http://localhost:8000/relatorio/estoque")
            .then((res) => {
                setDados(res.data);
                setLoading(false);
            })
            .catch(() => {
                setErro("Erro ao carregar dados do relatório.");
                setLoading(false);
            });
    }, []);

    const ordenarDados = (dados) => {
        return [...dados].sort((a, b) =>
            ordem === "asc" ? a.quantidade - b.quantidade : b.quantidade - a.quantidade
        );
    };

    if (loading) return <p>Carregando relatório...</p>;
    if (erro) return <p className="text-danger">{erro}</p>;

    return (
        <div className="mt-3 overflow-auto" style={{ height: 460 }}>
            <p className="text-light">Relatório de Estoque</p>

            <select
                value={ordem}
                onChange={(e) => setOrdem(e.target.value)}
                className="form-select w-auto mb-3"
            >
                <option value="desc">Maior para menor</option>
                <option value="asc">Menor para maior</option>
            </select>

            <ResponsiveContainer height={400}>
                <BarChart data={ordenarDados(dados)} margin={{ top: 10, right: 0, left: 0, bottom: 20 }}>
                    <defs>
                        <linearGradient id="gradienteBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0c332f" stopOpacity={1} />
                            <stop offset="100%" stopColor="#52a08f" stopOpacity={1} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="nome"
                        angle={-20}
                        textAnchor="end"
                        interval={0}
                        height={65}
                        style={{ fontSize: 10 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="quantidade" fill="url(#gradienteBar)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
