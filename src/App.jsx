import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from './components/header/Header'
import Menu from './pages/Menu';
import Footer from './pages/Footer';


function App() {

  return (
    <>

      <Header />
      <Menu />
      {/* <Footer/> */}
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
