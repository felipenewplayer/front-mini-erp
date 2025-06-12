import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from './components/header/Header'
import Footer from './pages/Footer';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import CadastroPage from './pages/CadastroPage';
import Sidebar from './components/sideBar/SideBar.jsx';


function App() {

  return (
    <>
      <Header />
      <div className='container-fluid p-0'>
        <Routes>
          <Route path='/' element={<Sidebar />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cadastro' element={<CadastroPage />} />
        </Routes >
      </div>

      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </>
  )
}

export default App
