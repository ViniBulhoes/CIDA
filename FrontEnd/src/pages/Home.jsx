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
  X, 
  ShieldAlert,
  Activity
} from 'lucide-react';
import MobileContainer from '../components/MobileContainer';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { 
  getProximaDoseHoje, 
  concluirDoseHoje, 
  getOcorrenciasPorData, 
  registrarOcorrencia 
} from '../utils/rotinaStorage';

export default function Home() {
  const navigate = useNavigate();
  const [proximaDose, setProximaDose] = useState(null);
  
  // Estado do Modal de Ocorrências
  const [modalOcorrenciaAberto, setModalOcorrenciaAberto] = useState(false);
  const [ocorrenciasHoje, setOcorrenciasHoje] = useState([]);
  const [tipoSelecionado, setTipoSelecionado] = useState('Dor ou Mal-estar');
  const [descricaoOcorrencia, setDescricaoOcorrencia] = useState('');
  const [gravidade, setGravidade] = useState('moderada');
  const [abaModal, setAbaModal] = useState('novo'); // 'novo' | 'historico'

  // Carrega a próxima dose do dia
  const carregarDose = () => {
    setProximaDose(getProximaDoseHoje());
  };

  // Carrega ocorrências
  const carregarOcorrencias = () => {
    setOcorrenciasHoje(getOcorrenciasPorData('idoso-1', new Date()));
  };

  useEffect(() => {
    carregarDose();
    carregarOcorrencias();

    const handleAtualizacao = () => {
      carregarDose();
      carregarOcorrencias();
    };

    window.addEventListener('rotina_atualizada', handleAtualizacao);
    window.addEventListener('ocorrencias_atualizadas', handleAtualizacao);
    window.addEventListener('storage', handleAtualizacao);

    return () => {
      window.removeEventListener('rotina_atualizada', handleAtualizacao);
      window.removeEventListener('ocorrencias_atualizadas', handleAtualizacao);
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
    if (!descricaoOcorrencia.trim() && !tipoSelecionado) return;

    registrarOcorrencia(
      'idoso-1',
      tipoSelecionado,
      descricaoOcorrencia || 'Sem observações adicionais.',
      gravidade
    );

    setDescricaoOcorrencia('');
    setTipoSelecionado('Dor ou Mal-estar');
    setAbaModal('historico');
    carregarOcorrencias();
  };

  const tiposRapidos = [
    { label: 'Dor ou Mal-estar', icon: '🤕' },
    { label: 'Tontura ou Enjoo', icon: '💫' },
    { label: 'Queda / Tropeço', icon: '⚠️' },
    { label: 'Pressão / Glicose', icon: '❤️' },
    { label: 'Outro Sintoma', icon: '📝' }
  ];

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
              className="rounded-full transition-transform active:scale-90 hover:opacity-90 cursor-pointer"
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
          
          {/* CARD 1: Próxima Dose (Sincronizado) */}
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

          {/* CARD 2: BOTÃO QUE ABRE O MODAL DE OCORRÊNCIAS */}
          <div 
            onClick={() => setModalOcorrenciaAberto(true)}
            className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200/80 rounded-3xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-[0.99] flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center shadow-sm shrink-0">
                <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-slate-900">Como você está se sentindo?</h3>
                  {ocorrenciasHoje.length > 0 && (
                    <span className="text-[10px] font-extrabold bg-red-500 text-white px-2 py-0.5 rounded-full">
                      {ocorrenciasHoje.length} hoje
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Clique aqui para registrar uma dor, tontura ou ocorrência
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs text-slate-400">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>

          {/* Atalhos Rápidos */}
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

        {/* MODAL DE OCORRÊNCIAS */}
        {modalOcorrenciaAberto && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom duration-200 flex flex-col">
              
              {/* Topo do Modal */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">Registro de Ocorrência</h3>
                    <p className="text-xs text-slate-500">Seu cuidador será avisado</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOcorrenciaAberto(false)}
                  className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer active:scale-95"
                  title="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Seletor de Abas (Registrar vs Ver Registros de Hoje) */}
              <div className="flex bg-slate-100 p-1 rounded-2xl my-4 shrink-0">
                <button
                  type="button"
                  onClick={() => setAbaModal('novo')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    abaModal === 'novo' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Novo Registro
                </button>
                <button
                  type="button"
                  onClick={() => setAbaModal('historico')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    abaModal === 'historico' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  <span>Registrados Hoje</span>
                  {ocorrenciasHoje.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                      {ocorrenciasHoje.length}
                    </span>
                  )}
                </button>
              </div>

              {/* ABA 1: NOVO REGISTRO */}
              {abaModal === 'novo' && (
                <form onSubmit={handleSalvarOcorrencia} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-2">
                      O que você está sentindo ou aconteceu?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {tiposRapidos.map((tipo) => (
                        <button
                          key={tipo.label}
                          type="button"
                          onClick={() => setTipoSelecionado(tipo.label)}
                          className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-center gap-2 ${
                            tipoSelecionado === tipo.label
                              ? 'border-red-500 bg-red-50 text-slate-900 font-extrabold shadow-xs'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold'
                          }`}
                        >
                          <span className="text-xl">{tipo.icon}</span>
                          <span className="text-xs leading-tight">{tipo.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Intensidade
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'leve', label: 'Leve', color: 'hover:bg-emerald-50 text-emerald-700 border-emerald-300' },
                        { id: 'moderada', label: 'Moderada', color: 'hover:bg-amber-50 text-amber-700 border-amber-300' },
                        { id: 'urgente', label: 'Muito Forte', color: 'hover:bg-red-50 text-red-700 border-red-400' }
                      ].map(g => (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setGravidade(g.id)}
                          className={`py-2 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                            gravidade === g.id
                              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                              : `bg-slate-50 ${g.color}`
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Quer descrever com mais detalhes? (Opcional)
                    </label>
                    <textarea
                      rows="3"
                      value={descricaoOcorrencia}
                      onChange={(e) => setDescricaoOcorrencia(e.target.value)}
                      placeholder="Ex: Tive uma pontada na cabeça depois do café..."
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
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-md cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Registrar</span>
                    </button>
                  </div>
                </form>
              )}

              {/* ABA 2: HISTÓRICO DE HOJE */}
              {abaModal === 'historico' && (
                <div className="space-y-3">
                  {ocorrenciasHoje.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                        <Activity className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-bold text-slate-600">Nenhuma ocorrência registrada hoje.</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Que ótimo! Sinal de que o dia está tranquilo.</p>
                    </div>
                  ) : (
                    ocorrenciasHoje.map((item) => (
                      <div 
                        key={item.id}
                        className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {item.horario}
                          </span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                            item.gravidade === 'urgente' 
                              ? 'bg-red-100 text-red-700' 
                              : item.gravidade === 'moderada' 
                                ? 'bg-amber-100 text-amber-700' 
                                : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {item.gravidade}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-800">{item.tipo}</h4>
                        <p className="text-xs text-slate-600 font-medium">{item.descricao}</p>
                      </div>
                    ))
                  )}

                  <button
                    type="button"
                    onClick={() => setAbaModal('novo')}
                    className="w-full mt-3 bg-slate-900 text-white font-bold text-xs py-3 rounded-2xl cursor-pointer hover:bg-slate-800 transition-colors"
                  >
                    + Adicionar Outra Ocorrência
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      <BottomNav />
    </MobileContainer>
  );
}
