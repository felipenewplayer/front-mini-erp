import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { produtoSchema } from "./ProdutoSchema";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";


export default function FormProduto({ defaultValues, onHandleSubmit, onCancel }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm({
        resolver: zodResolver(produtoSchema),
        defaultValues,

    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    return (

        <form className="card p-3 mb-4 gap-3" onSubmit={handleSubmit(onHandleSubmit)}>
             <button
                type="button"
                className="btn btn-secondary mt-2 w-25"
                onClick={onCancel}
            >
                Voltar
            </button>
            {/* Nome */}
            <div className="mb-2">
                <label className="form-label">Nome</label>
                <input className="form-control" {...register("nome")} />
                {errors.nome && <span className="text-danger">{errors.nome.message}</span>}
            </div>

            {/* Código / SKU */}
            <div className="mb-2">
                <label className="form-label">Código do Produto / SKU</label>
                <input className="form-control" {...register("codigo")} />
                {errors.codigo && <span className="text-danger">{errors.codigo.message}</span>}
            </div>

            {/* Categoria */}
            <div className="mb-2">
                <label className="form-label">Categoria</label>
                <select className="form-select" {...register("categoria")}>
                    <option value="">Selecione...</option>
                    <option value="CONSOLE">Console</option>
                    <option value="MONITOR">Monitor</option>
                    <option value="MOUSE">Mouse</option>
                    <option value="TECLADO">Teclado</option>
                    <option value="PROCESSADOR">Processador</option>
                </select>
                {errors.categoria && <span className="text-danger">{errors.categoria.message}</span>}
            </div>

            {/* Preço */}
            {/* Preço */}
            <div className="mb-2">
                <label className="form-label">Preço</label>
                <Controller
                    name="precoUN"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                            <NumericFormat
                                className="form-control"
                                value={value}
                                decimalSeparator=","
                                thousandSeparator="."
                                prefix="R$ "
                                decimalScale={2}
                                fixedDecimalScale
                                allowNegative={false}
                                onValueChange={({ floatValue }) => onChange(floatValue || 0)}
                            />

                            {error && <span className="text-danger">{error.message}</span>}
                        </>
                    )}
                />
            </div>


            <div className="mb-2">
                <label className="form-label">Quantidade</label>
                <input type="number" step="0.01" className="form-control" {...register("quantidade")} />
                {errors.precoUN && <span className="text-danger">{errors.quantidade.message}</span>}
            </div>

            {/* Data de Entrada */}
            <div className="mb-2">
                <label className="form-label">Data de Entrada</label>
                <input type="date" className="form-control" {...register("dataEntrada")} />
                {errors.dataEntrada && <span className="text-danger">{errors.dataEntrada.message}</span>}
            </div>

            {/* Botão */}
            <button type="submit" className="btn btn-success mt-3">
                Salvar Produto
            </button>
        </form>
    );
}
