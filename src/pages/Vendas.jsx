import { FaSearch } from "react-icons/fa";
import DivsDosConteudos from "../components/DivsDosConteudos";

export default function Vendas() {
    return (
        <DivsDosConteudos>
            <h2 className="text-light">Pedido de Venda</h2>
            <form
                className=" mt-1 pt-1 d-flex flex-column ps-3 list-container overflow-auto gap-3"
                style={{ maxHeight: 675 }}>
                <div className="d-flex flex-column gap-3 justify-content-around ">
                    <div className="d-flex flex-column">
                        <label className="form-label">Orçamento</label>
                        <div className="d-flex align-items-center w-50">
                            <input
                                className="form-control me-2"
                                type="number"
                                placeholder="Informe o número do orçamento"
                            />
                            <FaSearch />
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <label className="form-label">Vendedor</label>
                        <select className="w-50 p-1 rounded">
                            <option value="">João</option>
                            <option value="">Marcos</option>
                            <option value="">Rafa</option>
                        </select>
                    </div>
                    <div className="d-flex flex-column">
                        <label className="form-label">Número da fatura</label>
                        <input
                            className="w-25 rounded"
                            type="number" />
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-around">
                    <div className="d-flex flex-column">
                        <label className="form-label">Cliente</label>
                        <div className="d-flex align-items-center">
                            <input className="form-control me-2 w-50" type="number" />
                            <FaSearch />
                        </div>
                    </div>

                    <div className="d-flex flex-column">
                        <label className="form-label mt-3 ">Data Venda</label>
                        <input
                            className="w-25 rounded  ps-2"
                            type="date" />

                        <label className="form-label mt-3">Data Saída</label>
                        <input
                            className="w-25 rounded  ps-2"
                            type="date" />


                        <label className="form-label mt-3">Hora  Saída</label>
                        <input
                            className="w-25 rounded ps-1"
                            type="hour" />
                    </div>
                    <div className="d-flex flex-column">
                        <label className="form-label ">Situação</label>
                        <input
                            className="w-50"
                            type="number" />
                    </div>
                </div>

                <div className="d-flex flex-column gap-3 justify-content-around ">
                    <div className="d-flex flex-column">
                        <label className="form-label">Frete</label>
                        <div className="d-flex align-items-center w-50">
                            <select className="p-1">
                                <option >Por conta do cliente</option>
                            </select>
                            <FaSearch />
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <label className="form-label">Transportadora</label>
                        <select className="w-50 p-1">
                            <option value="">TW TRANSPORTADORA E LOGISTICA LTDA</option>
                            <option value="">SAIRUS BRASIL LTDA</option>
                            <option value="">TRANVIASUL</option>
                            <option value="">NORTE TRANSPORTE</option>
                        </select>
                    </div>
                    <div className="d-flex flex-column">
                        <label className="form-label">Valor Frete</label>
                        <input
                            className="w-25 rounded"
                            type="number" />
                    </div>
                </div>


            </form>
        </DivsDosConteudos>
    )
}