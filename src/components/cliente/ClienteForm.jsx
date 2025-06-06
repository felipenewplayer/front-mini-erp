import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { clienteSchema } from "./ClienteSchema"

export default function ClienteForm({handleFormSubmit, defaultValues}){

    const {register, handleSubmit, formState:{errors}} =useForm({
        resolver:zodResolver(clienteSchema),defaultValues
    });
    return(
        <form className="form ps-5" onSubmit={handleSubmit(handleFormSubmit)}>
                    <div>
                        <label className="form-label mt-4">Nome</label>
                        <input
                            className="form-control w-75"
                            {...register("nome")}
                        />
                        {errors.nome && <span className="text-danger">{errors.nome.message}</span>}
                    </div>
                    <div>
                        <label className="form-label mt-4">Email</label>
                        <input
                            className="form-control w-75"
                            {...register("email")}
                        />
                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="form-label mt-4">Telefone</label>
                        <input
                            className="form-control w-75"
                            {...register("telefone")}
                        />
                        {errors.telefone && <span className="text-danger">{errors.telefone.message}</span>}
                    </div>
                    <div>
                        <label className="form-label mt-4">Endereço</label>
                        <input
                            className="form-control w-75"
                            {...register("endereco")}
                        />
                        {errors.endereco && <span className="text-danger">{errors.endereco.message}</span>}
                    </div>
    
                        <button className="btn btn-success mt-3 p-2 " type="submit" >Confirmar</button>
                    
                </form>
    )
}

