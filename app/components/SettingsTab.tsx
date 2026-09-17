export default function SettingsTab() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] font-mono tracking-widest uppercase text-orange-500 block mb-1">
          System Configuration
        </span>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Configure your API keys, safety throttling rules, and outreach
          templates.
        </p>
      </div>
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 space-y-4">
        <div>
          <label className="text-xs font-mono uppercase text-neutral-400 block mb-2">
            OpenAI / Claude API Key
          </label>
          <input
            type="password"
            placeholder="sk-..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500"
          />
        </div>
        <div>
          <label className="text-xs font-mono uppercase text-neutral-400 block mb-2">
            Message Spacing Delay (Minutes)
          </label>
          <input
            type="number"
            defaultValue={15}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500"
          />
        </div>
        <button className="bg-orange-600 hover:bg-orange-500 text-white font-medium px-5 py-2.5 rounded-xl text-xs transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
}
