import { useState } from "react";
import DivsDosConteudos from "../components/DivsDosConteudos";
import EstoqueRelatorio from "../components/relatorios/RelatorioEstoque.jsx";
import "../components/relatorios/Relatorios.css";
import RelatorioVendas from "../components/relatorios/RelatorioVendas.jsx";
import RelatorioClientes from "../components/relatorios/RelatorioClientes.jsx";

export default function Relatorios() {
    const [showListaMenu, setShowListaMenu] = useState(true);
    const [secaoAtiva, setSecaoAtiva] = useState(null);

    const handleSecaoAtiva = (secao) => {
        setSecaoAtiva(secao);
        setShowListaMenu(false); // Esconde o menu após clicar (opcional)
    };

    return (
        <DivsDosConteudos
            title="Relatórios">
            <div
                style={{ height: "100%" }}>
                {!showListaMenu && (
                    <div className="d-flex gap-5">
                        <button className="btn btn-sm ms-3 mb-2  rounded shadow  p-2"
                            style={{ background: "linear-gradient(to right, var(--orange-10), var(--orange-30))" }}
                            onClick={() => setShowListaMenu(true)}>Voltar</button>
                    </div>

                )}
                {showListaMenu && (
                    <section className="me-5 container d-flex  gap-2">
                        <button
                            className="btn btn-relatorio  text-light  shadow"
                            onClick={() => handleSecaoAtiva("estoque-relatorio")}
                        >
                            <p>Relatório do estoque</p>
                        </button>
                        <button
                            className="btn btn-relatorio text-light shadow"
                            onClick={() => handleSecaoAtiva("clientes-relatorio")}
                        >
                            <p>Relatório de clientes</p>
                        </button>
                        <button
                            className="btn btn-relatorio text-light shadow"
                            onClick={() => handleSecaoAtiva("vendas-relatorio")}
                        >
                            <p>Relatório de vendas</p>
                        </button>
                    </section>
                )}
                {!showListaMenu && (
                    <>
                        {secaoAtiva === "estoque-relatorio" && <EstoqueRelatorio />}
                        {secaoAtiva === "clientes-relatorio" && <RelatorioClientes />}
                        {secaoAtiva === "vendas-relatorio" &&
                            <RelatorioVendas />}
                    </>
                )}
            </div>

        </DivsDosConteudos>
    )
}
