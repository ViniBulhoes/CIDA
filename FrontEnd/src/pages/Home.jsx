import { useState } from 'react';
// mantenha todos os seus imports originais normais...
import { X, AlertTriangle, Plus } from 'lucide-react';

export default function Home() {
  // Seus estados originais continuam aqui...
  
  // Estado exclusivo para controlar o modal de ocorrência
  const [modalOcorrenciaAberto, setModalOcorrenciaAberto] = useState(false);
  const [tipoOcorrencia, setTipoOcorrencia] = useState('Dor ou Mal-estar');
  const [detalhes, setDetalhes] = useState('');

  const handleSalvarOcorrencia = (e) => {
    e.preventDefault();
    // Salva ou apenas confirma o envio
    alert(`Ocorrência registrada com sucesso: ${tipoOcorrencia}`);
    setDetalhes('');
    setModalOcorrenciaAberto(false);
  };

  return (
    // Seu container original...
    <>
      {/* 
        NO SEU BOTÃO / CARD EXISTENTE DE OCORRÊNCIA:
        Substitua o onClick que navegava por:
        onClick={() => setModalOcorrenciaAberto(true)}
      */}

      {/* MODAL SIMPLES E DIRETO (Renderiza apenas quando aberto) */}
      {modalOcorrenciaAberto && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom duration-200">
            
            {/* Cabeçalho do Modal */}
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
                  className="w-full bg-slate-50 text-slate-900 font-bold px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-red-500 focus:outline-none text-sm cursor-pointer"
                >
                  <option value="Dor ou Mal-estar">🤕 Dor ou Mal-estar</option>
                  <option value="Tontura ou Enjoo">💫 Tontura ou Fraqueza</option>
                  <option value="Queda ou Tropeço">⚠️ Queda ou Tropeço</option>
                  <option value="Pressão ou Coração">❤️ Pressão alterada</option>
                  <option value="Outro Motivo">📝 Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 ml-1">
                  Detalhes adicionais (opcional)
                </label>
                <textarea
                  rows="3"
                  value={detalhes}
                  onChange={(e) => setDetalhes(e.target.value)}
                  placeholder="Ex: Senti uma tontura ao levantar da cama..."
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
    </>
  );
}
