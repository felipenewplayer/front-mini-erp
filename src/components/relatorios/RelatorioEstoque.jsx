import { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { useUser } from "../context/UserContext.jsx";

export default function EstoqueRelatorio() {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [ordem, setOrdem] = useState("desc");
    const [baixandoExcel, setBaixandoExcel] = useState(false);
    const [baixandoPDF, setBaixandoPDF] = useState(false);
    const { getProdutosLocal } = useUser();
    useEffect(() => {
        try {
            const list = getProdutosLocal();
            setDados(list);
            setLoading(false);

        } catch (err) {

            setErro("Erro ao carregar dados do relatório.",err);
            setLoading(false);
        }
    }, []);

    const baixarExcel = () => {
        setBaixandoExcel(true);
        axios.get("https://erp-relatorio.onrender.com/relatorio/estoque/excel", {
            responseType: "blob"
        })
            .then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "relatório_estoque.xlsx");
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch(() => {
                toast.error("Erro ao baixar o relatório em Excel.");
            })
            .finally(() => {
                setBaixandoExcel(false);
            });
    };
    const baixarPDF = () => {
        setBaixandoPDF(true);
        axios.get("https://erp-relatorio.onrender.com/relatorio/estoque/pdf", {
            responseType: "blob"
        })
            .then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "relatório_estoque.pdf");
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch(() => {
                toast.error("Erro ao baixar o relatório em PDF.");
            })
            .finally(() => {
                setBaixandoPDF(false);
            });
    };

    const ordenarDados = (dados) => {
        return [...dados].sort((a, b) =>
            ordem === "asc" ? a.quantidade - b.quantidade : b.quantidade - a.quantidade
        );
    };

    if (loading) return <p>Carregando relatório...</p>;
    if (erro) return <p className="text-danger">{erro}</p>;

    return (
        <>
            <p className="text-light">Relatório de Estoque</p>
            <div className="d-flex gap-4 align-items-center mb-3">
                <select
                    value={ordem}
                    onChange={(e) => setOrdem(e.target.value)}
                    className="form-select w-auto"
                >
                    <option value="desc">Maior para menor</option>
                    <option value="asc">Menor para maior</option>
                </select>

                <div className="d-flex gap-2 flex-column">
                    <button
                        className="btn p-2 d-flex align-items-center justify-content-center gap-2"
                        style={{
                            width: "138px", height: "40px", paddingBottom: "3px",
                            background: "linear-gradient(to right, var(--green-10), var(--green-30))"
                        }}
                        onClick={baixarExcel}
                        disabled={baixandoExcel}
                    >
                        {baixandoExcel ? <FaSpinner className="spin" /> : "Baixar em Excel"}
                    </button>
                    <button
                        className="btn p-2 d-flex align-items-center justify-content-center gap-2"
                        style={{
                            width: "138px", height: "40px", paddingBottom: "3px",
                            background: "linear-gradient(to right, var(--red-10), var(--orange-30))"
                        }}
                        onClick={baixarPDF}
                        disabled={baixandoPDF}
                    >
                        {baixandoPDF ? <FaSpinner className="spin" /> : "Baixar em PDF"}
                    </button>
                </div>
            </div>

            <ResponsiveContainer height={400}>
                <BarChart
                    data={ordenarDados(dados)}
                    margin={{ top: 10, right: 0, left: 0, bottom: 20 }}
                >
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
                        stroke="#FFFFF"
                        tick={{ fill: "#d12e2e" }}
                    />
                    <YAxis
                        tick={{ fill: "#d62929" }} />
                    <Tooltip />
                    <Bar dataKey="quantidade" fill="url(#gradienteBar)" />
                </BarChart>
            </ResponsiveContainer>

        </>
    );
}
