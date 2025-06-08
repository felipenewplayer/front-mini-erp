import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema } from "../components/login/LoginSchema"

export default function Login() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = (data) => {
        console.log(data);
        reset();
    }
    return (
        <div className="form-group container mt-2 rounded  ">
            <form className="form bg-secondary d-flex flex-column  p-5  rounded gap-3" 
            onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="form-label">email </label>
                    <input className="form-control w-50"
                        {...register("email")} />
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                </div>
                <div>
                    <label className="form-label">senha </label>
                    <input className="form-control w-50"
                        {...register("senha")} />
                    {errors.senha && <span className="text-danger">{errors.senha.message}</span>}
                </div>
                <button className="btn btn-success w-50" type="submit">Salvar</button>

            </form>
        </div>
    )
}