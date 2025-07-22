import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase"; // ajuste o caminho para o seu arquivo de config Firebase
import { toast } from "react-toastify";

const ProdutoContext = createContext();
export const useProduto = () => useContext(ProdutoContext);

export const ProdutoProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para carregar produtos do Firestore
  const carregarProdutos = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "produtos"));
      const listaProdutos = [];
      querySnapshot.forEach((doc) => {
        listaProdutos.push({ id: doc.id, ...doc.data() });
      });
      setProdutos(listaProdutos);
      return listaProdutos;
    } catch (error) {
      toast.error("Erro ao carregar produtos:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    carregarProdutos();
  }, []);

  // Adicionar produto (verifica nome duplicado)
  const addProduto = async (produto) => {
    try {
      // Verifica se já existe produto com mesmo nome
      const q = query(
        collection(db, "produtos"),
        where("nome", "==", produto.nome)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return false; // já existe
      }

      const docRef = await addDoc(collection(db, "produtos"), produto);
      setProdutos((prev) => [...prev, { id: docRef.id, ...produto }]);
      return true;
    } catch (error) {
      toast.error("Erro ao adicionar produto:", error);
      return false;
    }
  };

  // Atualizar produto
  const updateProduto = async (produto) => {
    try {
      const produtoRef = doc(db, "produtos", produto.id);
      await updateDoc(produtoRef, produto);
      setProdutos((prev) =>
        prev.map((p) => (p.id === produto.id ? produto : p))
      );
    } catch (error) {
      toast.error("Erro ao atualizar produto:", error);
    }
  };

  // Deletar produto
  const deleteProduto = async (id) => {
    try {
      const produtoRef = doc(db, "produtos", id);
      await deleteDoc(produtoRef);
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      toast.error("Erro ao deletar produto:", error);
    }
  };

  return (
    <ProdutoContext.Provider
      value={{
        produtos,
        loading,
        carregarProdutos,
        addProduto,
        updateProduto,
        deleteProduto,
      }}
    >
      {children}
    </ProdutoContext.Provider>
  );
};
