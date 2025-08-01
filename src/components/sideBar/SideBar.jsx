import { useState, useEffect } from "react";
import { FaBoxes, FaChartLine, FaUsers, FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa';
import Logistica from '../../pages/Logistica';
import Financeiro from '../../pages/Financeiro';
import Cliente from '../../pages/Cliente';
import Vendas from '../../pages/Vendas';
import Relatorios from "../../pages/Relatorios";
import Comecar from "../../pages/Comecar";
import { useUser } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./sideBar.css";

// Hook definido fora do componente
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return isMobile;
}

export default function Sidebar() {
    const { usuario } = useUser();
    const isMobile = useIsMobile();

    const [menuAberto, setMenuAberto] = useState(!isMobile);
    const [secaoAtiva, setSecaoAtiva] = useState(null);

    // Sincroniza menuAberto com o isMobile
    useEffect(() => {
        setMenuAberto(!isMobile);
    }, [isMobile]);

    // Se não tiver usuário logado, limpa a seção ativa
    useEffect(() => {
        if (!usuario) {
            setSecaoAtiva(null);
        }
    }, [usuario]);

    const handleSectionClickComPermissão = (secao, rolesPermitidos = []) => {
        if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(usuario?.role) && usuario?.role !== "admin") {
            toast.error("Você não tem acesso a essa seção, cadastre-se.");
            return;
        }
        setSecaoAtiva(secao);
        if (isMobile) setMenuAberto(false);
    };

    return (
        <>
            {/* Botão para abrir menu no mobile */}
            {isMobile && !menuAberto && (
                <button
                    className="btn btn-sm mt-2 ms-1"
                    style={{ background: "var(--gray-50)", width:"100px"}}
                    onClick={() => {
                        setMenuAberto(true);
                        setSecaoAtiva(null);
                    }}
                    aria-label="Abrir menu"
                >
                    ☰ Menu
                </button>
            )}

            {/* Sidebar */}
            {menuAberto && (
                <aside
                    className="text-light mt-1 p-3 d-flex flex-column align-items-start border rounded shadow"
                    style={{
                        width: '270px',
                        left: '0',
                        overflowY: 'auto',
                        background: 'linear-gradient(to bottom, var(--gray-20), var(--gray-50))'
                    }}
                    aria-label="Menu lateral"
                >
                    {/* Botão fechar no mobile */}
                    {isMobile && (
                        <button
                            className="btn btn-cyan mb-2 text-light border"
                            onClick={() => setMenuAberto(false)}
                            aria-label="Fechar menu"
                        >
                            Fechar ✖
                        </button>
                    )}

                    <button
                        className="btn btn-dark btn-sideBar btn-lg text-start mb-3 w-100"
                        style={{ backgroundColor: 'var(--black-10)' }}
                        onClick={() => handleSectionClickComPermissão("logistica", ["logistica"])}
                    >
                        <FaBoxes className="me-2" /> Logística
                    </button>

                    <button
                        className="btn btn-dark btn-sideBar btn-lg text-start mb-3 w-100"
                        style={{ backgroundColor: 'var(--black-20)' }}
                        onClick={() => handleSectionClickComPermissão("vendas", ["vendas"])}
                    >
                        <FaShoppingCart className="me-2" /> Vendas
                    </button>

                    <button
                        className="btn btn-dark btn-sideBar btn-lg text-start mb-3 w-100"
                        style={{ backgroundColor: 'var(--black-30)' }}
                        onClick={() => handleSectionClickComPermissão("financeiro", ["admin"])}
                    >
                        <FaMoneyBillWave className="me-2" /> Financeiro
                    </button>

                    <button
                        className="btn btn-dark btn-sideBar btn-lg text-start mb-3 w-100"
                        style={{ backgroundColor: 'var(--black-50)' }}
                        onClick={() => handleSectionClickComPermissão("cliente", ["admin"])}
                    >
                        <FaUsers className="me-2" /> Clientes
                    </button>

                    <button
                        className="btn btn-dark btn-sideBar btn-lg text-start mb-3 w-100"
                        style={{ backgroundColor: 'var(--black-80)' }}
                        onClick={() => handleSectionClickComPermissão("relatorios", ["logistica"])}
                    >
                        <FaChartLine className="me-2" /> Relatórios
                    </button>
                </aside>
            )}

            {/* Conteúdo principal */}
            <main
                style={{
                    marginTop: !isMobile ? '-360px' : '0',
                    paddingLeft: !isMobile ? '290px': '20px',
                    marginLeft: !isMobile ? "" : "-20px",
                    marginRight: !isMobile ? "20px" : ""
                }}
            >
                {secaoAtiva === "logistica" && <Logistica />}
                {secaoAtiva === "vendas" && <Vendas />}
                {secaoAtiva === "financeiro" && <Financeiro />}
                {secaoAtiva === "cliente" && <Cliente />}
                {secaoAtiva === "relatorios" && <Relatorios />}
                {secaoAtiva === null && <Comecar />}

            </main>
        </>
    );
}
