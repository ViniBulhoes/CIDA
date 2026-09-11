import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import RecuperarSenha from './pages/RecuperarSenha';
import Home from './pages/Home';
import Remedios from './pages/Remedios';
import Rotina from './pages/Rotina';
import Perfil from './pages/Perfil';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/home" element={<Home />} />
        <Route path="/remedios" element={<Remedios />} />
        <Route path="/rotina" element={<Rotina />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  );
}