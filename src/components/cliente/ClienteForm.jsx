import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { clienteSchema } from "./ClienteSchema"

export default function ClienteForm({handleFormSubmit, defaultValues, onCancel}){
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: zodResolver(clienteSchema),
        defaultValues
    });

    return(
        <form className="form ps-5" onSubmit={handleSubmit(handleFormSubmit)}>
            <button
                type="button"
                className="btn btn-secondary mt-2 w-25"
                onClick={onCancel}
            >
                Voltar
            </button>
            
            <div>
                <label className="form-label mt-4">Nome</label>
                <input
                    className={`form-control w-75 ${errors.nome ? 'is-invalid' : ''}`}
                    {...register("nome")}
                />
                {errors.nome && <span className="text-danger">{errors.nome.message}</span>}
            </div>
            
            <div>
                <label className="form-label mt-4">Email</label>
                <input
                    type="email"
                    placeholder="informar o email"
                    className={`form-control w-75 ${errors.email ? 'is-invalid' : ''}`}
                    {...register("email")}
                />
                {errors.email && <p className="text-danger">{errors.email.message}</p>}
            </div>
            
            <div>
                <label className="form-label mt-4">Telefone</label>
                <input
                    type="tel"
                    className={`form-control w-75 ${errors.telefone ? 'is-invalid' : ''}`}
                    {...register("telefone")}
                />
                {errors.telefone && <span className="text-danger">{errors.telefone.message}</span>}
            </div>
            
            <div>
                <label className="form-label mt-4">Endereço</label>
                <input
                    className={`form-control w-75 ${errors.endereco ? 'is-invalid' : ''}`}
                    {...register("endereco")}
                />
                {errors.endereco && <span className="text-danger">{errors.endereco.message}</span>}
            </div>

            <button className="btn btn-success mt-3 p-2" type="submit">
                {defaultValues?.id ? "Atualizar" : "Cadastrar"}
            </button>
        </form>
    )
}