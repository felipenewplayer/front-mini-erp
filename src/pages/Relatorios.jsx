import { useState } from "react";
import DivsDosConteudos from "../components/DivsDosConteudos";
import EstoqueRelatorio from "../components/relatorios/RelatorioEstoque.jsx";
import "../components/relatorios/Relatorios.css";

export default function Relatorios() {
    const [showListaMenu, setShowListaMenu] = useState(true);
    const [secaoAtiva, setSecaoAtiva] = useState(null);

    const handleSecaoAtiva = (secao) => {
        setSecaoAtiva(secao);
        setShowListaMenu(false); // Esconde o menu após clicar (opcional)
    };

    return (
        <DivsDosConteudos>
            <h1 className="text-light mb-3">Relatórios</h1>
            {!showListaMenu && (
                <div className="d-flex gap-5">
                    <button className="btn btn-sm ms-3 mb-2 rounded shadow  p-1"
                        style={{ background: "linear-gradient(to right, var(--orange-20), var(--orange-50))" }}
                        onClick={() => setShowListaMenu(true)}>Voltar</button>

                </div>

            )}
            {showListaMenu && (
                <section className="container d-flex  gap-3">
                    <button
                        className="btn btn-relatorio btn- text-light  shadow"
                        onClick={() => handleSecaoAtiva("estoque-relatorio")}
                    >
                        <p>Relatório do estoque</p>
                    </button>
                    <button
                        className="btn btn-relatorio text-light shadow"
                        onClick={() => handleSecaoAtiva("estoque-relatorio")}
                    >
                        <p>Sendo feito</p>
                    </button>
                    <button
                        className="btn btn-relatorio text-light shadow"
                        onClick={() => handleSecaoAtiva("estoque-relatorio")}
                    >
                        <p>Sendo feito</p>
                    </button>
                </section>
            )}
            {secaoAtiva === "estoque-relatorio" && <EstoqueRelatorio />}
        </DivsDosConteudos>
    );
}
