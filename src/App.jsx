import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from './components/header/Header'
import Menu from './pages/Menu';
import Footer from './pages/Footer';


function App() {

  return (
      <div className='container-fluid p-0'>
        <Header />
        <Menu />
        <Footer/>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover />
      </div>
  
  )
}

export default App
