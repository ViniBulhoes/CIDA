import { useState } from 'react';
import { 
  Bell, 
  Volume2, 
  Type, 
  MapPin, 
  UserCheck, 
  UserX,
  HelpCircle, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import MobileContainer from '../components/MobileContainer';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

export default function Configuracoes() {
  // 1. Estados dos Toggles
  const [notificacoes, setNotificacoes] = useState(true);
  const [alarmeAlto, setAlarmeAlto] = useState(true);
  const [localizacaoSOS, setLocalizacaoSOS] = useState(true);
  const [relatorioSemanal, setRelatorioSemanal] = useState(true);

  // 1.1 Barra de escala de texto (1 = Normal, 2 = Médio, 3 = Grande, 4 = Muito Grande)
  const [escalaTexto, setEscalaTexto] = useState(2);

  // 2. Estado para o modal de proteção do cuidador
  const [solicitacaoEnviada, setSolicitacaoEnviada] = useState(false);

  // Rótulos amigáveis para a escala
  const niveisTexto = {
    1: 'Normal',
    2: 'Médio',
    3: 'Grande',
    4: 'Muito Grande'
  };

  const solicitarDesvinculacao = () => {
    setSolicitacaoEnviada(true);
  };

  return (
    <MobileContainer>
      {/* Área Rolável de Conteúdo */}
      <div className="flex-1 overflow-y-auto">
        
        {/* Header com botão de voltar */}
        <Header 
          title="Configurações" 
          subtitle="Preferências e Acessibilidade"
          showBack={true}
          backPath="/perfil"
        />

        {/* Lista de Opções */}
        <div className="px-5 pt-5 pb-6 space-y-6">

          {/* SEÇÃO 1: ACESSIBILIDADE E VISIBILIDADE */}
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3 px-1">
              Visibilidade e Som
            </h2>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
              
              {/* Barra de Escala de Texto */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <Type className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                        Tamanho do Texto
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Ajuste o tamanho das letras
                      </p>
                    </div>
                  </div>

                  <span className="bg-blue-100 text-blue-800 font-bold text-xs px-2.5 py-1 rounded-full">
                    {niveisTexto[escalaTexto]}
                  </span>
                </div>

                {/* Slider de Escala */}
                <div className="pt-2 px-1">
                  <input 
                    type="range" 
                    min="1" 
                    max="4" 
                    step="1"
                    value={escalaTexto}
                    onChange={(e) => setEscalaTexto(Number(e.target.value))}
                    aria-label="Controle deslizante de tamanho do texto"
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-1.5 px-0.5 select-none">
                    <span>A</span>
                    <span>A+</span>
                    <span>A++</span>
                    <span className="text-sm">A+++</span>
                  </div>
                </div>

                {/* Pré-visualização do texto */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-slate-800 font-medium transition-all text-center">
                  <span className={
                    escalaTexto === 1 ? 'text-xs' : 
                    escalaTexto === 2 ? 'text-sm' : 
                    escalaTexto === 3 ? 'text-base font-semibold' : 'text-lg font-bold'
                  }>
                    Exemplo: Tomar Losartana às 10:00
                  </span>
                </div>
              </div>

              {/* Alarme Sonoro Alto */}
              <div className="p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                    <Volume2 className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                      Alarme Sonoro Reforçado
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Toque prolongado e com volume alto
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAlarmeAlto(!alarmeAlto)}
                  aria-pressed={alarmeAlto}
                  aria-label="Alternar alarme sonoro reforçado"
                  className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none ${
                    alarmeAlto ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <div 
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      alarmeAlto ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

            </div>
          </section>

          {/* SEÇÃO 2: ALERTAS E LEMBRETES */}
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3 px-1">
              Lembretes e Rotina
            </h2>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
              
              {/* Notificações de Remédio */}
              <div className="p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <Bell className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                      Lembretes de Horários
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Avisar antes de cada remédio e refeição
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setNotificacoes(!notificacoes)}
                  aria-pressed={notificacoes}
                  aria-label="Alternar lembretes de horários"
                  className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none ${
                    notificacoes ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <div 
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      notificacoes ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Localização SOS */}
              <div className="p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                    <MapPin className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                      Localização no Botão SOS
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Enviar GPS para cuidadores em emergência
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setLocalizacaoSOS(!localizacaoSOS)}
                  aria-pressed={localizacaoSOS}
                  aria-label="Alternar envio de localização no SOS"
                  className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none ${
                    localizacaoSOS ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <div 
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      localizacaoSOS ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

            </div>
          </section>

          {/* SEÇÃO 3: CUIDADORES VINCULADOS COM REGRA DE SEGURANÇA */}
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3 px-1">
              Cuidador Vinculado
            </h2>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-4">
              
              {/* Card do Cuidador Atual */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" 
                    alt="Enfermeira Ana Beatriz" 
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                      Ana Beatriz (Enfermeira)
                    </h3>
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                      Responsável Ativo
                    </span>
                  </div>
                </div>

                {/* Toggle de Acesso a Relatórios */}
                <div className="flex flex-col items-end">
                  <button
                    type="button"
                    onClick={() => setRelatorioSemanal(!relatorioSemanal)}
                    aria-pressed={relatorioSemanal}
                    aria-label="Alternar envio de relatórios semanais"
                    className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none ${
                      relatorioSemanal ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  >
                    <div 
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                        relatorioSemanal ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-[10px] font-semibold text-slate-400 mt-1">
                    Relatórios
                  </span>
                </div>
              </div>

              {/* Botão de Tentar Remover o Cuidador */}
              <button
                type="button"
                onClick={solicitarDesvinculacao}
                className="w-full bg-slate-50 hover:bg-red-50 hover:text-red-700 text-slate-600 font-bold text-xs py-3 px-4 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <UserX className="w-4 h-4" />
                <span>Solicitar Desvinculação do Cuidador</span>
              </button>

              {/* Mensagem de Confirmação Obrigatória / Proteção do Idoso */}
              {solicitacaoEnviada && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-amber-900 leading-snug">
                      Confirmação Obrigatória Solicitada
                    </p>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Por segurança, a remoção precisa ser aprovada pelo cuidador responsável. Enviamos um pedido de autorização para o celular de <strong>Ana Beatriz</strong> e para a família.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSolicitacaoEnviada(false)}
                      className="text-[11px] font-extrabold text-amber-900 underline mt-1 cursor-pointer"
                    >
                      Entendi e fechar aviso
                    </button>
                  </div>
                </div>
              )}

            </div>
          </section>

          {/* SEÇÃO 4: SUPORTE E VERSÃO */}
          <section>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => alert("Central de Atendimento CIDA: 0800 123 4567")}
                className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                    <HelpCircle className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                      Central de Ajuda
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Tirar dúvidas e suporte por telefone
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  Ligar grátis
                </span>
              </button>
            </div>

            <p className="text-center text-xs text-slate-400 font-medium mt-4">
              CIDA App • Versão 1.0.0
            </p>
          </section>

        </div>
      </div>

      {/* Footer Componentizado */}
      <BottomNav />
    </MobileContainer>
  );
}