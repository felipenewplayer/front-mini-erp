import Estoque from "./Estoque";
import Financeiro from "./Financeiro";
import Logistica from "./Logistica";
import Compras from "./Compras";
import CRM from "./CRM";
import Relatorios from "./Relatorios";
import { useState } from "react";
export default function Menu() {
    const [secaoAtiva, setSecaoAtiva] = useState(null);
    
    const fecharOverlay = () => setSecaoAtiva(null);
    return (
        <>
            <section className="container d-flex gap-3 p-3 mt-5 border border-primary justify-content-center">
                <button className="btn btn-light" onClick={() => setSecaoAtiva("estoque")}>Estoque</button>
                <button className="btn btn-light" onClick={() => setSecaoAtiva("financeiro")}>Financeiro</button>
                <button className="btn btn-light" onClick={() => setSecaoAtiva("logistica")}>Logistica</button>
                <button className="btn btn-light" onClick={() => setSecaoAtiva("compras")}>Comras</button>
                <button className="btn btn-light" onClick={() => setSecaoAtiva("crm")}>CRM</button>
                <button className="btn btn-light" onClick={() => setSecaoAtiva("relatorios")}>Relatorios</button>
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
                        className="btn btn-danger mb-3"
                        onClick={fecharOverlay}
                    >
                        Fechar
                    </button>

                    {secaoAtiva === "estoque" && <Estoque />}
                    {secaoAtiva === "financeiro" && <Financeiro />}
                    {secaoAtiva === "logistica" && <Logistica />}
                    {secaoAtiva === "compras" && <Compras />}
                    {secaoAtiva === "crm" && <CRM />}
                    {secaoAtiva === "relatorios" && <Relatorios />}
                </div>
            )}
        </>
    );
}