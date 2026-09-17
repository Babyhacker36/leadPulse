"use client";

interface NavbarProps {
  activeTab: "leads" | "campaigns" | "settings";
  setActiveTab: (tab: "leads" | "campaigns" | "settings") => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <header className="h-15 max-w-360 mx-auto px-6 flex items-center justify-between border-b border-neutral-800 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-bold text-white shadow-lg shadow-orange-600/20">
          LP
        </div>
        <span className="font-semibold tracking-tight text-lg">LeadPulse</span>
        <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
          v1.0
        </span>
      </div>

      <nav className="flex items-center gap-1.75 bg-neutral-900/60 p-1.25 rounded-full border border-neutral-800">
        {(["leads", "campaigns", "settings"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
              activeTab === tab
                ? "bg-orange-600 text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
          CRONJOB: ONLINE
        </span>
        <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-medium text-xs">
          LC
        </div>
      </div>
    </header>
  );
}
