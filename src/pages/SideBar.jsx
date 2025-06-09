import { useState, useEffect } from "react";
import { FaBoxes, FaChartLine, FaUsers, FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa';
import Estoque from './Estoque';
import Financeiro from './Financeiro';
import Cliente from './Cliente';
import Vendas from './Vendas';

// Hook para detectar se está em mobile
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
    const isMobile = useIsMobile();
    const [menuAberto, setMenuAberto] = useState(!isMobile);
    const [secaoAtiva, setSecaoAtiva] = useState(null);

    // Atualiza se estiver em mobile
    useEffect(() => {
        setMenuAberto(!isMobile);
    }, [isMobile]);

    const handleSectionClick = (secao) => {
        setSecaoAtiva(secao);
        if (isMobile) setMenuAberto(false); // só fecha no mobile
    };

    return (
        <>
            {/* Botão ☰ visível apenas no mobile quando sidebar está fechada */}
            {isMobile && !menuAberto && (
                <button
                    className="btn btn-dark"
                    style={{ top: '80px', left: ''}}
                    onClick={() =>{setMenuAberto(true) 
                        setSecaoAtiva(null)}}
                >
                    ☰ Menu
                </button>
            )}

            {/* Sidebar */}
            {menuAberto && (
                <aside
                    className="bg-dark text-light p-3 d-flex flex-column align-items-start  border rounded"
                    style={{
                        width: '270px',
                        left: '0',
                        zIndex: 999,
                        overflowY: 'auto'
                    }}
                >
                    {/* Botão de fechar no mobile */}
                    {isMobile && (
                        <button
                            className="btn btn-outline-light mb-4"
                            onClick={() => setMenuAberto(false)}
                        >
                            Fechar ✖
                        </button>
                    )}

                    <button className="btn btn-dark btn-lg text-start mb-3 w-100" onClick={() => handleSectionClick("estoque")}>
                        <FaBoxes className="me-2" /> Estoque
                    </button>
                    <button className="btn btn-dark btn-lg text-start mb-3 w-100" onClick={() => handleSectionClick("vendas")}>
                        <FaShoppingCart className="me-2" /> Vendas
                    </button>
                    <button className="btn btn-dark btn-lg text-start mb-3 w-100" onClick={() => handleSectionClick("financeiro")}>
                        <FaMoneyBillWave className="me-2" /> Financeiro
                    </button>
                    <button className="btn btn-dark btn-lg text-start mb-3 w-100" onClick={() => handleSectionClick("cliente")}>
                        <FaUsers className="me-2" /> Clientes
                    </button>
                    <button className="btn btn-dark btn-lg text-start mb-3 w-100" onClick={() => alert("Relatórios ainda não implementado")}>
                        <FaChartLine className="me-2" /> Relatórios
                    </button>
                </aside>
            )}

            {/* Conteúdo principal */}
            <main style={{ marginTop: !isMobile ? '-360px' : '0', paddingTop: '', paddingLeft: '20px',
                marginLeft:!isMobile ? "":"-20px"
             }}>
                {secaoAtiva === "estoque" && <Estoque />}
                {secaoAtiva === "vendas" && <Vendas />}
                {secaoAtiva === "financeiro" && <Financeiro />}
                {secaoAtiva === "cliente" && <Cliente />}
            </main>
        </>
    );
}
