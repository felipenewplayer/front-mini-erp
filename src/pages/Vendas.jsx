import { useState, useEffect } from "react";
import DivsDosConteudos from "../components/DivsDosConteudos";
import { FaCartShopping } from "react-icons/fa6";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import VendasForm from "../components/vendas/VendasForm";
import VendasListaClientes from "../components/vendas/VendasListaClientes";
import { useVendas } from "../components/context/VendasContext";
import "../components/vendas/vendas.css"
export default function Vendas() {
    const [abaAberta, setAbaAberta] = useState("");
    const [vendas, setVendas] = useState([]);
    const { addVendas } = useVendas();

    // Atualiza o estado de vendas toda vez que o componente monta ou que a aba mudar, para atualizar a lista e totais
    useEffect(() => {
        const vendasDoStorage = JSON.parse(localStorage.getItem("vendas")) || [];
        setVendas(vendasDoStorage);
    }, []);

    const handleSubmitPedido = (pedido) => {
        addVendas(pedido);
        setAbaAberta("");
        // Atualiza as vendas após adicionar
        const vendasDoStorage = JSON.parse(localStorage.getItem("vendas")) || [];
        setVendas(vendasDoStorage);
    };

    // Calcula os totais dinamicamente
    const totalVendas = vendas.reduce((acc, venda) => {
        const total = (venda.produto?.precoUN || 0) * (venda.quantidade || 0);
        return acc + total;
    }, 0);


    const vendasHoje = vendas.reduce((acc, venda) => {
        const hoje = new Date().toISOString().slice(0, 10);
        const dataVenda = venda.dataVenda?.slice(0, 10) || venda.produto?.
            dataEntrada?.slice(0, 10);
        if (dataVenda === hoje) {
            const total = (venda.produto?.precoUN || 0) * (venda.quantidade || 0);
            return acc + total;
        }
        return acc;
    }, 0);

    return (
        <DivsDosConteudos>
            <div className="row text-light g-4">
                <section className="vendas-hoje entrada-slide col-12 col-sm-6 col-lg-3 bg-primary pt-1 rounded d-flex justify-content-around align-items-center">
                    <div className="d-flex flex-column align-items-center">
                        <strong>R$ {Number(vendasHoje).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
                        <p>Vendas Hoje</p>
                    </div>
                    <div className="fs-3">
                        <FaCartShopping />
                    </div>
                </section>

                <section className="vendas-total entrada-slide col-12 col-sm-6 col-lg-3 bg-success pt-1 rounded d-flex justify-content-around align-items-center">
                    <div className="d-flex flex-column align-items-center">
                        <strong>R$ {Number(totalVendas).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
                        <p>Total Vendas</p>
                    </div>
                    <div className="fs-3">
                        <HiDocumentReport />
                    </div>
                </section>

                <section className="receber-hoje entrada-slide col-12 col-sm-6 col-lg-3 bg-warning pt-1 rounded d-flex justify-content-around align-items-center">
                    <div className="d-flex flex-column align-items-center">
                        <strong>R$ {Number(0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
                        <p>A Receber Hoje</p>
                    </div>
                    <div className="fs-3">
                        <FaThumbsUp />
                    </div>
                </section>

                <section className="pagar-hoje entrada-slide  col-12 col-sm-6 col-lg-3 bg-danger pt-1 rounded d-flex justify-content-around align-items-center">
                    <div className="d-flex flex-column align-items-center">
                        <strong>R$ {Number(0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
                        <p>A Pagar Hoje</p>
                    </div>
                    <div className="fs-3">
                        <FaThumbsDown />
                    </div>
                </section>
            </div>

            <div className="mt-4 d-flex gap-3 mb-3">
                <button
                    className="btn btn-success btn-sm"
                    onClick={() => setAbaAberta("pedido")}
                >
                    Adicionar pedido
                </button>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setAbaAberta("clientes")}
                >
                    Clientes
                </button>
            </div>

            {abaAberta === "pedido" && <VendasForm onSubmit={handleSubmitPedido} />}
            {abaAberta === "clientes" && <VendasListaClientes />}
        </DivsDosConteudos>
    );
}
