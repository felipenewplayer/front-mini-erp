import Estoque from "./Estoque";
import Financeiro from "./Financeiro";
import Logistica from "./Logistica";
import Compras from "./Compras";
import Cliente from "./Cliente";
import Relatorios from "./Relatorios";
import { useState } from "react";

export default function Menu() {
    const [secaoAtiva, setSecaoAtiva] = useState(null);

    const fecharOverlay = () => setSecaoAtiva(null);
    return (
        <>
            <section className="container d-flex flex-wrap gap-3 p-3 mt-5 align-items-center justify-content-center 
            border border-dark">
                <button className="btn btn-light fs-2" onClick={() => setSecaoAtiva("estoque")}>Estoque</button>
                <button className="btn btn-light fs-2" onClick={() => setSecaoAtiva("financeiro")}>Financeiro</button>
                <button className="btn btn-light fs-2" onClick={() => setSecaoAtiva("cliente")}>Clientes</button>
                <button className="btn btn-light fs-2" onClick={() => setSecaoAtiva("logistica")}>Logistica</button>
                <button className="btn btn-light fs-2" onClick={() => setSecaoAtiva("compras")}>Compras</button>
                <button className="btn btn-light fs-2" onClick={() => setSecaoAtiva("relatorios")}>Relatorios</button>
            </section>

            {secaoAtiva && (
                <div
                    style={{
                        position: "fixed",
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.7)",
                        color: "#fff",
                        zIndex: 9999,
                        overflowY: "auto",
                        padding: "20px",
                    }}
                >
                    <button

                        className="btn btn-danger ms-3 p-3 "
                        onClick={fecharOverlay}
                    >
                        Fechar
                    </button>

                    {secaoAtiva === "estoque" && <Estoque />}
                    {secaoAtiva === "financeiro" && <Financeiro />}
                    {/* {secaoAtiva === "logistica" && <Logistica />}
                    {secaoAtiva === "compras" && <Compras />} */}
                    {secaoAtiva === "cliente" && <Cliente />}
                    {/* {secaoAtiva === "relatorios" && <Relatorios />} */}
                </div>
            )}
        </>
    );
}