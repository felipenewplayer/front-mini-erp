import { useState, useEffect } from "react";
// import { getProdutos } from "../../../services/produtoService";
import { useUser } from "../../../../context/UserContext";
export default function useProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const { getProdutosLocal } = useUser();

    // Esse useEffect é para usar com a API
    // useEffect(() => {
    //     const fetchProdutos = async () => {
    //         try {
    //             const { data } = await getProdutos();
    //             setProdutos(data);
    //         } catch (err) {
    //             setError("Erro ao carregar produtos", err);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchProdutos();
    // }, []);


    useEffect(() => {
        try {
            const dados = getProdutosLocal();
            if (!dados) {
                setError("Não foi possível carregar os produtos do localStorage.");
            } else {
                setProdutos(dados);
            }
        } catch (err) {
            setError("Erro ao acessar o localStorage.",err);
        } finally {
            setIsLoading(false);
        }
    }, []);
    return { produtos, setProdutos, isLoading, setIsLoading, error };
}