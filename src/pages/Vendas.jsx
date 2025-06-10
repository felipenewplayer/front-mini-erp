import { useState } from "react";
import DivsDosConteudos from "../components/DivsDosConteudos";
import VendasForm from "../components/vendas/VendasForm.jsx";

export default function Vendas() {
    const [showFormVendas, setShowFormVendas] = useState(false);
    return (
        <DivsDosConteudos>
            <h2 className="text-light m-3">Pedidos de Venda</h2>

            <div className="m-3">
                <button 
                className="btn btn-success"
                onClick={() => setShowFormVendas(!showFormVendas)}>{showFormVendas ?"Cancelar":"Adicionar pedido"}</button>
            </div>
            {showFormVendas && (
                <VendasForm />

            )}
        </DivsDosConteudos>
    )
}