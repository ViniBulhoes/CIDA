import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from './context/ConfigContext';

// Importação das Telas de Autenticação
import Login from './pages/Login';
import LoginCuidador from './pages/LoginCuidador';
import Cadastro from './pages/Cadastro';
import CadastroCuidador from './pages/CadastroCuidador';
import RecuperarSenha from './pages/RecuperarSenha';

// Importação das Telas Principais
import Home from './pages/Home';
import Remedios from './pages/Remedios';
import Rotina from './pages/Rotina';
import Perfil from './pages/Perfil';
import Configuracoes from './pages/Configuracoes';
import PainelCuidador from './pages/PainelCuidador';

export default function App() {
  return (
    <ConfigProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/home" element={<Home />} />
          <Route path="/remedios" element={<Remedios />} />
          <Route path="/rotina" element={<Rotina />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/login-cuidador" element={<LoginCuidador />} />
          <Route path="/painel-cuidador" element={<PainelCuidador />} />
          <Route path="/cadastro-cuidador" element={<CadastroCuidador />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}
