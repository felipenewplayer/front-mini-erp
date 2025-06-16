import { useEffect, useState } from "react"
import { useVendas } from "../context/VendasContext";
import { toast } from "react-toastify";

export default function useVenda() {
    const [venda, setVendas] = useState();
    const { getVendas } = useVendas();

    useEffect(() => {
        try {
            const dados = getVendas();
            if (!dados) {
                toast.error("Não foi possível carregar os produtos do localStorage.")
            }

            else {
                setVendas(dados);
            }
        } catch (err) {
            toast.error("Erro ao acessar o localStorage.", err)}
        }, [])
    return {venda, setVendas}
}