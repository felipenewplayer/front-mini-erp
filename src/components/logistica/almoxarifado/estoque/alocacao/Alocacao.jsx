import { useState } from "react";
import dadosAlocacao from "../../../../../data/dadosAlocacao.json";
import { CiSearch } from "react-icons/ci";

export default function Alocacao() {
    const ruas = dadosAlocacao.alocacao;
    const [busca, setBusca] = useState("");

    const filtrarItens = (item) =>
        item.toLowerCase().includes(busca.toLowerCase().trim());
    
    return (
        <div className="container shadow bg-secondary text-white p-4 rounded">
            <h1 className="mb-4 text-center">Alocação de Produtos por Rua</h1>
            <span>Pesquisar produto</span>
            <div className="d-flex align-items-center gap-2 mb-4">
                <input
                    className="form-control w-50"
                    type="text"
                    placeholder="Ex: PlayStation"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
                <button className="btn btn-sm btn-primary p-2">
                    <CiSearch />
                </button>
            </div>

            {Object.entries(ruas).map(([ruaNome, ruaDados]) => {
                // Filtrar prateleiras com base na busca
                const prateleirasFiltradas = Object.entries(ruaDados.prateleiras)
                    .filter(([,dados]) => filtrarItens(dados.item))
                    .sort((a, b) => Number(a[0]) - Number(b[0]));

                // Se nenhuma prateleira da rua tiver match, pula essa rua
                if (busca && prateleirasFiltradas.length === 0) return null;

                return (
                    <div key={ruaNome} className="mb-5 table-responsive">
                        <h3 className="text-warning">{(ruaNome).toUpperCase()}  {ruaDados.categoria}</h3>
                        <table className="table table-dark table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Prateleira</th>
                                    <th>Item</th>
                                    <th>Código</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prateleirasFiltradas.map(([num, dados]) => (
                                    <tr key={num}>
                                        <td>P{num}</td>
                                        <td>{dados.item}</td>
                                        <td>{dados.codigo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );
}
