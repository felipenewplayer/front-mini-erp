import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext.jsx';
import { ClienteProvider } from './components/context/ClienteContext.jsx';
import { ProdutoProvider } from './components/context/ProdutoContext.jsx';
import { VendasProvider } from './components/context/VendasContext.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <VendasProvider>
                <ClienteProvider>
                    <ProdutoProvider>
                        <App />
                    </ProdutoProvider>
                </ClienteProvider>
            </VendasProvider>
        </AuthProvider>
    </BrowserRouter>
);
