import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Mic, 
  ArrowDown, 
  MapPin, 
  Phone 
} from 'lucide-react';
import MobileContainer from '../components/MobileContainer';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

export default function Remedios() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");

  return (
    <MobileContainer>
      {/* Área Rolável de Conteúdo */}
      <div className="flex-1 overflow-y-auto">
        
        {/* Topo Azul Componentizado */}
        <Header
          title="Buscar Remédios"
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
          {/* Barra de Pesquisa inserida como conteúdo filho do Header */}
          <div className="relative flex items-center mt-3">
            <span className="absolute left-4 text-slate-400">
              <Search className="w-5 h-5" />
            </span>
            <input 
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Digite o nome do remédio..."
              className="w-full bg-white text-slate-900 font-semibold pl-12 pr-12 py-3.5 rounded-2xl shadow-inner focus:outline-none text-base border-none placeholder:text-slate-400 placeholder:font-normal"
            />
            <button 
              type="button" 
              onClick={() => alert("Pesquisa por voz em desenvolvimento")}
              className="absolute right-3 p-1.5 text-red-500 hover:text-red-600 transition-colors cursor-pointer"
              aria-label="Pesquisa por voz"
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </Header>

        {/* Listagem de Resultados e Farmácias */}
        <div className="px-5 pt-5 pb-6">
          
          {/* Contexto e Ordenação */}
          <div className="flex justify-between items-center mb-4 px-1">
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                Medicamentos disponíveis
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                São Paulo - SP
              </span>
            </div>
            <button 
              type="button" 
              className="flex items-center gap-1 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm cursor-pointer"
            >
              <span>Preço</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Lista de Drogarias */}
          <div className="space-y-4">
            
            {/* Card 1: Droga Raia */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-start justify-between mb-3.5">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=100&auto=format&fit=crop&q=80" 
                    alt="Droga Raia Fachada" 
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      Droga Raia
                    </h3>
                    <span className="text-base font-extrabold text-emerald-600 block mt-0.5">
                      R$ 12,90
                    </span>
                  </div>
                </div>
                
                <span className="bg-emerald-100 text-emerald-700 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Menor Preço
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button 
                  type="button" 
                  onClick={() => alert("Abrindo mapa...")}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs py-2.5 px-3 rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-slate-700" />
                  <span>Ver Mapa</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => alert("Discando para a drogaria...")}
                  className="w-full bg-[#15284B] hover:bg-[#1f3a6d] text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Ligar</span>
                </button>
              </div>
            </div>

            {/* Card 2: Drogarias Pacheco */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-start justify-between mb-3.5">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1576602976047-174e57a47881?w=100&auto=format&fit=crop&q=80" 
                    alt="Drogarias Pacheco Fachada" 
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      Drogarias Pacheco
                    </h3>
                    <span className="text-base font-extrabold text-emerald-600 block mt-0.5">
                      R$ 14,50
                    </span>
                  </div>
                </div>
                
                <span className="bg-blue-100 text-blue-700 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Mais Próxima
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button 
                  type="button" 
                  onClick={() => alert("Abrindo mapa...")}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs py-2.5 px-3 rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-slate-700" />
                  <span>Ver Mapa</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => alert("Discando para a drogaria...")}
                  className="w-full bg-[#15284B] hover:bg-[#1f3a6d] text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Ligar</span>
                </button>
              </div>
            </div>

            {/* Card 3: Pague Menos */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-start justify-between mb-3.5">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=100&auto=format&fit=crop&q=80" 
                    alt="Pague Menos Fachada" 
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      Pague Menos
                    </h3>
                    <span className="text-base font-extrabold text-emerald-600 block mt-0.5">
                      R$ 15,10
                    </span>
                  </div>
                </div>
                
                <span className="bg-purple-100 text-purple-700 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Popular
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button 
                  type="button" 
                  onClick={() => alert("Abrindo mapa...")}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs py-2.5 px-3 rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-slate-700" />
                  <span>Ver Mapa</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => alert("Discando para a drogaria...")}
                  className="w-full bg-[#15284B] hover:bg-[#1f3a6d] text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Ligar</span>
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