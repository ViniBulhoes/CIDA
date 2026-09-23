import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle2, Clock, RotateCcw } from 'lucide-react';
import MobileContainer from '../components/MobileContainer';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { getAtividadesPorData, concluirDoseNaData, desfazerDoseNaData, formatarDataChave } from '../utils/rotinaStorage';

export default function Rotina() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const dateInputRef = useRef(null);
  const [atividades, setAtividades] = useState([]);

  // Recarrega as atividades da data selecionada
  const carregarAtividadesDia = () => {
    setAtividades(getAtividadesPorData(currentDate));
  };

  useEffect(() => {
    carregarAtividadesDia();

    const handleAtualizacao = () => carregarAtividadesDia();
    window.addEventListener('rotina_atualizada', handleAtualizacao);
    window.addEventListener('storage', handleAtualizacao);

    return () => {
      window.removeEventListener('rotina_atualizada', handleAtualizacao);
      window.removeEventListener('storage', handleAtualizacao);
    };
  }, [currentDate]);

  // Confirmar dose
  const handleConfirmar = (id) => {
    concluirDoseNaData(currentDate, id);
    carregarAtividadesDia();
  };

  // Desfazer dose confirmada por engano
  const handleDesfazer = (id) => {
    desfazerDoseNaData(currentDate, id);
    carregarAtividadesDia();
  };

  const mudarDia = (dias) => {
    setCurrentDate((prevDate) => {
      const novaData = new Date(prevDate);
      novaData.setDate(novaData.getDate() + dias);
      return novaData;
    });
  };

  const handleDateChange = (e) => {
    if (!e.target.value) return;
    const [ano, mes, dia] = e.target.value.split('-').map(Number);
    setCurrentDate(new Date(ano, mes - 1, dia));
  };

  const abrirCalendario = () => {
    if (dateInputRef.current) {
      if ('showPicker' in HTMLInputElement.prototype) {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  const formatarData = (data) => {
    const hoje = new Date();
    const ehHoje = data.toDateString() === hoje.toDateString();
    
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);
    const ehAmanha = data.toDateString() === amanha.toDateString();

    const ontem = new Date(hoje);
    ontem.setDate(hoje.getDate() - 1);
    const ehOntem = data.toDateString() === ontem.toDateString();

    const dia = data.getDate();
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const mes = meses[data.getMonth()];

    if (ehHoje) return `Hoje, ${dia} de ${mes}`;
    if (ehAmanha) return `Amanhã, ${dia} de ${mes}`;
    if (ehOntem) return `Ontem, ${dia} de ${mes}`;

    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return `${diasSemana[data.getDay()]}, ${dia} de ${mes}`;
  };

  // Descobre o ID da próxima dose pendente imediata
  const proximaDoseId = atividades.find(item => !item.concluido)?.id;

  return (
    <MobileContainer>
      <div className="flex-1 overflow-y-auto">
        
        {/* Topo com Header */}
        <Header
          title="Minha Rotina"
          rightAction={
            <button 
              type="button" 
              onClick={() => navigate('/perfil')}
              title="Ir para o Perfil"
              aria-label="Ir para o Perfil"
              className="rounded-full transition-transform active:scale-90 hover:opacity-90 cursor-pointer focus:outline-none"
            >
              <img 
                src="https://images.pexels.com/photos/8439740/pexels-photo-8439740.jpeg" 
                alt="Foto de perfil de Seu João" 
                className="w-11 h-11 rounded-full object-cover border-2 border-white/80 shadow"
              />
            </button>
          }
        >
          {/* Navegador de Datas Interativo */}
          <div className="relative flex items-center justify-between bg-white/10 backdrop-blur-md rounded-2xl py-2 px-3 border border-white/15 text-white shadow-inner mt-3">
            
            <input 
              ref={dateInputRef}
              type="date" 
              value={formatarDataChave(currentDate)}
              onChange={handleDateChange}
              className="absolute inset-0 opacity-0 pointer-events-none w-full h-full"
              tabIndex={-1}
              aria-hidden="true"
            />

            <button 
              type="button" 
              onClick={() => mudarDia(-1)}
              aria-label="Dia anterior"
              className="w-10 h-10 flex items-center justify-center hover:bg-white/20 active:scale-90 rounded-xl transition-all cursor-pointer z-10"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={abrirCalendario}
              title="Clique para escolher uma data no calendário"
              className="flex items-center gap-2 py-1.5 px-3 rounded-xl hover:bg-white/20 active:scale-95 transition-all cursor-pointer z-10"
            >
              <CalendarIcon className="w-4 h-4 opacity-80" />
              <span className="font-extrabold text-sm tracking-wide select-none">
                {formatarData(currentDate)}
              </span>
            </button>

            <button 
              type="button" 
              onClick={() => mudarDia(1)}
              aria-label="Próximo dia"
              className="w-10 h-10 flex items-center justify-center hover:bg-white/20 active:scale-90 rounded-xl transition-all cursor-pointer z-10"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </Header>

        {/* Linha do Tempo Contínua e Lista de Cuidados */}
        <div className="px-4 pt-6 pb-6">
          <div className="space-y-4">
            
            {atividades.map((item, index) => {
              const estaTomado = item.concluido;
              const ehProximaDose = item.id === proximaDoseId;
              const isUltimo = index === atividades.length - 1;

              const corLinha = estaTomado 
                ? 'bg-emerald-400' 
                : ehProximaDose 
                  ? 'bg-amber-400' 
                  : 'bg-slate-200';

              const corBolinha = estaTomado 
                ? 'bg-emerald-500' 
                : ehProximaDose 
                  ? 'bg-amber-500' 
                  : 'bg-slate-300';

              return (
                <div key={item.id} className="relative pl-6">
                  
                  {/* Linha vertical que acompanha o card até o próximo */}
                  <div 
                    className={`absolute left-[6px] top-4 ${
                      isUltimo ? 'bottom-4' : 'bottom-[-16px]'
                    } w-0.5 ${corLinha} transition-colors`}
                  />

                  {/* Marcador (Bolinha) */}
                  <div 
                    className={`absolute left-0 top-3.5 w-3.5 h-3.5 rounded-full ring-4 ring-slate-100 z-10 ${corBolinha} transition-colors`}
                  />

                  {/* Card da Atividade */}
                  <div 
                    className={`bg-white rounded-2xl p-4 transition-all ${
                      estaTomado 
                        ? 'border-2 border-emerald-400 bg-emerald-50/15 shadow-sm' 
                        : ehProximaDose 
                          ? 'border-2 border-amber-400 shadow-md ring-2 ring-amber-400/20' 
                          : 'border border-slate-200 shadow-xs opacity-90'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <span className="text-xs font-black text-slate-900">{item.horario}</span>
                      
                      <span 
                        className={`font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          estaTomado 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : ehProximaDose 
                              ? 'bg-amber-100 text-amber-800' 
                              : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {estaTomado 
                          ? 'Tomado' 
                          : ehProximaDose 
                            ? 'Próxima Dose' 
                            : 'Pendente'}
                      </span>
                    </div>

                    <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                      {item.titulo}
                    </h3>
                    
                    <p className="text-xs text-slate-500 font-medium mt-0.5 mb-3.5">
                      {item.detalhe}
                    </p>

                    {/* Ações: Tomado (com Desfazer) vs Pendentes */}
                    {estaTomado ? (
                      <div className="flex items-center justify-between pt-1 border-t border-emerald-100/60">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                          <span>Dose concluída</span>
                        </div>
                        
                        {/* BOTÃO DESFAZER */}
                        <button
                          type="button"
                          onClick={() => handleDesfazer(item.id)}
                          className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg cursor-pointer active:scale-95 transition-all"
                          title="Clique caso tenha marcado por engano"
                        >
                          <RotateCcw className="w-3 h-3 text-slate-400" />
                          <span>Desfazer</span>
                        </button>
                      </div>
                    ) : ehProximaDose ? (
                      <button 
                        type="button" 
                        onClick={() => handleConfirmar(item.id)}
                        className="w-full bg-[#FA8C16] hover:bg-[#d97706] active:scale-[0.98] transition-all text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                        <span>Confirmar Realizado</span>
                      </button>
                    ) : (
                      <button 
                        type="button" 
                        onClick={() => handleConfirmar(item.id)}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>Confirmar Antecipado</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

          </div>
        </div>

      </div>

      <BottomNav />
    </MobileContainer>
  );
}