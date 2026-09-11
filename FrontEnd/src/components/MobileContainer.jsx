export default function MobileContainer({ children }) {
  return (
    <div className="flex justify-center bg-slate-900 min-h-screen p-0 sm:p-4">
      <div className="w-full max-w-[420px] bg-slate-100 min-h-screen flex flex-col justify-between relative shadow-2xl overflow-hidden sm:rounded-[44px] border border-slate-300">
        {children}
      </div>
    </div>
  );
}