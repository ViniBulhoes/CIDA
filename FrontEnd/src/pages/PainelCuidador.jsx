import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HeartHandshake, 
  LogOut, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Phone, 
  ChevronRight,
  Pill,
  Calendar,
  UserCheck
} from 'lucide-react';
import MobileContainer from '../components/MobileContainer';

export default function PainelCuidador() {
  const navigate = useNavigate();

  // Mock inicial de idoso assistido
  const [idosoAtivo] = useState({
    nome: 'Seu João da Silva',
    idade: 78,
    foto: 'https://images.pexels.com/photos/8439740/pexels-photo-8439740.jpeg',
    telefone: '(11) 98765-4321',
    statusGeral: 'Estável',
    aderenciaHoje: '2 de 3 doses tomadas'
  });

  // Lista de atividades do dia do idoso
  const [atividadesHoje, setAtividadesHoje] = useState([
    {
      id: 1,
      horario: '08:00',
      titulo: 'Café da manhã e Insulina',
      detalhe: '10 unidades antes da refeição',
      status: 'concluido' // concluido | pendente | atrasado
    },
    {
      id: 2,
      horario: '10:00',
      titulo: 'Losartana Potássica 50mg',
      detalhe: 'Tomar com água',
      status: 'concluido'
    },
    {
      id: 3,
      horario: '14:00',
      titulo: 'Metformina 850mg',
      detalhe: 'Após o almoço',
      status: 'pendente'
    }
  ]);

  const marcarComoRealizado = (id) => {
    setAtividadesHoje(prev => 
      prev.map(item => item.id === id ? { ...item, status: 'concluido' } : item)
    );
  };

  return (
    <MobileContainer>
      <div className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Topo Azul do Painel */}
        <header className="shrink-0 rounded-b-[36px] bg-[#15284B] px-6 pb-6 pt-8 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-300">
                <HeartHandshake className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-black tracking-wide text-white">Painel Cuidador</span>
            </div>

            <button
              type="button"
              onClick={() => navigate('/login-cuidador')}
              title="Sair do painel"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-slate-300 hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>

          {/* Card do Idoso Monitorado */}
          <div className="bg-white/10 border border-white/15 rounded-3xl p-4 text-white backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={idosoAtivo.foto} 
                  alt={idosoAtivo.nome} 
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white/40 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-base font-extrabold leading-snug">{idosoAtivo.nome}</h2>
                  </div>
                  <p className="text-xs text-blue-200">{idosoAtivo.idade} anos • Monitoramento Ativo</p>
                  <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    <UserCheck className="w-3 h-3" />
                    {idosoAtivo.aderenciaHoje}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Ligando para ${idosoAtivo.nome}: ${idosoAtivo.telefone}`)}
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
          
          {/* Ações Rápidas de Gerenciamento */}
          <div>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 px-1">
              Ações Rápidas
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={() => alert("Modal ou tela de adicionar remédio")}
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
                onClick={() => alert("Modal de agendar consulta ou evento")}
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

          {/* Monitoramento da Rotina de Hoje */}
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

            <div className="space-y-3">
              {atividadesHoje.map((item) => (
                <div 
                  key={item.id}
                  className={`bg-white rounded-2xl p-4 border transition-all ${
                    item.status === 'concluido' 
                      ? 'border-emerald-200 shadow-sm bg-emerald-50/20' 
                      : 'border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex gap-3">
                      <div className="pt-0.5">
                        {item.status === 'concluido' ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <Clock className="w-5 h-5 text-amber-500" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-slate-900">{item.horario}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            item.status === 'concluido' 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {item.status === 'concluido' ? 'Tomado' : 'Pendente'}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 mt-1">{item.titulo}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{item.detalhe}</p>
                      </div>
                    </div>

                    {item.status === 'pendente' && (
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
          </div>

        </main>
      </div>
    </MobileContainer>
  );
}