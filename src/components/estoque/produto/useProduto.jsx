import { useState, useEffect } from "react";
import { getProdutos } from "../../../services/produtoService";
export default function useProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const { data } = await getProdutos();
                setProdutos(data);
            } catch (err) {
                setError("Erro ao carregar produtos", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProdutos();
    }, []);
    return { produtos, setProdutos, isLoading, setIsLoading, error };
}