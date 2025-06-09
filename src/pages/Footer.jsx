import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="container-fluid footer col-12 col-md-12 d-flex gap-5 align-items-center  bg-dark ">
            <a href='https://www.facebook.com/'><FaFacebookSquare size={30} color="#e4eaf1" />
            </a>
            <a href="https://www.instagram.com/"><FaInstagram size={30} color="#f0e9ec" /></a>
        </footer >
    );
}
