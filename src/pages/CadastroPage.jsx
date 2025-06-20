import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastroSchema } from "../components/cadastro/cadastroSchema";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../components/context/AuthContext";
import { useState } from "react";
import { RiEyeOffFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";

export default function CadastroPage() {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const navigate = useNavigate();
  const { cadastrar } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(cadastroSchema),
  });

  const onSubmit = (data) => {
    const sucesso = cadastrar(data);
    if (sucesso) {
      toast.success("Cadastro realizado com sucesso!");
      navigate("/");
    } else {
      toast.error("E-mail já cadastrado!");
    }
    reset();
  };

  return (
    <div className="container py-5">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow p-4 rounded mx-auto"
        style={{ maxWidth: 500 }}
      >
        <h2 className="text-center mb-4">Cadastro de Usuário</h2>

        {/* Nome */}
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className={`form-control ${errors.nome ? "is-invalid" : ""}`}
            autoComplete="name"
            {...register("nome")}
          />
          {errors.nome && <div className="invalid-feedback">{errors.nome.message}</div>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        {/* Setor */}
        <div className="mb-3">
          <label className="form-label">Setor</label>
          <select
            className={`form-select ${errors.role ? "is-invalid" : ""}`}
            {...register("role")}
            defaultValue=""
          >
            <option value="" disabled>Selecione um setor</option>
            <option value="admin">Administração (Acesso total)</option>
            <option value="logistica">Logística (Acesso ao estoque)</option>
            <option value="vendas">Vendas (Acesso às vendas)</option>
          </select>
          {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
        </div>

        {/* Senha */}
        <div className="mb-4 position-relative">
          <label className="form-label">Senha</label>
          <input
            type={senhaVisivel ? "text" : "password"}
            className={`form-control pe-5 ${errors.senha ? "is-invalid" : ""}`}
            autoComplete="new-password"
            {...register("senha")}
          />
          {errors.senha ? <div className="invalid-feedback">{errors.senha.message}</div> : (
            <button
              type="button"
              className="btn position-absolute top-50 end-0  me-2 p-0"
              onClick={() => setSenhaVisivel(!senhaVisivel)}
            >
              {senhaVisivel ? <FaEye size={18} /> : <RiEyeOffFill size={18} />}
            </button>
          )}
        </div>

        <button type="submit" className="btn btn-success w-100 fw-semibold">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
