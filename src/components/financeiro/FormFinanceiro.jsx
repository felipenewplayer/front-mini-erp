import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { transacaoSchema } from "../schemas/TransacaoSchema";

export default function FormFinanceiro({ defaultValues, onHandleSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transacaoSchema),
    defaultValues,
  });

  return (
    <form className="card p-3 mb-4" onSubmit={handleSubmit(onHandleSubmit)}>
      <div className="mb-2">
        <label className="form-label">Valor</label>
        <input type="number" step="0.01" className="form-control" {...register("valor")} />
        {errors.valor && <span className="text-danger">{errors.valor.message}</span>}
      </div>

      <div className="mb-2">
        <label className="form-label">Tipo</label>
        <select className="form-control" {...register("tipo")} >
          <option value="">Selecione...</option>
          <option value="PIX">Pix</option>
          <option value="CRÉDITO">Crédito</option>
          <option value="DÉBITO">Débito</option>
          <option value="BOLETO">Boleto</option>
        </select>

      </div>

      <div className="mb-2">
        <label className="form-label">Vencimento</label>
        <input type="date" className="form-control" {...register("vencimento")} />
        {errors.vencimento && <span className="text-danger">{errors.vencimento.message}</span>}
      </div>

      <div className="mb-2">
        <label className="form-label">Descrição</label>
        <input type="text" className="form-control" {...register("descricao")} />
        {errors.descricao && <span className="text-danger">{errors.descricao.message}</span>}
      </div>

      <div className="mb-2">
        <label className="form-label">Status</label>
        <select className="form-control" {...register("status")}>
          <option value="">Selecione...</option>
          <option value="PENDENTE">PENDENTE</option>
          <option value="CANCELADO">CANCELADO</option>
          <option value="PAGO">PAGO</option>
        </select>
        {errors.status && <span className="text-danger">{errors.status.message}</span>}
      </div>

      <button type="submit" className="btn btn-success mt-3">
        Salvar Transação
      </button>
    </form>
  );
}
