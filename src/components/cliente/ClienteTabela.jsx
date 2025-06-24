import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ClienteTabela({ clientes, onEditar, onExcluir, onAdicionar }) {
  const [filtro, setFiltro] = useState("");

  // Filtra clientes pelo nome ou email (case insensitive)
  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    cliente.email.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <>
      <div className="d-flex gap-3 align-items-center">
        <button type="button" className="btn btn-sm btn-success mb-2" onClick={onAdicionar}>
          Adicionar
        </button>
        <div style={{ flexGrow: 2 }}>
          <label className="form-label">Pesquisar cliente</label>
          <div className="input-group mb-2">
            <input
              className="form-control"
              placeholder="Digite nome ou email"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
            <button
              className="btn btn-light"
              onClick={() => {
                /* se quiser um botão de buscar manual, senão pode tirar */
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-bordered mt-4">
          <thead>
            <tr>
              <th className="text-center">Nome</th>
              <th className="text-center">Email</th>
              <th className="text-center">Telefone</th>
              <th className="text-center">Endereço</th>
              <th className="text-center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((cliente) => (
                <tr key={cliente.id}>
                  <td style={{ maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {cliente.nome}
                  </td>
                  <td style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {cliente.email}
                  </td>
                  <td style={{ maxWidth: "120px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {cliente.telefone}
                  </td>
                  <td style={{ maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {cliente.cidade && cliente.estado
                      ? `${cliente.cidade} - ${cliente.estado}`
                      : cliente.endereco || "-"}
                  </td>
                  <td>
                    <div className="d-flex justify-content-evenly gap-">
                      <button type="button" className="btn btn-warning" onClick={() => onEditar(cliente)}>
                        Editar
                      </button>
                      <button type="button" className="btn btn-danger" onClick={() => onExcluir(cliente.id)}>
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">Nenhum cliente encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
