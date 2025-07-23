import { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

const ClienteContext = createContext();
export function useClientes() {

  const context = useContext(ClienteContext);
  if (!context) {
    throw new Error("useClientes deve ser usado dentro de ClienteProvider");
  }
  return context;
}

export function ClienteProvider({ children }) {
  const [clientes, setClientes] = useState();
  const [loading, setLoading] = useState(true);

  const carregarClientes = async () => {
    setLoading();
    try {
      const querySnapshot = await getDocs(collection(db, "clientes"));
      const listClientes = [];
      querySnapshot.forEach((doc) => {
        listClientes.push({ id: doc.id, ...doc.data() });
      });
      setClientes(listClientes);
      return listClientes;
    } catch (error) {
      toast.error("Não foi possível carregar os dados!", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  const addCliente = async (cliente) => {
    try {
      const q = query(
        collection(db, "clientes"),
        where("nome", "==", cliente.nome)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return false;
      }
      const docRef = await addDoc(collection(db, "clientes"), cliente);
      setClientes((prev) => [...prev, { id: docRef.id, ...cliente }]);
      return true;
    } catch (error) {
      toast.error("Erro ao adicionar cliente:", error);
      return false;
    }
  }

  const updateCliente = async (cliente) => {
    try {
      const clienteRef = doc(db, "clientes", cliente.id);
      await updateDoc(clienteRef, cliente);
      setClientes((prev) => prev.map((p) => (p.id === cliente.id ? cliente : p)));
    } catch (error) {
      toast.error("Erro ao atualizar cliente:", error);
    }
  };

  const deletarCliente = async (id) => {
    try {
      const clienteRef = doc(db, "clientes", id);
      await deleteDoc(clienteRef);
      setClientes((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      toast.error("Erro ao deletar cliente!", error);
    }
  }

  return (
    <ClienteContext.Provider value={{ clientes, loading, carregarClientes, addCliente, updateCliente, deletarCliente }}>
      {children}
    </ClienteContext.Provider>
  );
}
