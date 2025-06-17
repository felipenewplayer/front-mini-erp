import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useUser = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("usuario_logado");
    if (user) setUsuario(JSON.parse(user));
  }, []);

  const login = (email, senha) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios_cadastrados")) || [];
    const user = usuarios.find(u => u.email === email && u.senha === senha);
    if (user) {
      setUsuario(user);
      localStorage.setItem("usuario_logado", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const cadastrar = (novoUsuario) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios_cadastrados")) || [];
    if (usuarios.some(u => u.email === novoUsuario.email)) return false;
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios_cadastrados", JSON.stringify(usuarios));
    login(novoUsuario.email, novoUsuario.senha);
    return true;
  };

  const logOut = () => {
    localStorage.removeItem("usuario_logado");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, cadastrar, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
