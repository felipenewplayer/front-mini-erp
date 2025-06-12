import { useState, useEffect } from "react";
import { getTransacao } from "../../../services/transacaoService";
export default function useTransacao() {
    const [transacoes, setTransacoes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTransacoes = async () => {
            try {
                const { data } = await getTransacao();
                setTransacoes(data);
            } catch (errr) {
                setError("Não foi possível carregar as transações", errr);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTransacoes();
    }, []);

    return (
        { transacoes, setTransacoes, isLoading, setIsLoading, error, setError }
    )
}