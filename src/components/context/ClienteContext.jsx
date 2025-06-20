import { createContext, useContext, useState, useEffect } from "react";

export const ClienteContext = createContext();
const CLIENTES_INICIAIS = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 99999-9999",
    endereco: "Rua das Flores, 123",
    estado: "SP",
    cidade: "São Paulo",
  },
  {
    id: 2,
    nome: "Maria Souza",
    email: "maria.souza@email.com",
    telefone: "(21) 98888-8888",
    endereco: "Av. Brasil, 456",
    estado: "RJ",
    cidade: "Rio de Janeiro",
  },
];
export function useClientes() {

  const CLIENTES_INICIAIS = [
    {
      id: 1,
      nome: "João Silva",
      email: "joao.silva@email.com",
      telefone: "(11) 99999-9999",
      endereco: "Rua das Flores, 123",
      estado: "SP",
      cidade: "São Paulo",
    },
    {
      id: 2,
      nome: "Maria Souza",
      email: "maria.souza@email.com",
      telefone: "(21) 98888-8888",
      endereco: "Av. Brasil, 456",
      estado: "RJ",
      cidade: "Rio de Janeiro",
    },
  ];
  const context = useContext(ClienteContext);
  if (!context) {
    throw new Error("useClientes deve ser usado dentro de ClienteProvider");
  }
  return context;
}

export function ClienteProvider({ children }) {
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  // Função para pegar clientes do localStorage
  const getClientes = () => JSON.parse(localStorage.getItem("clientes")) || [];

  // Inicializa localStorage com dados padrões, se estiver vazio
  useEffect(() => {
    const clientes = getClientes();
    if (!clientes || clientes.length === 0) {
      localStorage.setItem("clientes", JSON.stringify(CLIENTES_INICIAIS));
    }
  }, []);

  const addCliente = (novoCliente) => {
    const clientes = getClientes();
    if (clientes.some(c => c.nome === novoCliente.nome)) return null;

    const clienteComId = { ...novoCliente, id: Date.now() };
    const novosClientes = [...clientes, clienteComId];
    localStorage.setItem("clientes", JSON.stringify(novosClientes));

    return clienteComId;
  };

  const atualizarCliente = (clienteAtualizado) => {
    const clientes = getClientes();
    const atualizados = clientes.map(c => c.id === clienteAtualizado.id ? clienteAtualizado : c);
    localStorage.setItem("clientes", JSON.stringify(atualizados));
  };

  const deletarCliente = (id) => {
    const clientes = getClientes().filter(c => c.id !== id);
    localStorage.setItem("clientes", JSON.stringify(clientes));
  };

  return (
    <ClienteContext.Provider value={{ getClientes, addCliente, atualizarCliente, deletarCliente, clienteSelecionado, setClienteSelecionado }}>
      {children}
    </ClienteContext.Provider>
  );
}
