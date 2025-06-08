import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate();
    const irParaLogin = () => {
        navigate('/Login');
    }
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
                        <a href="#" className="nav-item nav-link ms-3 ">Login</a>
                    </div>
                    <form className='form-inline'>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className='input-group-text ms-4'>@</span>
                            </div>
                            <input type="text" className="form-control mr-3" placeholder='Username' />
                            <button
                                className="btn btn-outline-success"
                                onClick={irParaLogin}>Login</button>
                        </div>
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
