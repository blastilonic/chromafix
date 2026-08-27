import { Sliders, Sparkles } from "lucide-react";

export default function SidebarNav({ activeTab, setActiveTab }) {
  const menuItems = [
    {
      id: "train",
      label: "Entrenar",
      icon: Sliders,
      description: "Entrenament de models",
    },
    {
      id: "transform",
      label: "Transformar",
      icon: Sparkles,
      description: "Inferència i comparació",
    },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800 p-4">
      <div className="flex items-center gap-3 px-2 py-4 mb-6 border-b border-slate-800">
        <img src="/favicon.svg" alt="ChromaFix Logo" className="w-10 h-10" />
        <div>
          <h1 className="font-bold text-lg tracking-tight leading-none text-white">
            ChromaFix
          </h1>
          <span className="text-xs text-slate-400">Correcció de color</span>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                isActive
                  ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${isActive ? "text-indigo-400" : "text-slate-400"}`}
              />
              <div className="flex flex-col">
                <span>{item.label}</span>
                <span className="text-[10px] text-slate-500 font-normal">
                  {item.description}
                </span>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-slate-800 px-2 text-xs text-slate-500 text-center">
        v1.0.0
      </div>
    </aside>
  );
}
