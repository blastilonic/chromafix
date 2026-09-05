import { Sliders, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SidebarNav({ activeTab, setActiveTab }) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  const menuItems = [
    {
      id: "train",
      label: t("nav.train"),
      icon: Sliders,
      description: t("nav.trainDescription"),
    },
    {
      id: "transform",
      label: t("nav.transform"),
      icon: Sparkles,
      description: t("nav.transformDescription"),
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
          <span className="text-xs text-slate-400">{t("nav.subtitle")}</span>
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

      <select
        id="languageSelector"
        value={i18n.language}
        onChange={(event) => changeLanguage(event.target.value)}
        className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
      >
        <option key="ca" value="ca">
          {t("languages.ca")}
        </option>
        <option key="es" value="es">
          {t("languages.es")}
        </option>
        <option key="en" value="en">
          {t("languages.en")}
        </option>
        <option key="de" value="de">
          {t("languages.de")}
        </option>
        <option key="zh" value="zh">
          {t("languages.zh")}
        </option>
      </select>

      <div className="pt-4 border-t border-slate-800 px-2 text-xs text-slate-500 text-center">
        v1.0.0
      </div>
    </aside>
  );
}
