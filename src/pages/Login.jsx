import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../components/login/LoginSchema";
import { useUser } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { FiEyeOff } from "react-icons/fi";
import { RiEyeOffFill } from "react-icons/ri";

export default function Login() {
    const [senhaVisivel, setSenhaVisivel] = useState(false);
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
                onSubmit={handleSubmit(onSubmit) }
                noValidate
                className="mx-auto p-4 p-md-5 bg-light rounded shadow"
                style={{ maxWidth: "500px" }}
            >
                <h2 className="mb-4 text-center">Login</h2>

                <div className="mb-3">
                    <label className="form-label">E-mail</label>
                    <input
                        type="email"
                        className={`form-control ${errors.senha ? "is-invalid" : ""} `}
                        autoComplete="email"
                        {...register("email")}
                    />
                    {errors.email && (
                        <span className="text-danger small">{errors.email.message}</span>
                    )}
                </div>

                <div className="mb-4 position-relative">
                    <label className="form-label">Senha</label>
                    <input
                        type={senhaVisivel ? "text" : "password"}
                        className={`form-control ${errors.senha ? "is-invalid" : ""} `}
                        autoComplete="current-password"
                        {...register("senha")}
                    />
                    {errors.senha ? (
                        <span className="text-danger small">{errors.senha.message}</span>
                    ) :
                        <button className="btn position-absolute top-50 end-0  me-2 p-0"
                            onClick={() => setSenhaVisivel(!senhaVisivel)}>
                            {senhaVisivel ? <FaEye size={18} /> : <RiEyeOffFill size={18} />
                            }
                        </button>
                    }
                </div>

                <button type="submit" className="btn btn-success w-100">
                    Entrar
                </button>
            </form>
        </div>
    );
}
