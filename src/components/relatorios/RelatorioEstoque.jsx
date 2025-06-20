import { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { useProduto } from "../context/ProdutoContext";

export default function EstoqueRelatorio() {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [ordem, setOrdem] = useState("desc");
    const [baixandoExcel, setBaixandoExcel] = useState(false);
    const [baixandoPDF, setBaixandoPDF] = useState(false);
    const { getProdutos } = useProduto();

    useEffect(() => {
        try {
            const list = getProdutos();
            setDados(list);
            setLoading(false);
        } catch (err) {
            setErro("Erro ao carregar dados do relatório.", err);
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
            .catch(() => toast.error("Erro ao baixar o relatório em Excel."))
            .finally(() => setBaixandoExcel(false));
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
            .catch(() => toast.error("Erro ao baixar o relatório em PDF."))
            .finally(() => setBaixandoPDF(false));
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

            <div className="pb-3" style={{ height: 400 }}>
                <ResponsiveBar
                    data={ordenarDados(dados)}
                    keys={["quantidade"]}
                    indexBy="nome"
                    margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
                    padding={0.3}
                    colors={{ scheme: "nivo" }}
                    borderRadius={2}
                    borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -9,
                        legendPosition: "middle",
                        legendOffset: 45
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Quantidade",
                        legendPosition: "middle",
                        legendOffset: -40
                    }}
                    tooltip={({ value, indexValue }) => (
                        <strong style={{ color: "#fff", background: "#333", padding: "5px 10px", borderRadius: "4px" }}>
                            {indexValue}: {value}
                        </strong>
                    )}
                    theme={{
                        tooltip: {
                            container: {
                                background: "#222",
                                color: "#fff",
                            },
                        },
                        axis: {
                            ticks: {
                                text: {
                                    fill: "#fff",
                                },
                            },
                            legend: {
                                text: {
                                    fill: "#fff",
                                },
                            },
                        },
                    }}
                    animate
                    motionStiffness={90}
                    motionDamping={15}
                />
            </div>
        </>
    );
}
