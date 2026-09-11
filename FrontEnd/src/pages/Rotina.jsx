import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MobileContainer from '../components/MobileContainer';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

export default function Rotina() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const mudarDia = (dias) => {
    setCurrentDate((prevDate) => {
      const novaData = new Date(prevDate);
      novaData.setDate(novaData.getDate() + dias);
      return novaData;
    });
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

  return (
    <MobileContainer>
      {/* Área Rolável de Conteúdo */}
      <div className="flex-1 overflow-y-auto">
        
        {/* Topo Azul Componentizado */}
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
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80" 
                alt="Foto de perfil de Seu João" 
                className="w-11 h-11 rounded-full object-cover border-2 border-white/80 shadow"
              />
            </button>
          }
        >
          {/* Navegador de Datas Interativo como filho do Header */}
          <div className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-2xl py-2 px-3 border border-white/15 text-white shadow-inner mt-3">
            <button 
              type="button" 
              onClick={() => mudarDia(-1)}
              aria-label="Dia anterior"
              className="w-10 h-10 flex items-center justify-center hover:bg-white/20 active:scale-90 rounded-xl transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            <span className="font-extrabold text-sm tracking-wide select-none">
              {formatarData(currentDate)}
            </span>

            <button 
              type="button" 
              onClick={() => mudarDia(1)}
              aria-label="Próximo dia"
              className="w-10 h-10 flex items-center justify-center hover:bg-white/20 active:scale-90 rounded-xl transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </Header>

        {/* Linha do Tempo e Lista de Cuidados */}
        <div className="px-5 pt-6 pb-6">
          <div className="relative border-l-2 border-slate-300 ml-3.5 pl-6 space-y-6">
            
            {/* Item 1: 08:00 - Tomado */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-slate-100"></div>

              <div className="bg-white rounded-2xl p-4 border-2 border-emerald-400 shadow-sm">
                <div className="flex justify-between items-start mb-1.5">
                  <span className="text-xs font-black text-slate-900">08:00</span>
                  <span className="bg-emerald-100 text-emerald-700 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Tomado
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  Café da manhã e Insulina
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Aplicar 10 unidades antes de comer.
                </p>
              </div>
            </div>

            {/* Item 2: 10:00 - Pendente */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-slate-100"></div>

              <div className="bg-white rounded-2xl p-4 border-2 border-amber-300 shadow-sm">
                <div className="flex justify-between items-start mb-1.5">
                  <span className="text-xs font-black text-slate-900">10:00</span>
                  <span className="bg-amber-100 text-amber-700 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Pendente
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  Losartana 50mg
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5 mb-3.5">
                  Tomar com um copo cheio de água.
                </p>
                
                <button 
                  type="button" 
                  onClick={() => alert("Dose confirmada!")}
                  className="w-full bg-[#FA8C16] hover:bg-[#d97706] active:scale-[0.98] transition-all text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Confirmar Realizado
                </button>
              </div>
            </div>

            {/* Item 3: 13:00 - Pendente */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-400 ring-4 ring-slate-100"></div>

              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-1.5">
                  <span className="text-xs font-black text-slate-900">13:00</span>
                  <span className="bg-slate-100 text-slate-600 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Pendente
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  Almoço saudável
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5 mb-3.5">
                  Evitar alimentos com muito sal.
                </p>
                
                <button 
                  type="button" 
                  onClick={() => alert("Almoço confirmado!")}
                  className="w-full bg-[#15284B] hover:bg-[#1f3a6d] active:scale-[0.98] transition-all text-white font-bold text-xs py-3 px-4 rounded-xl shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Confirmar Realizado
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Footer Componentizado */}
      <BottomNav />
    </MobileContainer>
  );
}