import { useUser } from "../UserContext";


export default function AdminApenas(){
    const {usuario} = useUser();

    if(!usuario || usuario.role !== "admin"){
        return <p>Acesso negado. Você não tem permissão para acessar aqui.</p>
    }

    return <div>Conteúdo exclusivo para Admin.</div>;
}