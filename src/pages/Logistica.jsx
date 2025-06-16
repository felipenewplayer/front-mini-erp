import { useState } from "react";
import DivsDosConteudos from "../components/DivsDosConteudos";
import Almoxarifado from "../components/logistica/almoxarifado/Almoxarifado";
import Expedicao from "../components/logistica/expedicao/Expedicao";
import Recebimento from "../components/logistica/recebimento/Recebimento";
import { FaReceipt, FaWarehouse } from "react-icons/fa";
import "../components/logistica/logistica.css"
import { TbTruckDelivery } from "react-icons/tb";
export default function Logistica() {
  const [abaAtiva, setAbaAtiva] = useState("");

  return (
    <DivsDosConteudos>
      <nav className="d-flex gap-3 mb-3 botoes-logistica flex-wrap">        <button className="bnt rounded text-light" onClick={() => setAbaAtiva(abaAtiva === "almoxarifado" ? "" : "almoxarifado")}
        style={{ background: "linear-gradient(to right, var(--red-30), var(--yellow-80))" }}>
        Almoxarifado  <FaWarehouse className="ms-2" />
      </button>
        <button className="bnt rounded bg-primary text-light" onClick={() => setAbaAtiva(abaAtiva === "expedicao" ? "" : "expedicao")}
          style={{ background: "linear-gradient(to right, var(--blue-30), var(--purple-80))" }}>
          Expedição <TbTruckDelivery className="ms-2" />
        </button>
        <button className="bnt rounded bg-danger text-light" onClick={() => setAbaAtiva(abaAtiva === "recebimento" ? "" : "recebimento")}
          style={{ background: "linear-gradient(to right, var(--green-40), var(--teal-80))" }}>
          Recebimento< FaReceipt className="ms-2" />
        </button>
      </nav>

      {abaAtiva === "almoxarifado" && <Almoxarifado />}
      {abaAtiva === "expedicao" && <Expedicao />}
      {abaAtiva === "recebimento" && <Recebimento />}
    </DivsDosConteudos>
  );
}
