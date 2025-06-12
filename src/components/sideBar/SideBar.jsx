import { useState, useEffect } from "react";
import { FaBoxes, FaChartLine, FaUsers, FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa';
import Estoque from '../../pages/Estoque';
import Financeiro from '../../pages/Financeiro';
import Cliente from '../../pages/Cliente';
import Vendas from '../../pages/Vendas';
import Relatorios from "../../pages/Relatorios";
import "./sideBar.css"
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";


export default function Sidebar() {
    const { usuario } = useUser();
    const isMobile = useIsMobile();
    const [menuAberto, setMenuAberto] = useState(!isMobile);
    const [secaoAtiva, setSecaoAtiva] = useState(null);

    function useIsMobile() {
        const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
        useEffect(() => {
            const handleResize = () => setIsMobile(window.innerWidth <= 768);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);
        return isMobile;
    }

    // Atualiza se estiver em mobile
    useEffect(() => {
        setMenuAberto(!isMobile);
    }, [isMobile]);

    useEffect(() => {
        if (!usuario) {
            setSecaoAtiva(false)
        }
    }, [usuario])
    const handleSectionClickComPermissão = (secao, rolesPermitidos = []) => {
        if (!rolesPermitidos.includes(usuario?.role) && usuario?.role !== "admin") {
            toast.error("Você não tem acesso a essa seção, cadastre-se.")
            return
        }
        setSecaoAtiva(secao);
        if (isMobile) setMenuAberto(false);
    };

    return (
        <>
            {/* Botão ☰ visível apenas no mobile quando sidebar está fechada */}
            {isMobile && !menuAberto && (
                <button
                    className="btn mt-2 ms-1"
                    style={{ background: "var(--gray-50)" }}
                    onClick={() => {
                        setMenuAberto(true)
                        setSecaoAtiva(null)
                    }}
                >
                    Menu
                </button>
            )}
            {/* Sidebar */}
            {menuAberto && (
                <aside
                    className="text-light mt-1 p-3 d-flex flex-column align-items-start  border rounded shadow"
                    style={{
                        width: '270px',
                        left: '0',
                        overflowY: 'auto',
                        background: 'linear-gradient(to bottom, var(--gray-20), var(--gray-50))'

                    }}
                >
                    {/* Botão de fechar no mobile */}
                    {isMobile && (
                        <button
                            className="btn btn-cyan mb-4 border"
                            onClick={() => setMenuAberto(false)}
                        >
                            Fechar ✖
                        </button>
                    )}

                    <button
                        className="btn btn-dark btn-sideBar btn-lg text-start mb-3 w-100"
                        style={{ backgroundColor: 'var(--black-10)' }}
                        onClick={() => handleSectionClickComPermissão("estoque", ["logistica"])}
                    >
                        <FaBoxes className="me-2" /> Estoque
                    </button>

                    <button className="btn btn-dark btn-sideBar btn-lg text-start mb-3 w-100"
                        style={{ backgroundColor: 'var(--black-20)' }}
                        onClick={() => handleSectionClickComPermissão("vendas", ["vendas"])}
                    >
                        <FaShoppingCart className="me-2" /> Vendas
                    </button>
                    <button
                        className="btn btn-dark  btn-sideBar btn-lg text-start mb-3 w-100"
                        style={{ backgroundColor: 'var(--black-30)' }}
                        onClick={() => handleSectionClickComPermissão("financeiro", ["admin"])}
                    >
                        <FaMoneyBillWave className="me-2" /> Financeiro
                    </button>
                    <button
                        className="btn btn-dark  btn-sideBar btn-lg text-start mb-3 w-100"
                        style={{ backgroundColor: 'var(--black-50)' }}
                        onClick={() => handleSectionClickComPermissão("cliente", ["admin"])}>
                        <FaUsers className="me-2" /> Clientes
                    </button>
                    <button
                        className="btn btn-dark  btn-sideBar btn-lg text-start mb-3 w-100"
                        style={{ backgroundColor: 'var(--black-80)' }}
                        onClick={() => handleSectionClickComPermissão("relatorios", ["logistica"])}>
                        <FaChartLine className="me-2" /> Relatórios
                    </button>
                </aside>
            )}

            {/* Conteúdo principal */}
            <main style={{
                marginTop: !isMobile ? '-360px' : '0', paddingTop: '', paddingLeft: '20px',
                marginLeft: !isMobile ? "" : "-20px"
            }}>
                {secaoAtiva === "estoque" && <Estoque />}
                {secaoAtiva === "vendas" && <Vendas />}
                {secaoAtiva === "financeiro" && <Financeiro />}
                {secaoAtiva === "cliente" && <Cliente />}
                {secaoAtiva === "relatorios" && <Relatorios />}
            </main>
        </>
    );
}
