import { useConfig } from '../context/ConfigContext';

export default function MobileContainer({ children }) {
  const { textScaleClass } = useConfig();

  return (
    <div className="flex justify-center items-start bg-slate-900 min-h-screen p-0 sm:py-8 sm:px-4">
      {/* 
        - max-w-[420px] e w-full: mesma largura em todas as telas
        - min-h-screen sm:min-h-[820px]: mesma altura mínima padrão no desktop 
      */}
      <div className={`w-full max-w-[420px] bg-slate-100 min-h-screen sm:min-h-[820px] flex flex-col justify-between relative shadow-2xl overflow-hidden sm:rounded-[40px] border border-slate-300 ${textScaleClass}`}>
        {children}
      </div>
    </div>
  );
}