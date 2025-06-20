import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { clienteSchema } from "./ClienteSchema";
import useEndereco from "./endereco/useEndereco";
import { useHookFormMask } from 'use-mask-input';

export default function ClienteForm({ handleFormSubmit, defaultValues, onCancel }) {
  const { estados, cidades, setEstadoSelecionado } = useEndereco();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(clienteSchema),
    defaultValues,
  });
  const registerWithMask = useHookFormMask(register);
  // Para resetar o form ao editar
  useEffect(() => {
    reset(defaultValues);
    if (defaultValues?.estado) {
      setEstadoSelecionado(defaultValues.estado);
    }
  }, [defaultValues]);

  const estadoAtual = watch("estado");

  const handleEstadoChange = (e) => {
    const uf = e.target.value;
    setValue("estado", uf);
    setEstadoSelecionado(uf);
    setValue("cidade", ""); // limpa cidade ao trocar estado
  };

  return (
    <form className="form ps-5 shadow border  rounded p-5" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <button type="button" className="btn btn-secondary mt-2 w-25" onClick={onCancel}>
        Voltar
      </button>

      <div>
        <label className="form-label mt-4">Nome</label>
        <input
          className={`form-control w-75 ${errors.nome ? "is-invalid" : ""}`}
          {...register("nome")}
        />
        {errors.nome && <span className="text-danger">{errors.nome.message}</span>}
      </div>

      <div>
        <label className="form-label mt-4">Email</label>
        <input
          type="email"
          className={`form-control w-75 ${errors.email ? "is-invalid" : ""}`}
          {...register("email")}
        />
        {errors.email && <span className="text-danger">{errors.email.message}</span>}
      </div>

      <div>
        <label className="form-label mt-4">Telefone</label>
        <input className="form-control w-75"
          {...registerWithMask("telefone", ['(99) 99999-9999', '99999-9999'], {
            required: true
          })}
          type="text"
        />
        {errors.telefone && <span className="text-danger">{errors.telefone.message}</span>}
      </div>

      <div>
        <label className="form-label mt-4">Endereço</label>
        <input
          className={`form-control w-75 ${errors.endereco ? "is-invalid" : ""}`}
          {...register("endereco")}
        />
        {errors.endereco && <span className="text-danger">{errors.endereco.message}</span>}
      </div>

      <div>
        <label className="form-label mt-4">Estado</label>
        <select
          className={`form-select w-75 ${errors.estado ? "is-invalid" : ""}`}
          {...register("estado")}
          onChange={handleEstadoChange}
        >
          <option value="">Selecione o estado</option>
          {estados.map((estado) => (
            <option key={estado.id} value={estado.sigla}>
              {estado.nome}
            </option>
          ))}
        </select>
        {errors.estado && <span className="text-danger">{errors.estado.message}</span>}
      </div>

      <div>
        <label className="form-label mt-4">Cidade</label>
        <select
          className={`form-select w-75 ${errors.cidade ? "is-invalid" : ""}`}
          {...register("cidade")}
          disabled={!estadoAtual}
        >
          <option value="">Selecione a cidade</option>
          {cidades.map((cidade) => (
            <option key={cidade.id} value={cidade.nome}>
              {cidade.nome}
            </option>
          ))}
        </select>
        {errors.cidade && <span className="text-danger">{errors.cidade.message}</span>}
      </div>

      <button className="btn btn-success mt-3 p-2" type="submit">
        {defaultValues?.id ? "Atualizar" : "Cadastrar"}
      </button>
    </form>
  );
}
