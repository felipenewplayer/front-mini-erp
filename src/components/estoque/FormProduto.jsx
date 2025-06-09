import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { produtoSchema } from "./ProdutoSchema"
import { useEffect } from "react"

export default function FormProduto({
    defaultValues,
    onHandleSubmit
}) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(produtoSchema), defaultValues
    })
    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    return (
        <form className="card p-3 mb-4" onSubmit={handleSubmit(onHandleSubmit)}>
            <div className="mb-2">
                <label className="form-label">Nome</label>
                <input
                    className="form-control"
                    {...register("nome")}
                />
                {errors.nome && <span className="text-danger">{errors.nome.message}</span>}
            </div>
            <div className="mb-2">
                <label className="form-label">Preço</label>
                <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    {...register("preco")}
                />
                {errors.preco && <span className="text-danger">{errors.preco.message}</span>}
            </div>
            <div className="mb-2">
                <label className="form-label">Quantidade</label>
                <input
                    className="form-control"
                    type="number"
                    {...register("estoque.quantidade")}
                />
                {errors.estoque?.quantidade && <span className="text-danger">{errors.estoque.quantidade.message}</span>}
            </div>
            <button type="submit" className="btn btn-success mt-3">
                Salvar Produto
            </button>
        </form>
    )
}