import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Phone, 
  LogOut 
} from 'lucide-react';
import MobileContainer from '../components/MobileContainer';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

export default function Perfil() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm("Deseja realmente sair da sua conta?")) {
      navigate('/');
    }
  };

  return (
    <MobileContainer>
      {/* Área Rolável de Conteúdo */}
      <div className="flex-1 overflow-y-auto">
        
        {/* Topo Azul Componentizado */}
        <Header 
          title="Perfil e Cuidador"
          rightAction={
            <button 
              type="button" 
              onClick={() => navigate('/configuracoes')}
              aria-label="Configurações"
              className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer border border-white/15 shadow-sm"
            >
              <Settings className="w-6 h-6 stroke-[2.2]" />
            </button>
          }
        />

        {/* Corpo da Tela */}
        <div className="px-5 pt-5 pb-6 space-y-6">
          
          {/* Card Principal: Dados do Idoso */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
            <img 
              src="https://images.pexels.com/photos/8439740/pexels-photo-8439740.jpeg" 
              alt="João Silva" 
              className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
            />
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
                João Silva, 74
              </h2>
              <span className="text-xs font-semibold text-slate-500 mt-0.5 block">
                Plano: <span className="text-emerald-700 font-bold">CIDA Premium</span>
              </span>
            </div>
          </div>

          {/* Seção Cuidador Responsável */}
          <section>
            <h3 className="text-base font-bold text-slate-900 mb-3 px-1">
              Cuidador Responsável
            </h3>
            
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" 
                  alt="Enfermeira Ana Beatriz" 
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                    Ana Beatriz (Enfermeira)
                  </h4>
                  <span className="text-xs font-medium text-slate-500 block mt-0.5">
                    Última visita: <strong className="text-slate-700 font-semibold">Hoje às 08:30</strong>
                  </span>
                </div>
              </div>

              <a 
                href="tel:11999999999" 
                aria-label="Ligar para cuidador"
                className="w-10 h-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center text-emerald-600 transition-colors border border-emerald-100 shrink-0"
              >
                <Phone className="w-5 h-5 stroke-[2.2]" />
              </a>
            </div>
          </section>

          {/* Seção Contatos de Emergência */}
          <section>
            <h3 className="text-base font-bold text-slate-900 mb-3 px-1">
              Contatos de Emergência
            </h3>
            
            <div className="space-y-3">
              {/* Contato Familiar */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                    Marcos Silva (Filho)
                  </h4>
                  <span className="text-xs font-semibold text-slate-500 block mt-0.5">
                    (11) 98765-4321
                  </span>
                </div>

                <a 
                  href="tel:11987654321" 
                  aria-label="Ligar para Marcos Silva"
                  className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors border border-slate-200 shrink-0"
                >
                  <Phone className="w-5 h-5 stroke-[2.2]" />
                </a>
              </div>

              {/* Contato SAMU */}
              <div className="bg-white rounded-2xl p-4 border-2 border-red-200 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-tight flex items-center gap-1.5">
                    Ambulância SAMU
                  </h4>
                  <span className="text-xs font-bold text-red-600 block mt-0.5">
                    Ligar 192
                  </span>
                </div>

                <a 
                  href="tel:192" 
                  aria-label="Ligar para o SAMU"
                  className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-600 transition-colors border border-red-200 shrink-0"
                >
                  <Phone className="w-5 h-5 stroke-[2.2]" />
                </a>
              </div>
            </div>
          </section>

          {/* Botão Sair da Conta */}
          <section className="pt-2">
            <button 
              type="button"
              onClick={handleLogout}
              className="w-full bg-white hover:bg-red-50 active:scale-[0.98] transition-all text-red-600 font-bold text-sm py-3.5 px-4 rounded-2xl border-2 border-red-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4 stroke-[2.5]" />
              <span>Sair da Conta</span>
            </button>
          </section>

        </div>
      </div>

      {/* Footer Componentizado */}
      <BottomNav />
    </MobileContainer>
  );
}
