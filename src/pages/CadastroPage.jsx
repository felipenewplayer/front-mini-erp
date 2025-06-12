import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastroSchema } from "../components/cadastro/cadastroSchema";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../components/context/UserContext";

export default function CadastroPage() {
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
    <div className="container my-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto p-4 p-md-5 bg-light rounded shadow"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="mb-4 text-center">Cadastro</h2>

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
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Setor</label>
          <select className={`form-select ${errors.role ? "is-invalid" : ""}`}
            {...register("role")}
          >
            <option value="">Selecione...</option>
            <option value="admin">Administração</option>
            <option value="logistica">Logística</option>
            <option value="vendas">Vendas</option>

          </select>
          {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
        </div>


        <div className="mb-4">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className={`form-control ${errors.senha ? "is-invalid" : ""}`}
            autoComplete="new-password"
            {...register("senha")}
          />
          {errors.senha && <div className="invalid-feedback">{errors.senha.message}</div>}
        </div>

        <button type="submit" className="btn btn-success w-100">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
