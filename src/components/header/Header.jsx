import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

export default function Header() {
    const { usuario, logOut } = useUser();
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-md navbar-dark"
            style={{ background: "linear-gradient(to right , var(--gray-50), var(--gray-70))" }}>
            <div className="container-fluid m-2">
                <a className="navbar-brand" href="/">
                    <FontAwesomeIcon icon={faStroopwafel} /> ERP do Futuro
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarMainToggler"
                    aria-controls="navbarMainToggler"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarMainToggler">
                    <ul className="navbar-nav ms-auto me-3">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Produtos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Parceiros</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Sobre</a>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-2">
                        {usuario ? (
                            <>
                                <span className='text-success'>Olá, {usuario.nome}!</span>
                                <button
                                    className="btn btn-outline-light"
                                    onClick={() => {
                                        logOut();
                                        navigate('/');
                                    }}>
                                    Sair
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="btn btn-success"
                                    onClick={() => navigate("/Cadastro")}>
                                    Cadastrar
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={() => navigate("/Login")}>
                                    Login
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
