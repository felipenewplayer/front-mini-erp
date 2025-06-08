import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from './components/header/Header'
import Menu from './pages/Menu';
import Footer from './pages/Footer';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';


function App() {

  return (
    <>
      <Header />
      <div className='container-fluid p-0'>
        <Routes>
          <Route path='/' element={<Menu/>} />
          <Route path='/login' element={<Login/>} />
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
