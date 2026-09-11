import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Lock, 
  CheckCircle, 
  Eye, 
  EyeOff, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export default function RecuperarSenha() {
  const navigate = useNavigate();

  const [identificador, setIdentificador] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  
  const [mensagemErro, setMensagemErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensagemErro("");

    if (!identificador.trim()) {
      setMensagemErro("Informe seu celular ou CPF.");
      return;
    }

    if (novaSenha.length < 6) {
      setMensagemErro("A nova senha deve ter no mínimo 6 números ou letras.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMensagemErro("As duas senhas não coincidem.");
      return;
    }

    const payload = {
      identificador: identificador.trim(),
      novaSenha: novaSenha
    };
    console.log("Enviando para o backend:", payload);

    setSucesso(true);
  };

  return (
    <div className="flex justify-center items-center bg-slate-900 min-h-screen p-0 sm:p-4">
      {/* Container Mobile Padrão */}
      <div className="w-full max-w-[420px] bg-slate-100 h-screen sm:h-[844px] flex flex-col justify-between relative shadow-2xl overflow-hidden sm:rounded-[44px] border border-slate-300">
        
        {/* Topo Azul com Botão Voltar */}
        <div className="bg-[#15284B] pt-8 px-6 pb-7 rounded-b-[36px] shadow-md shrink-0">
          <div className="flex justify-between items-center mb-4">
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
            Criar Nova Senha
          </h1>
          <p className="text-slate-300 text-sm font-medium mt-1">
            Altere seus dados para voltar a acessar sua rotina
          </p>
        </div>

        {/* Conteúdo Central */}
        <div className="flex-1 px-6 py-6 flex flex-col justify-center overflow-y-auto">
          {sucesso ? (
            /* Card de Confirmação de Sucesso */
            <div className="bg-white rounded-3xl p-6 border-2 border-emerald-400 shadow-sm text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-9 h-9 stroke-[3]" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 leading-tight">
                  Senha alterada com sucesso!
                </h2>
                <p className="text-xs font-semibold text-slate-500 mt-2">
                  Sua nova senha foi salva. Você já pode entrar com ela.
                </p>
              </div>
              <button 
                type="button"
                onClick={() => navigate('/')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all text-white font-extrabold text-base py-3.5 px-4 rounded-2xl shadow-md cursor-pointer mt-2"
              >
                Voltar para o Login
              </button>
            </div>
          ) : (
            /* Formulário de Redefinição */
            <form className="space-y-4" onSubmit={handleSubmit}>
              
              {mensagemErro && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 text-xs font-bold p-3 rounded-2xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{mensagemErro}</span>
                </div>
              )}

              {/* Campo 1: Identificador */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1.5 ml-1">
                  Seu Celular ou CPF
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-500">
                    <User className="w-5 h-5" />
                  </span>
                  <input 
                    type="text" 
                    value={identificador}
                    onChange={(e) => setIdentificador(e.target.value)}
                    placeholder="(11) 98765-4321"
                    className="w-full bg-white text-slate-900 font-bold pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 focus:outline-none text-base shadow-sm"
                  />
                </div>
              </div>

              {/* Campo 2: Nova Senha */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1.5 ml-1">
                  Nova Senha
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-500">
                    <Lock className="w-5 h-5" />
                  </span>
                  <input 
                    type={showNovaSenha ? "text" : "password"}
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    placeholder="Mínimo de 6 dígitos"
                    className="w-full bg-white text-slate-900 font-bold pl-12 pr-12 py-3.5 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 focus:outline-none text-base shadow-sm"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowNovaSenha(!showNovaSenha)}
                    className="absolute right-2 w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-800 active:scale-90 transition-transform cursor-pointer"
                    aria-label={showNovaSenha ? "Ocultar senha" : "Ver senha"}
                  >
                    {showNovaSenha ? (
                      <Eye className="w-5 h-5 stroke-[2.2]" />
                    ) : (
                      <EyeOff className="w-5 h-5 stroke-[2.2]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Campo 3: Confirmar Nova Senha */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1.5 ml-1">
                  Repita a Nova Senha
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
                    className="w-full bg-white text-slate-900 font-bold pl-12 pr-12 py-3.5 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 focus:outline-none text-base shadow-sm"
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

              {/* Botão de Gravar */}
              <button 
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all text-white font-extrabold text-base py-4 px-6 rounded-2xl shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 cursor-pointer pt-3"
              >
                <span>Salvar Nova Senha</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </form>
          )}
        </div>

        {/* Rodapé de Apoio ao Usuário */}
        <div className="p-6 pt-0 shrink-0 text-center">
          <button 
            type="button" 
            onClick={() => alert("Ligando para suporte ao idoso ou cuidador")}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 underline p-2 cursor-pointer"
          >
            Precisa de ajuda de um atendente? Toque aqui
          </button>
        </div>

      </div>
    </div>
  );
}