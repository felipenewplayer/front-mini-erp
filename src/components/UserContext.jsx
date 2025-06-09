import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioLogado = localStorage.getItem("usuario_logado");
        if (usuarioLogado) {
            setUsuario(JSON.parse(usuarioLogado));
        }
    }, []);

    const cadastrar = (novoUsuario) => {
        const usuarios = JSON.parse(localStorage.getItem("usuarios_cadastrados")) || [];

        const emailJaExiste = usuarios.some(u => u.email === novoUsuario.email);
        if (emailJaExiste) return false;

        usuarios.push(novoUsuario);
        localStorage.setItem("usuarios_cadastrados", JSON.stringify(usuarios));
        localStorage.setItem("usuario_logado", JSON.stringify(novoUsuario));
        setUsuario(novoUsuario);
        return true;
    };

    const logOut = () => {
        localStorage.removeItem("usuario_logado");
        setUsuario(null);
    };

    const login = (email, senha) => {
        const usuarios = JSON.parse(localStorage.getItem("usuarios_cadastrados")) || [];
        const usuarioEncontrado = usuarios.find(
            u => u.email === email && u.senha === senha
        );

        if (usuarioEncontrado) {
            localStorage.setItem("usuario_logado", JSON.stringify(usuarioEncontrado));
            setUsuario(usuarioEncontrado);
            return true;
        }
        return false;
    };

    return (
        <UserContext.Provider value={{ usuario, login, cadastrar, logOut }}>
            {children}
        </UserContext.Provider>
    );
};
