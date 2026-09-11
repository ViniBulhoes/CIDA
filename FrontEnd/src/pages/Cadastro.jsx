import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarUsuario } from '../services/api';
import { 
  Heart, 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Lock, 
  CheckCircle, 
  Eye, 
  EyeOff, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export default function Cadastro(usuario) {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [identificador, setIdentificador] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  
  const [mensagemErro, setMensagemErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensagemErro("");

    if (!nome.trim()) {
      setMensagemErro("Por favor, digite seu nome completo.");
      return;
    }

    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      setMensagemErro("Por favor, informe um e-mail válido.");
      return;
    }

    if (!identificador.trim()) {
      setMensagemErro("Informe seu celular ou CPF.");
      return;
    }

    if (senha.length < 6) {
      setMensagemErro("A senha deve ter no mínimo 6 números ou letras.");
      return;
    }

    if (senha !== confirmarSenha) {
      setMensagemErro("As senhas digitadas não coincidem.");
      return;
    }

    const payload = {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      identificador: identificador.trim(),
      nascimento: nascimento,
      senha: senha
    };
    console.log("Cadastro enviado para o backend:", payload);

    criarUsuario(payload).then(() => {
      setSucesso(true);
    }).catch((error) => {
      console.error("Erro ao criar usuário:", error);
      setMensagemErro("Ocorreu um erro ao criar sua conta. Por favor, tente novamente.");
    });
  };

  return (
    <div className="flex justify-center items-center bg-slate-900 min-h-screen p-0 sm:p-4">
      {/* Container Mobile */}
      <div className="w-full max-w-[420px] bg-slate-100 h-screen sm:h-[844px] flex flex-col justify-between relative shadow-2xl overflow-hidden sm:rounded-[44px] border border-slate-300">
        
        {/* Topo Azul com Botão Voltar */}
        <div className="bg-[#15284B] pt-8 px-6 pb-6 rounded-b-[36px] shadow-md shrink-0">
          <div className="flex justify-between items-center mb-3">
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer border border-white/10"
              aria-label="Voltar para o Login"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-emerald-400 stroke-[2.5]" />
              <span className="text-2xl font-black tracking-wider text-white">CIDA</span>
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Criar sua Conta
          </h1>
          <p className="text-slate-300 text-sm font-medium mt-0.5">
            Preencha os campos abaixo para começar
          </p>
        </div>

        {/* Conteúdo Central */}
        <div className="flex-1 px-6 py-5 overflow-y-auto">
          {sucesso ? (
            /* Card de Confirmação de Sucesso */
            <div className="bg-white rounded-3xl p-6 border-2 border-emerald-400 shadow-sm text-center space-y-4 my-auto">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-9 h-9 stroke-[3]" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 leading-tight">
                  Cadastro realizado!
                </h2>
                <p className="text-xs font-semibold text-slate-500 mt-2">
                  Sua conta foi criada com sucesso. Agora você já pode fazer login no CIDA.
                </p>
              </div>
              <button 
                type="button" 
                onClick={() => navigate('/')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all text-white font-extrabold text-base py-3.5 px-4 rounded-2xl shadow-md cursor-pointer mt-2"
              >
                Ir para o Login
              </button>
            </div>
          ) : (
            /* Formulário de Cadastro */
            <form className="space-y-3" onSubmit={handleSubmit}>
              
              {mensagemErro && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 text-xs font-bold p-3 rounded-2xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{mensagemErro}</span>
                </div>
              )}

              {/* Nome Completo */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1 ml-1">
                  Nome Completo
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-500">
                    <User className="w-5 h-5" />
                  </span>
                  <input 
                    type="text" 
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: João da Silva"
                    className="w-full bg-white text-slate-900 font-bold pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 focus:outline-none text-base shadow-sm"
                  />
                </div>
              </div>

              {/* E-mail */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1 ml-1">
                  E-mail
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-500">
                    <Mail className="w-5 h-5" />
                  </span>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full bg-white text-slate-900 font-bold pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 focus:outline-none text-base shadow-sm"
                  />
                </div>
              </div>

              {/* Celular ou CPF */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1 ml-1">
                  Celular ou CPF
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-500">
                    <Phone className="w-5 h-5" />
                  </span>
                  <input 
                    type="text" 
                    value={identificador}
                    onChange={(e) => setIdentificador(e.target.value)}
                    placeholder="(11) 98765-4321"
                    className="w-full bg-white text-slate-900 font-bold pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 focus:outline-none text-base shadow-sm"
                  />
                </div>
              </div>

              {/* Data de Nascimento */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1 ml-1">
                  Data de Nascimento
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-500">
                    <Calendar className="w-5 h-5" />
                  </span>
                  <input 
                    type="date" 
                    value={nascimento}
                    onChange={(e) => setNascimento(e.target.value)}
                    className="w-full bg-white text-slate-900 font-bold pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 focus:outline-none text-base shadow-sm"
                  />
                </div>
              </div>

              {/* Criar Senha */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1 ml-1">
                  Crie uma Senha
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-500">
                    <Lock className="w-5 h-5" />
                  </span>
                  <input 
                    type={showSenha ? "text" : "password"}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Mínimo de 6 caracteres"
                    className="w-full bg-white text-slate-900 font-bold pl-12 pr-12 py-3 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 focus:outline-none text-base shadow-sm"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowSenha(!showSenha)}
                    className="absolute right-2 w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-800 active:scale-90 transition-transform cursor-pointer"
                    aria-label={showSenha ? "Ocultar senha" : "Ver senha"}
                  >
                    {showSenha ? (
                      <Eye className="w-5 h-5 stroke-[2.2]" />
                    ) : (
                      <EyeOff className="w-5 h-5 stroke-[2.2]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirmar Senha */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1 ml-1">
                  Repita a Senha
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-500">
                    <CheckCircle className="w-5 h-5" />
                  </span>
                  <input 
                    type={showConfirmarSenha ? "text" : "password"}
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    placeholder="Digite a mesma senha"
                    className="w-full bg-white text-slate-900 font-bold pl-12 pr-12 py-3 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 focus:outline-none text-base shadow-sm"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}
                    className="absolute right-2 w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-800 active:scale-90 transition-transform cursor-pointer"
                    aria-label={showConfirmarSenha ? "Ocultar confirmação" : "Ver confirmação"}
                  >
                    {showConfirmarSenha ? (
                      <Eye className="w-5 h-5 stroke-[2.2]" />
                    ) : (
                      <EyeOff className="w-5 h-5 stroke-[2.2]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Botão de Envio */}
              <button 
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all text-white font-extrabold text-base py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Concluir Cadastro</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </form>
          )}
        </div>

        {/* Rodapé Retorno */}
        <div className="p-4 pt-1 shrink-0 text-center border-t border-slate-200/80 bg-slate-50/50">
          <span className="text-xs text-slate-600 font-medium">Já tem uma conta cadastrada? </span>
          <button 
            type="button" 
            onClick={() => navigate('/')}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer"
          >
            Entrar agora
          </button>
        </div>

      </div>
    </div>
  );
}