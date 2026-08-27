import { useState } from "react";
import SidebarNav from "./components/common/SidebarNav";
import TrainPage from "./pages/TrainPage";
import TransformPage from "./pages/TransformPage";

export default function App() {
  const [activeTab, setActiveTab] = useState("train");

  return (
    <div className="flex h-screen bg-slate-950 text-slate-50 overflow-hidden font-sans">
      <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 overflow-y-auto flex flex-col justify-between space-y-6">
        <div className="flex-1">
          {activeTab === "train" && <TrainPage />}
          {activeTab === "transform" && <TransformPage />}
        </div>
      </main>
    </div>
  );
}
