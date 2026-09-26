import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Pill, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  HeartPulse, 
  Plus, 
  X 
} from 'lucide-react';
import MobileContainer from '../components/MobileContainer';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { getProximaDoseHoje, concluirDoseHoje } from '../utils/rotinaStorage';

export default function Home() {
  const navigate = useNavigate();
  const [proximaDose, setProximaDose] = useState(null);

  // Estados do Modal de Ocorrência
  const [modalOcorrenciaAberto, setModalOcorrenciaAberto] = useState(false);
  const [tipoOcorrencia, setTipoOcorrencia] = useState('Dor ou Mal-estar');
  const [detalhesOcorrencia, setDetalhesOcorrencia] = useState('');

  // Carrega a dose do dia
  const carregarDose = () => {
    if (typeof getProximaDoseHoje === 'function') {
      setProximaDose(getProximaDoseHoje());
    }
  };

  useEffect(() => {
    carregarDose();

    const handleAtualizacao = () => carregarDose();
    window.addEventListener('rotina_atualizada', handleAtualizacao);
    window.addEventListener('storage', handleAtualizacao);

    return () => {
      window.removeEventListener('rotina_atualizada', handleAtualizacao);
      window.removeEventListener('storage', handleAtualizacao);
    };
  }, []);

  const handleConcluir = () => {
    if (proximaDose) {
      concluirDoseHoje(proximaDose.id);
      carregarDose();
    }
  };

  const handleSalvarOcorrencia = (e) => {
    e.preventDefault();
    alert(`Ocorrência registrada com sucesso: ${tipoOcorrencia}`);
    setDetalhesOcorrencia('');
    setTipoOcorrencia('Dor ou Mal-estar');
    setModalOcorrenciaAberto(false);
  };

  return (
    <MobileContainer>
      <div className="flex-1 overflow-y-auto">
        
        {/* Header do Idoso */}
        <Header
          title="Olá, Seu João! 👋"
          subtitle="Tenha um excelente e tranquilo dia."
          rightAction={
            <button 
              type="button" 
              onClick={() => navigate('/perfil')}
              title="Ir para o Perfil"
              className="rounded-full transition-transform active:scale-90 hover:opacity-90 cursor-pointer focus:outline-none"
            >
              <img 
                src="https://images.pexels.com/photos/8439740/pexels-photo-8439740.jpeg" 
                alt="Foto de perfil de Seu João" 
                className="w-12 h-12 rounded-full object-cover border-2 border-white/80 shadow"
              />
            </button>
          }
        />

        <div className="px-5 pt-5 pb-6 space-y-5">
          
          {/* CARD 1: Próxima Dose */}
          <div className="bg-white rounded-3xl p-5 border-2 border-amber-300 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                Próximo Cuidado
              </span>
              <div className="flex items-center gap-1 text-slate-500 font-bold text-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>Hoje</span>
              </div>
            </div>

            {proximaDose ? (
              <>
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <Pill className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-xl font-black text-slate-900 leading-tight block">
                      {proximaDose.horario}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-800">
                      {proximaDose.titulo}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {proximaDose.detalhe}
                    </p>
                  </div>
                </div>

                <button 
                  type="button" 
                  onClick={handleConcluir}
                  className="w-full bg-[#FA8C16] hover:bg-[#d97706] active:scale-[0.98] transition-all text-white font-extrabold text-sm py-3.5 px-4 rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                  <span>Tomei meu remédio!</span>
                </button>
              </>
            ) : (
              <div className="py-3 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="text-base font-extrabold text-slate-800">Tudo em dia por hoje!</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Você já completou todos os horários agendados para hoje.
                </p>
              </div>
            )}
          </div>

          {/* CARD 2: OCORRÊNCIAS (Ao clicar, abre o modal!) */}
          <div 
            onClick={() => setModalOcorrenciaAberto(true)}
            className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200/80 rounded-3xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-[0.99] flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center shadow-sm shrink-0">
                <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">Como você está se sentindo?</h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Toque aqui para registrar um mal-estar, dor ou queda
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs text-slate-400">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>

          {/* ATALHOS RÁPIDOS */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button 
              type="button" 
              onClick={() => navigate('/rotina')}
              className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all text-left cursor-pointer flex flex-col justify-between h-28"
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-extrabold text-slate-900 block">Minha Rotina</span>
                <span className="text-[11px] text-slate-500">Ver dia a dia</span>
              </div>
            </button>

            <button 
              type="button" 
              onClick={() => navigate('/remedios')}
              className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all text-left cursor-pointer flex flex-col justify-between h-28"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-extrabold text-slate-900 block">Meus Remédios</span>
                <span className="text-[11px] text-slate-500">Caixa de remédios</span>
              </div>
            </button>
          </div>

        </div>

        {/* MODAL DE REGISTRAR OCORRÊNCIA */}
        {modalOcorrenciaAberto && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom duration-200">
              
              {/* Topo do Modal */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">Registrar Ocorrência</h3>
                    <p className="text-xs text-slate-500">Avisar cuidador ou familiar</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOcorrenciaAberto(false)}
                  className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Formulário Rápido */}
              <form onSubmit={handleSalvarOcorrencia} className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5 ml-1">
                    O que você sentiu?
                  </label>
                  <select
                    value={tipoOcorrencia}
                    onChange={(e) => setTipoOcorrencia(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 font-bold px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-red-500 focus:bg-white focus:outline-none text-sm cursor-pointer"
                  >
                    <option value="Dor ou Mal-estar">🤕 Dor ou Mal-estar</option>
                    <option value="Tontura ou Fraqueza">💫 Tontura ou Fraqueza</option>
                    <option value="Queda ou Tropeço">⚠️ Queda ou Tropeço</option>
                    <option value="Pressão alterada">❤️ Pressão alterada</option>
                    <option value="Outro Motivo">📝 Outro sintoma</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 ml-1">
                    Detalhes adicionais (opcional)
                  </label>
                  <textarea
                    rows="3"
                    value={detalhesOcorrencia}
                    onChange={(e) => setDetalhesOcorrencia(e.target.value)}
                    placeholder="Ex: Senti uma tontura leve ao levantar da cama..."
                    className="w-full bg-slate-50 text-slate-900 font-medium px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-red-500 focus:bg-white focus:outline-none text-sm placeholder:text-slate-400"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setModalOcorrenciaAberto(false)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm py-3.5 rounded-2xl cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-md cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Enviar Aviso</span>
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>

      <BottomNav />
    </MobileContainer>
  );
}
