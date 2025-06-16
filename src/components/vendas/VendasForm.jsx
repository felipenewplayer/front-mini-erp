import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useClientes } from "../context/ClienteContext";
import { useEffect, useState } from "react";
import { useProduto } from "../context/ProdutoContext";
import { vendaSchema } from "../schemas/vendaSchema"


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

    useEffect(() => {
        setProdutos(getProdutos());
        setClientes(getClientes());
    }, []);

    const handleAdicionar = (data) => {
        const clienteSelecionado = clientes.find(c => c.id === data.cliente);
        const produto = produtos.find(p => p.id === data.produtoId);

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
        });
    };
    return (
        <form onSubmit={handleSubmit(handleAdicionar)} className="p-3 shadow border rounded">
            <div className="mb-3">
                <label className="form-label">Cliente</label>
                <select className="form-select  w-50"{...register("cliente")}>
                    <option value="">Selecione</option>
                    {clientes.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.nome}
                        </option>
                    ))}
                </select>
                {errors.cliente && <p className="text-danger">{errors.cliente.message}</p>}
            </div>

            <div className="mb-3">
                <label className="form-label">Produto</label>
                <select className="form-select w-50" {...register("produtoId")}>
                    <option value="">Selecione</option>
                    {produtos.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.nome}
                        </option>
                    ))}
                </select>
                {errors.produtoId && <p className="text-danger">{errors.produtoId.message}</p>}
            </div>

            {produtoSelecionado && (
                <div className="mb-3">
                    <label className="form-label">Quantidade</label>
                    <input
                        type="number"
                        className="form-control w-25"
                        {...register("quantidade")}
                        min={1}
                        max={produtoSelecionado.quantidade}
                        placeholder={`Máx: ${produtoSelecionado.quantidade}`}
                    />
                    {errors.quantidade && (
                        <p className="text-danger">{errors.quantidade.message}</p>
                    )}
                </div>

            )}
            <div>
                <label className="form-label">Data da Venda</label>
                <input type="date" className="p-1 rounded form-control w-25 mb-2" />
            </div>

            <button className="btn btn-success" type="submit">
                Adicionar ao pedido
            </button>
        </form>
    );
}
