import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HeartHandshake, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Pill, 
  Calendar, 
  UserCheck, 
  X, 
  Plus,
  ChevronDown,
  Check
} from 'lucide-react';
import MobileContainer from '../components/MobileContainer';
import { 
  getAtividadesPorIdosoEData, 
  adicionarAtividade, 
  concluirDoseNaData 
} from '../utils/rotinaStorage';

export default function PainelCuidador() {
  const navigate = useNavigate();

  // Lista de idosos vinculados ao cuidador
  const [listaIdosos] = useState([
    {
      id: 'idoso-1',
      nome: 'Seu João da Silva',
      idade: 78,
      foto: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=160&auto=format&fit=crop&q=80',
      telefone: '(11) 98765-4321',
      statusGeral: 'Monitoramento Ativo'
    },
    {
      id: 'idoso-2',
      nome: 'Dona Maria Antônia',
      idade: 75,
      foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80',
      telefone: '(11) 97654-3210',
      statusGeral: 'Monitoramento Ativo'
    }
  ]);

  // ID do idoso ativo
  const [idosoSelecionadoId, setIdosoSelecionadoId] = useState('idoso-1');
  const [modalIdososAberto, setModalIdososAberto] = useState(false);

  // Atividades do idoso ativo carregadas da fonte única de dados
  const [atividadesHoje, setAtividadesHoje] = useState([]);

  // Recarrega as atividades do idoso selecionado
  const carregarAtividades = () => {
    setAtividadesHoje(getAtividadesPorIdosoEData(idosoSelecionadoId, new Date()));
  };

  useEffect(() => {
    carregarAtividades();

    // Ouve alterações globais (ex: quando o idoso marca na Home ou na Rotina)
    const handleAtualizacao = () => carregarAtividades();
    window.addEventListener('rotina_atualizada', handleAtualizacao);
    window.addEventListener('storage', handleAtualizacao);

    return () => {
      window.removeEventListener('rotina_atualizada', handleAtualizacao);
      window.removeEventListener('storage', handleAtualizacao);
    };
  }, [idosoSelecionadoId]);

  // Idoso ativo atual
  const idosoAtivo = listaIdosos.find(i => i.id === idosoSelecionadoId) || listaIdosos[0];

  // Modais de ações rápidas
  const [modalRemedioAberto, setModalRemedioAberto] = useState(false);
  const [modalLembreteAberto, setModalLembreteAberto] = useState(false);

  // Campos do formulário de remédio
  const [remedioNome, setRemedioNome] = useState('');
  const [remedioDosagem, setRemedioDosagem] = useState('');
  const [remedioHorario, setRemedioHorario] = useState('08:00');
  const [remedioInstrucao, setRemedioInstrucao] = useState('');

  // Campos do formulário de lembrete
  const [lembreteTitulo, setLembreteTitulo] = useState('');
  const [lembreteHorario, setLembreteHorario] = useState('09:00');
  const [lembreteDetalhe, setLembreteDetalhe] = useState('');

  // Confirmar dose pelo painel do cuidador
  const marcarComoRealizado = (id) => {
    concluirDoseNaData(new Date(), id, idosoAtivo.id);
    carregarAtividades();
  };

  // Salvar novo remédio diretamente na rotina compartilhada
  const handleSalvarRemedio = (e) => {
    e.preventDefault();
    if (!remedioNome.trim()) return;

    adicionarAtividade(
      idosoAtivo.id,
      {
        horario: remedioHorario,
        titulo: `${remedioNome} ${remedioDosagem}`.trim(),
        detalhe: remedioInstrucao || 'Conforme orientação médica',
        tipo: 'remedio'
      },
      new Date()
    );

    setRemedioNome('');
    setRemedioDosagem('');
    setRemedioHorario('08:00');
    setRemedioInstrucao('');
    setModalRemedioAberto(false);
    carregarAtividades();
  };

  // Salvar novo lembrete diretamente na rotina compartilhada
  const handleSalvarLembrete = (e) => {
    e.preventDefault();
    if (!lembreteTitulo.trim()) return;

    adicionarAtividade(
      idosoAtivo.id,
      {
        horario: lembreteHorario,
        titulo: lembreteTitulo.trim(),
        detalhe: lembreteDetalhe || 'Compromisso programado',
        tipo: 'lembrete'
      },
      new Date()
    );

    setLembreteTitulo('');
    setLembreteHorario('09:00');
    setLembreteDetalhe('');
    setModalLembreteAberto(false);
    carregarAtividades();
  };

  // Contagem dinâmica das tarefas
  const dosesConcluidas = atividadesHoje.filter(a => a.concluido).length;
  const totalDoses = atividadesHoje.length;

  return (
    <MobileContainer>
      <div className="flex-1 flex flex-col overflow-y-auto relative">
        
        {/* Topo Azul do Painel */}
        <header className="shrink-0 rounded-b-[36px] bg-[#15284B] px-6 pb-6 pt-8 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            
            {/* Botão que abre o seletor de idosos */}
            <button
              type="button"
              onClick={() => setModalIdososAberto(true)}
              className="flex items-center gap-2 group cursor-pointer active:scale-95 transition-all text-left"
              title="Trocar idoso"
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/20 flex items-center justify-center text-blue-300 group-hover:bg-blue-500/30">
                <HeartHandshake className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-wide text-white group-hover:text-blue-100">
                  Painel Cuidador
                </span>
                <ChevronDown className="w-4 h-4 text-blue-300 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </button>

            {/* Botão Sair */}
            <button
              type="button"
              onClick={() => navigate('/login-cuidador')}
              title="Sair do painel"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-slate-300 hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>

          {/* Card do Idoso Selecionado */}
          <div 
            onClick={() => setModalIdososAberto(true)}
            className="bg-white/10 border border-white/15 rounded-3xl p-4 text-white backdrop-blur-sm cursor-pointer hover:bg-white/[0.14] transition-all"
            title="Clique para trocar de idoso"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={idosoAtivo.foto} 
                  alt={idosoAtivo.nome} 
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white/40 shadow-sm"
                />
                <div>
                  <h2 className="text-base font-extrabold leading-snug">{idosoAtivo.nome}</h2>
                  <p className="text-xs text-blue-200">{idosoAtivo.idade} anos • {idosoAtivo.statusGeral}</p>
                  <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    <UserCheck className="w-3 h-3" />
                    {totalDoses > 0 ? `${dosesConcluidas} de ${totalDoses} atividades feitas` : 'Sem atividades hoje'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Ligando para ${idosoAtivo.nome}: ${idosoAtivo.telefone}`);
                }}
                className="w-11 h-11 bg-emerald-500 hover:bg-emerald-600 active:scale-90 text-white rounded-2xl flex items-center justify-center shadow-lg transition-transform cursor-pointer"
                title="Ligar para o idoso"
              >
                <Phone className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="px-5 pt-5 pb-6 space-y-5">
          
          {/* Ações Rápidas */}
          <div>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 px-1">
              Ações Rápidas
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={() => setModalRemedioAberto(true)}
                className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center gap-3 text-left cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">Novo Remédio</span>
                  <span className="text-[11px] text-slate-500">Adicionar à rotina</span>
                </div>
              </button>

              <button 
                type="button"
                onClick={() => setModalLembreteAberto(true)}
                className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center gap-3 text-left cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">Lembrete</span>
                  <span className="text-[11px] text-slate-500">Consultas/Tarefas</span>
                </div>
              </button>
            </div>
          </div>

          {/* Acompanhamento do Dia Sincronizado */}
          <div>
            <div className="flex justify-between items-center mb-3 px-1">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Acompanhamento do Dia</h3>
                <p className="text-[11px] text-slate-500">Status dos horários programados</p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-100">
                Hoje
              </span>
            </div>

            {atividadesHoje.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center">
                <p className="text-xs font-bold text-slate-500">Nenhuma atividade agendada para hoje.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {atividadesHoje.map((item) => (
                  <div 
                    key={item.id}
                    className={`bg-white rounded-2xl p-4 border transition-all ${
                      item.concluido 
                        ? 'border-emerald-200 shadow-sm bg-emerald-50/20' 
                        : 'border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex gap-3">
                        <div className="pt-0.5">
                          {item.concluido ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <Clock className="w-5 h-5 text-amber-500" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-slate-900">{item.horario}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              item.concluido 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {item.concluido ? 'Concluído' : 'Pendente'}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-800 mt-1">{item.titulo}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">{item.detalhe}</p>
                        </div>
                      </div>

                      {!item.concluido && (
                        <button
                          type="button"
                          onClick={() => marcarComoRealizado(item.id)}
                          className="text-[11px] font-bold bg-[#15284B] hover:bg-[#1e3b6e] text-white px-3 py-1.5 rounded-xl cursor-pointer active:scale-95 transition-transform shrink-0"
                        >
                          Confirmar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </main>

        {/* Modal de Seleção de Idoso */}
        {modalIdososAberto && (
          <div className="absolute inset-0 z-50 bg-[#15284B] flex flex-col p-6 animate-in fade-in duration-200 overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-blue-300">
                  <HeartHandshake className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Selecionar Idoso</h3>
                  <p className="text-xs text-blue-200">Escolha quem você deseja acompanhar agora</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalIdososAberto(false)}
                className="w-10 h-10 rounded-2xl bg-white/10 text-white/70 hover:text-white hover:bg-white/20 flex items-center justify-center cursor-pointer active:scale-90 transition-all"
                title="Fechar seleção"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 py-5 space-y-3.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-200 block px-1">
                Idosos sob seus cuidados ({listaIdosos.length})
              </span>

              {listaIdosos.map((idoso) => {
                const isSelected = idoso.id === idosoAtivo.id;
                const tarefasIdoso = getAtividadesPorIdosoEData(idoso.id, new Date());
                const feitas = tarefasIdoso.filter(t => t.concluido).length;
                const total = tarefasIdoso.length;

                return (
                  <div
                    key={idoso.id}
                    onClick={() => {
                      setIdosoSelecionadoId(idoso.id);
                      setModalIdososAberto(false);
                    }}
                    className={`rounded-3xl p-4 text-white transition-all cursor-pointer border relative ${
                      isSelected 
                        ? 'bg-white/15 border-emerald-400 shadow-lg shadow-black/20 ring-2 ring-emerald-400/40' 
                        : 'bg-white/10 border-white/15 hover:bg-white/[0.14]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <img 
                          src={idoso.foto} 
                          alt={idoso.nome} 
                          className={`w-14 h-14 rounded-2xl object-cover border-2 shadow-sm ${
                            isSelected ? 'border-emerald-400' : 'border-white/30'
                          }`}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-extrabold leading-snug">{idoso.nome}</h4>
                            {isSelected && (
                              <span className="flex items-center gap-0.5 text-[10px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                                <Check className="w-3 h-3 stroke-[3]" />
                                Ativo
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-blue-200 mt-0.5">
                            {idoso.idade} anos • {idoso.statusGeral}
                          </p>
                          <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-bold text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                            <UserCheck className="w-3 h-3" />
                            {total > 0 ? `${feitas} de ${total} atividades feitas` : 'Sem atividades'}
                          </span>
                        </div>
                      </div>

                      <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white/80">
                        <Phone className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <footer className="pt-2 text-center text-xs text-blue-300/80 shrink-0">
              Toque no idoso para carregar sua rotina e remédios.
            </footer>
          </div>
        )}

        {/* Modal 1: Novo Remédio */}
        {modalRemedioAberto && (
          <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white w-full rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Novo Remédio</h3>
                    <p className="text-[11px] font-semibold text-emerald-600">
                      Para: {idosoAtivo.nome}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setModalRemedioAberto(false)}
                  className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSalvarRemedio} className="space-y-3.5 pt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 ml-1">
                    Nome do Medicamento
                  </label>
                  <input
                    type="text"
                    required
                    value={remedioNome}
                    onChange={(e) => setRemedioNome(e.target.value)}
                    placeholder="Ex: Losartana Potássica"
                    className="w-full bg-slate-50 text-slate-900 font-bold px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none text-sm placeholder:text-slate-400 placeholder:font-normal"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1 ml-1">
                      Dosagem / Miligramas
                    </label>
                    <input
                      type="text"
                      value={remedioDosagem}
                      onChange={(e) => setRemedioDosagem(e.target.value)}
                      placeholder="Ex: 50mg ou 1 comp"
                      className="w-full bg-slate-50 text-slate-900 font-bold px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none text-sm placeholder:text-slate-400 placeholder:font-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1 ml-1">
                      Horário da Dose
                    </label>
                    <input
                      type="time"
                      required
                      value={remedioHorario}
                      onChange={(e) => setRemedioHorario(e.target.value)}
                      className="w-full bg-slate-50 text-slate-900 font-bold px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none text-sm cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 ml-1">
                    Instruções especiais
                  </label>
                  <input
                    type="text"
                    value={remedioInstrucao}
                    onChange={(e) => setRemedioInstrucao(e.target.value)}
                    placeholder="Ex: Tomar após o almoço com água"
                    className="w-full bg-slate-50 text-slate-900 font-bold px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none text-sm placeholder:text-slate-400 placeholder:font-normal"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalRemedioAberto(false)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm py-3.5 rounded-2xl cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal 2: Novo Lembrete */}
        {modalLembreteAberto && (
          <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white w-full rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Novo Lembrete</h3>
                    <p className="text-[11px] font-semibold text-amber-600">
                      Para: {idosoAtivo.nome}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setModalLembreteAberto(false)}
                  className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSalvarLembrete} className="space-y-3.5 pt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 ml-1">
                    Título da Tarefa ou Consulta
                  </label>
                  <input
                    type="text"
                    required
                    value={lembreteTitulo}
                    onChange={(e) => setLembreteTitulo(e.target.value)}
                    placeholder="Ex: Medir Pressão ou Consulta Cardiologista"
                    className="w-full bg-slate-50 text-slate-900 font-bold px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:bg-white focus:outline-none text-sm placeholder:text-slate-400 placeholder:font-normal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 ml-1">
                    Horário Programado
                  </label>
                  <input
                    type="time"
                    required
                    value={lembreteHorario}
                    onChange={(e) => setLembreteHorario(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 font-bold px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:bg-white focus:outline-none text-sm cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 ml-1">
                    Detalhes ou Observações
                  </label>
                  <input
                    type="text"
                    value={lembreteDetalhe}
                    onChange={(e) => setLembreteDetalhe(e.target.value)}
                    placeholder="Ex: Levar os exames anteriores"
                    className="w-full bg-slate-50 text-slate-900 font-bold px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:bg-white focus:outline-none text-sm placeholder:text-slate-400 placeholder:font-normal"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalLembreteAberto(false)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm py-3.5 rounded-2xl cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agendar</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </MobileContainer>
  );
}