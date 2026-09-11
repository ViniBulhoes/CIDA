import { useNavigate } from 'react-router-dom';
import { Ambulance, Pill, Calendar, FileText, Phone } from 'lucide-react';
import MobileContainer from '../components/MobileContainer';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

export default function Home() {
  const navigate = useNavigate();

  return (
    <MobileContainer>
      {/* Scroll do Conteúdo */}
      <div className="flex-1 overflow-y-auto">
        
        {/* Topo Azul Componentizado */}
        <Header 
          title="Olá, Seu João!" 
          subtitle="Cuidado para idosos"
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
          {/* Botão SOS Emergência injetado como filho do Header */}
          <button 
            type="button"
            onClick={() => alert("SOS Disparado!")}
            className="w-full bg-[#E02938] hover:bg-red-700 active:scale-[0.98] transition-all text-white rounded-2xl py-4 px-5 flex items-center justify-center gap-3 shadow-lg shadow-black/25 cursor-pointer mt-4"
          >
            <Ambulance className="w-7 h-7 stroke-[2.5]" />
            <span className="text-xl font-black tracking-wider uppercase">
              SOS EMERGÊNCIA
            </span>
          </button>
        </Header>

        {/* Área Branca Central */}
        <div className="px-5 pt-5 pb-6">
          {/* Card Próxima Dose */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between mb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                <Pill className="w-6 h-6 rotate-45 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block">
                  PRÓXIMA DOSE
                </span>
                <p className="text-base font-extrabold text-slate-900 leading-tight">
                  10:00 - Losartana
                </p>
                <span className="text-xs font-semibold text-slate-500">50mg</span>
              </div>
            </div>

            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Cuidadora responsável" 
              className="w-9 h-9 rounded-full object-cover border border-slate-200"
            />
          </div>

          {/* Atalhos Rápidos */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 px-1">
              Atalhos rápidos
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button" 
                onClick={() => navigate('/remedios')}
                className="bg-white p-4 rounded-2xl border-2 border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col items-start gap-2.5 text-left active:scale-[0.98] cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100/70 flex items-center justify-center text-emerald-700">
                  <Pill className="w-5 h-5 rotate-45 stroke-[2.4]" />
                </div>
                <span className="font-bold text-slate-900 text-sm leading-snug">
                  Meus Remédios
                </span>
              </button>

              <button 
                type="button" 
                onClick={() => navigate('/rotina')}
                className="bg-white p-4 rounded-2xl border-2 border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-300 transition-all flex flex-col items-start gap-2.5 text-left active:scale-[0.98] cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100/70 flex items-center justify-center text-amber-700">
                  <Calendar className="w-5 h-5 stroke-[2.4]" />
                </div>
                <span className="font-bold text-slate-900 text-sm leading-snug">
                  Minha Rotina
                </span>
              </button>

              <button 
                type="button" 
                onClick={() => alert("Módulo de Ocorrências em breve")}
                className="bg-white p-4 rounded-2xl border-2 border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-start gap-2.5 text-left active:scale-[0.98] cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100/70 flex items-center justify-center text-blue-700">
                  <FileText className="w-5 h-5 stroke-[2.4]" />
                </div>
                <span className="font-bold text-slate-900 text-sm leading-snug">
                  Ocorrências
                </span>
              </button>

              <button 
                type="button" 
                onClick={() => navigate('/perfil')}
                className="bg-white p-4 rounded-2xl border-2 border-slate-200/80 shadow-sm hover:shadow-md hover:border-purple-300 transition-all flex flex-col items-start gap-2.5 text-left active:scale-[0.98] cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-100/70 flex items-center justify-center text-purple-700">
                  <Phone className="w-5 h-5 stroke-[2.4]" />
                </div>
                <span className="font-bold text-slate-900 text-sm leading-snug">
                  Contatos
                </span>
              </button>
            </div>
          </section>

        </div>
      </div>

      {/* Footer Componentizado */}
      <BottomNav />
    </MobileContainer>
  );
}