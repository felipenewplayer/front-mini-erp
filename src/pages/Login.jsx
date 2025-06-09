import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../components/login/LoginSchema";
import { useUser } from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
    const { login } = useUser();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data) => {
        const sucesso = login(data.email, data.senha);
        if (sucesso) {
            toast.success("Login realizado com sucesso!");
            navigate("/");
        } else {
            toast.error("E-mail ou senha inválidos!");
        }
        reset();
    };

    return (
        <div className="container my-5">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto p-4 p-md-5 bg-light rounded shadow"
                style={{ maxWidth: "500px" }}
            >
                <h2 className="mb-4 text-center">Login</h2>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        autoComplete="email"
                        {...register("email")}
                    />
                    {errors.email && (
                        <span className="text-danger small">{errors.email.message}</span>
                    )}
                </div>

                <div className="mb-4">
                    <label className="form-label">Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        autoComplete="current-password"
                        {...register("senha")}
                    />
                    {errors.senha && (
                        <span className="text-danger small">{errors.senha.message}</span>
                    )}
                </div>

                <button type="submit" className="btn btn-success w-100">
                    Entrar
                </button>
            </form>
        </div>
    );
}
