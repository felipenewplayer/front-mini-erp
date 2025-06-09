import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import axios from "axios";

export default function EstoqueRelatorio() {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

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

    if (loading) return <p>Carregando relatório...</p>;
    if (erro) return <p className="text-danger">{erro}</p>;

    return (
        <div style={{ height: 400 }}>
            <ResponsiveContainer>
                <BarChart data={dados} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nome" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="quantidade" fill="#112a28" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
