import { useState } from "react";
import DivsDosConteudos from "../components/DivsDosConteudos";
import EstoqueRelatorio from "../components/relatorios/EstoqueRelatorio.jsx";
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
            <h1 className="text-light mb-4">Relatórios</h1>
            {!showListaMenu && (
                <button className=""
                    onClick={() => setShowListaMenu(true)}>Voltar</button>
            )}
            {showListaMenu && (
                <section className="container d-flex gap-3">
                    <button
                        className="btn btn-relatorio text-light p-2 shadow"
                        onClick={() => handleSecaoAtiva("estoque-relatorio")}
                    >
                        <p>Relatório do estoque</p>
                    </button>
                    <button
                        className="btn btn-relatorio text-light p-2 shadow"
                        onClick={() => handleSecaoAtiva("estoque-relatorio")}
                    >
                        <p>Sendo feito</p>
                    </button>
                    <button
                        className="btn btn-relatorio text-light p-2 shadow"
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
