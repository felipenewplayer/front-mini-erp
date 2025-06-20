import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useClientes } from "../context/ClienteContext";
import { useEffect, useState } from "react";
import { useProduto } from "../context/ProdutoContext";
import { vendaSchema } from "../schemas/vendaSchema";
import { FaCartPlus } from "react-icons/fa";

export default function VendasForm({ onSubmit }) {
  const { getClientes } = useClientes();
  const { updateProduto, getProdutos } = useProduto();
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(vendaSchema),
  });

  const produtoIdSelecionado = watch("produtoId");
  const produtoSelecionado = produtos.find(
    (p) => p.id === parseInt(produtoIdSelecionado)
  );
  console.log("produtoSelecionado é ...", produtoIdSelecionado);

  useEffect(() => {
    setProdutos(getProdutos());
    setClientes(getClientes());
  }, []);

  const handleAdicionar = (data) => {
    const clienteSelecionado = clientes.find((c) => c.id === data.cliente);
    const produto = produtos.find((p) => p.id === data.produtoId);

    if (!clienteSelecionado || !produto) {
      alert("Cliente ou produto inválido.");
      return;
    }

    if (produto.quantidade < data.quantidade) {
      alert(`Estoque insuficiente! Disponível: ${produto.quantidade}`);
      return;
    }

    const produtoAtualizado = {
      ...produto,
      quantidade: produto.quantidade - data.quantidade,
    };

    updateProduto(produtoAtualizado);
    setProdutos(getProdutos());

    onSubmit({
      cliente: clienteSelecionado,
      produto: produtoAtualizado,
      quantidade: data.quantidade,
      dataVenda: data.dataVenda,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleAdicionar)}
      className="p-4 shadow border rounded bg-light"
      style={{ maxWidth: 500, margin: "auto" }}
      noValidate
    >
      <h3 className="mb-4 text-center">Adicionar Venda</h3>

      {/* Cliente */}
      <div className="mb-4">
        <label htmlFor="cliente" className="form-label fw-semibold">
          Cliente
        </label>
        <select
          id="cliente"
          className={`form-select ${errors.cliente ? "is-invalid" : ""}`}
          {...register("cliente")}
          defaultValue=""
          aria-describedby="clienteHelp"
        >
          <option value="" disabled>
            Selecione um cliente
          </option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>
        {errors.cliente && (
          <div className="invalid-feedback">{errors.cliente.message}</div>
        )}
      </div>

      {/* Produto */}
      <div className="mb-4">
        <label htmlFor="produtoId" className="form-label fw-semibold">
          Produto
        </label>
        <select
          id="produtoId"
          className={`form-select ${errors.produtoId ? "is-invalid" : ""}`}
          {...register("produtoId")}
          defaultValue=""
          aria-describedby="produtoHelp"
        >
          <option value="" disabled>
            Selecione um produto
          </option>
          {produtos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>
        {errors.produtoId && (
          <div className="invalid-feedback">{errors.produtoId.message}</div>
        )}
      </div>

      {/* Quantidade */}
      {produtoSelecionado && (
        <div className="mb-4">
          <label htmlFor="quantidade" className="form-label fw-semibold">
            Quantidade
          </label>
          <input
            id="quantidade"
            type="number"
            className={`form-control ${errors.quantidade ? "is-invalid" : ""}`}
            {...register("quantidade")}
            min={1}
            max={produtoSelecionado.quantidade}
            placeholder={`Máx: ${produtoSelecionado.quantidade}`}
            aria-describedby="estoqueHelp"
          />
          {errors.quantidade && (
            <div className="invalid-feedback">{errors.quantidade.message}</div>
          )}
          <small id="estoqueHelp" className="text-muted">
            Estoque disponível: {produtoSelecionado.quantidade}
          </small>
        </div>
      )}

      {/* Data da Venda */}
      <div className="mb-4">
        <label htmlFor="dataVenda" className="form-label fw-semibold">
          Data da Venda
        </label>
        <input
          id="dataVenda"
          type="date"
          className={`form-control ${errors.dataVenda ? "is-invalid" : ""}`}
          {...register("dataVenda")}
          max={new Date().toISOString().split("T")[0]} // evita datas futuras
        />
        {errors.dataVenda && (
          <div className="invalid-feedback">{errors.dataVenda.message}</div>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-success w-100 fw-semibold d-flex justify-content-center align-items-center gap-2"
      >
        <FaCartPlus /> Adicionar ao pedido
      </button>
    </form>
  );
}
