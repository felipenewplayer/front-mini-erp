import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { produtoSchema } from "../../../schemas/produtoSchema";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";


export default function FormProduto({ defaultValues, onHandleSubmit, onCancel }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        watch,
        setValue
    } = useForm({
        resolver: zodResolver(produtoSchema),
        defaultValues,

    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);


    const categoriaSelecionada = watch("categoria");
    const nomesPorCategoria = {
        CONSOLE: ["PlayStation 5", "Xbox Series X", "Nintendo Switch"],
        MONITOR: ["Samsung 24\"", "LG Ultrawide", "AOC Gamer"],
        MOUSE: ["Logitech G203", "Razer Viper", "Microsoft Basic"],
        TECLADO: ["Redragon Kumara", "Corsair K70", "Logitech K120"],
        PROCESSADOR: ["Ryzen 5 5600X", "Intel i7 12700K", "Ryzen 7 5800X"],
    };
    const nomeSelecionado = watch("nome");
    const codigosPorNome = {
        "PlayStation 5": "25",
        "Xbox Series X": "26",
        "Nintendo Switch": "27",
        "Samsung 24\"": "31",
        "LG Ultrawide": "32",
        "AOC Gamer": "33",
        "Logitech G203": "41",
        "Razer Viper": "42",
        "Microsoft Basic": "43",
        "Redragon Kumara": "51",
        "Corsair K70": "52",
        "Logitech K120": "53",
        "Ryzen 5 5600X": "61",
        "Intel i7 12700K": "62",
        "Ryzen 7 5800X": "63",
    };
    useEffect(() => {
        if (nomeSelecionado) {
            const codigoGerado = codigosPorNome[nomeSelecionado] || "";
            setValue("codigo", codigoGerado);
        } else {
            setValue("codigo", "");
        }
    }, [nomeSelecionado, setValue]);

    return (

        <form className="card p-3 mb-4 gap-3" onSubmit={handleSubmit(onHandleSubmit)}>
            <button
                type="button"
                className="btn btn-secondary mt-2 w-25"
                onClick={onCancel}
            >
                Voltar
            </button>

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

            <div className="mb-2">
                <label className="form-label">Nome</label>
                {categoriaSelecionada && nomesPorCategoria[categoriaSelecionada] ? (
                    <select className="form-select" {...register("nome")}>
                        <option value="">Selecione um nome...</option>
                        {nomesPorCategoria[categoriaSelecionada].map((nome) => (
                            <option key={nome} value={nome}>
                                {nome}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        className="form-control"
                        {...register("nome")}
                        disabled
                        placeholder="Selecione uma categoria primeiro"
                    />
                )}
                {errors.nome && <span className="text-danger">{errors.nome.message}</span>}
            </div>

            {/* Código / SKU */}
            <div className="mb-2">
                <label className="form-label">Código do Produto / SKU</label>

                <input
                    className="form-control" {...register("codigo")}
                    readOnly
                    disabled
                    placeholder="Selecione um nome primeiro" />
            </div>


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
                {errors.quantidade && <span className="text-danger">{errors.quantidade.message}</span>}
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
