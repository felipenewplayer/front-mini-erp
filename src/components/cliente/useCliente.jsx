import { useEffect, useState } from "react";
import { useClientes } from "../context/ClienteContext";
import { toast } from "react-toastify";

export default function useCliente() {
    const [clientes, setClientes] = useState();
    const { getClientes } = useClientes();
    const [error, setError] = useState();

    useEffect(() => {
            try {
                const data = getClientes()
                if (!data) {
                    setError("Não foi possível carregar os produtos do localStorage.");
                }
                setClientes(data);
            } catch (error) {
                toast.error(error.message || "Erro ao buscar clientes");
            }
    }, []);
    return {error, clientes, setClientes}
}