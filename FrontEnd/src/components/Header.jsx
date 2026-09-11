import { useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';

export default function Header({ 
  title, 
  subtitle, 
  showBack = false, 
  backPath = -1, 
  rightAction = null,
  children 
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#15284B] pt-8 px-6 pb-8 rounded-b-[36px] shadow-md relative shrink-0">
      {/* Barra superior: Logo ou Botão Voltar à esquerda, e Ação à direita */}
      <header className="flex justify-between items-center mb-4">
        {showBack ? (
          <button 
            type="button" 
            onClick={() => navigate(backPath)}
            className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer border border-white/10"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-emerald-400 stroke-[2.5]" />
            <span className="text-2xl font-black tracking-wider text-white">CIDA</span>
          </div>
        )}

        {/* Elemento opcional à direita (foto, botão de configuração, etc.) */}
        {rightAction}
      </header>

      {/* Título e subtítulo da página */}
      {title && (
        <div className={children ? "mb-4" : ""}>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-slate-300 text-sm font-medium mt-0.5">{subtitle}</p>
          )}
        </div>
      )}

      {/* Qualquer elemento extra passado dentro do Header (botão SOS, barra de busca, navegador de datas) */}
      {children}
    </div>
  );
}