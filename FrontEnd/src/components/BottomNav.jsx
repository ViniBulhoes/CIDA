import { useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Pill, Calendar, User } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { label: 'Home', path: '/home', icon: HomeIcon },
    { label: 'Remédios', path: '/remedios', icon: Pill, rotate: true },
    { label: 'Rotina', path: '/rotina', icon: Calendar },
    { label: 'Perfil', path: '/perfil', icon: User },
  ];

  return (
    <nav className="bg-white border-t-2 border-slate-200 py-3 px-3 flex justify-around items-center shadow-[0_-4px_16px_rgba(0,0,0,0.06)] relative z-10 shrink-0">
      {links.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <button
            key={item.path}
            type="button"
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
              isActive
                ? 'text-slate-900 font-bold'
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
          >
            <Icon
              className={`w-6 h-6 ${item.rotate ? 'rotate-45' : ''} ${
                isActive ? 'stroke-[2.5]' : 'stroke-[2]'
              }`}
            />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}