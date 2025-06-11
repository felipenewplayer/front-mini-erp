import { toast } from "react-toastify";
import { useUser } from "../UserContext";

export default function AcessoRole() {
    const { usuario } = useUser();

    if (!usuario) {
        return <p>Não tem acesso. Faça login para acessa.</p>
    }

    return (
        <div>
            <p>Acesso baseado no seu role: <strong>{usuario.role}</strong></p>
            {usuario.role === "admin" && toast.success("Você é Admin, tem acesso total!")}
            {usuario.role === "logistica" && <p>Você é Logística.</p>}
            {usuario.role === "vendas" && <p>Você é Vendas.</p>}
        </div>

    )
}