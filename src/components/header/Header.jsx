import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
import { useUser } from '../UserContext';

export default function Header() {
    const { usuario, logOut } = useUser();
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark ">
            <div className="container-fluid d-flex justify-content-center">
                <section className="collapse navbar-collapse p-2" id="navbarMainToggler">
                    <a className="navbar-brand ms-3" href="#">
                        <FontAwesomeIcon icon={faStroopwafel} />&nbsp; ERP do Futuro
                    </a>
                    <div className="navbar-nav ms-auto m-3">
                        <a href="#" className="nav-item nav-link ms-3
                        ">Produtos</a>
                        <a href="#" className="nav-item nav-link ms-3">Parceiros</a>
                        <a href="#" className="nav-item nav-link ms-3">Sobre</a>
                    </div>
                    <form className='form-inline'>
                        {usuario ? (
                            <div className="input-group gap-2 d-flex align-items-center">
                                <span className='text-success'>Olá, {usuario.nome}!</span>
                                <button
                                    className="btn btn-outline-light ms-2"
                                    onClick={() => { 
                                        logOut();
                                        navigate('/') }}>
                                    Sair
                                </button>
                            </div>
                        ) : (
                            <div className="input-group gap-2">
                                <button
                                    className="btn btn-outline-success "
                                    onClick={() => navigate("/Cadastro")}>Cadastrar
                                </button>
                                <button
                                    className="btn btn-outline-success "
                                    onClick={() => navigate("/Login")}>Login
                                </button>
                            </div>
                        )}
                    </form>
                </section>
                <button
                    className="navbar-toggler mt-2 mb-2 "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarMainToggler"
                    aria-controls="navbarMainToggler"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    );
}
