import './Header.css';
export default function Header() {
    return (
        <nav className="p-5 d-flex bg-secondary">
            <div className="d-flex container justify-content-center">
                <img />
                <h1>ERP do Futuro</h1>
            </div>
            <div className="container d-flex align-items-center justify-content-center  gap-5 pe-5 ">
                <a href="#" className="nav-link-custom">Produtos  ﹀</a>
                <a href="#" className="nav-link-custom">Parceiros ﹀</a>
                <a href="#" className="nav-link-custom">Sobre ﹀</a>
                <a href="#" className="nav-link-custom">Já sou cliente ﹀</a>
            </div>
        </nav>
    )
}