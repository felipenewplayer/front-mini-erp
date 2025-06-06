import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="container-fluid col-12 col-md-12 d-flex gap-5 align-items-center footer bg-dark">
            <FaFacebookSquare size={30} color="#cfd7e2" />
            <FaInstagram size={30} color="#f5eff1" />
           
            
        </footer>
    );
}
