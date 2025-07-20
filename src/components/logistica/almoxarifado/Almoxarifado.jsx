import { useState } from "react"
import Estoque from "./estoque/Estoque";
import "../almoxarifado/Almoxarifado.css"
export default function Almoxarifado() {
    const [abaAtiva, setAbaAtiva] = useState("");

    return (
        <>
            <div className="border-bottom border-top d-flex align-items-center  rounded"
                style={{ background: "linear-gradient(to left,var(--gray-30),var(--gray-60))" }}>

                <button
                    className=" botao-custom "
                    onClick={() => setAbaAtiva(abaAtiva === "estoque" ? "" : "estoque")}>
                    Estoque
                </button>
                <button
                    className=" botao-custom"
                    onClick={() => setAbaAtiva(abaAtiva === "inventario" ? "" : "inventario")}>
                    Inventário
                </button>
                <button
                    className="  botao-custom"
                    onClick={() => setAbaAtiva(abaAtiva === "entrada" ? "" : "entrada")}>
                    Entrada
                </button>
                <button
                    className=" botao-custom"
                    onClick={() => setAbaAtiva(abaAtiva === "saida" ? "" : "saida")}>
                    Saída
                </button>
            </div>

            <section className="p-3">
                {abaAtiva === "estoque" && <Estoque />}
                {abaAtiva === "inventario" && <p>Inventário ainda em construção</p>}
                {abaAtiva === "entrada" && <p>Entrada de materiais ainda em construção</p>}
                {abaAtiva === "saida" && <p>Saída de materiais ainda em construção</p>}
            </section>
        </>
    )
}
