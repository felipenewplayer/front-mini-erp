import { useState, useEffect } from 'react';
import { FaBoxes, FaChartLine, FaUsers, FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa';
import Estoque from './Estoque';
import Financeiro from './Financeiro';
import Cliente from './Cliente';
import Vendas from './Vendas';

export default function Sidebar() {
    const [secaoAtiva, setSecaoAtiva] = useState(null);
    const [menuAberto, setMenuAberto] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            setMenuAberto(!mobile); // Abre no desktop, fecha no mobile
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleClickSecao = (secao) => {
        setSecaoAtiva(secao);
        if (isMobile) {
            setMenuAberto(false); // Fecha menu no mobile
        }
    };

    return (
        <div className="d-flex">
            {/* SIDEBAR */}
            <aside
                className={`bg-dark text-light p-3 border-end  top-0 ${isMobile ? 'mobile-sidebar' : ''}`}
                style={{
                    width: '250px',
                    height: isMobile ? '86.4vh': "83.4vh",
                    zIndex: 1040,
                    transform: menuAberto ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease'
                }}
            >
                {/* Só mostra botão fechar no MOBILE */}
                {isMobile && (
                    <button className="btn btn-light mb-4 w-100" onClick={() => setMenuAberto(false)}>
                        Fechar Menu ✖
                    </button>
                )}

                <section className='d-flex flex-column'>
                    <button className="btn btn-dark text-start mb-2 w-100" onClick={() => handleClickSecao("estoque")}>
                        <FaBoxes className="me-2" /> Estoque
                    </button>
                    <button className="btn btn-dark text-start mb-2 w-100" onClick={() => handleClickSecao("vendas")}>
                        <FaShoppingCart className="me-2" /> Vendas
                    </button>
                    <button className="btn btn-dark text-start mb-2 w-100" onClick={() => handleClickSecao("financeiro")}>
                        <FaMoneyBillWave className="me-2" /> Financeiro
                    </button>
                    <button className="btn btn-dark text-start mb-2 w-100" onClick={() => handleClickSecao("cliente")}>
                        <FaUsers className="me-2" /> Clientes
                    </button>
                    <button className="btn btn-dark text-start mb-2 w-100" onClick={() => alert("Relatórios ainda não implementado")}>
                        <FaChartLine className="me-2" /> Relatórios
                    </button>
                </section>
            </aside>

            {/* BOTÃO HAMBÚRGUER (apenas mobile) */}
            {isMobile && !menuAberto && (
                <button
                    className="btn btn-dark position-absolute top-80px  m-3 "
                    onClick={() => setMenuAberto(true)}
                >
                    ☰ Menu
                </button>
            )}

            {/* CONTEÚDO */}
            <main
                style={{
                    marginLeft: isMobile ? 0 : '0',
                    marginTop: isMobile ? '10px' : '0',
                    width: '100%',
                }}
            >
                {secaoAtiva === "estoque" && <Estoque />}
                {secaoAtiva === "vendas" && <Vendas />}
                {secaoAtiva === "financeiro" && <Financeiro />}
                {secaoAtiva === "cliente" && <Cliente />}
                {!secaoAtiva && <p className='text-muted'>Selecione uma seção no menu.</p>}
            </main>
        </div>
    );
}
