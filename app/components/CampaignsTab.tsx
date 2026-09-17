export default function CampaignsTab() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] font-mono tracking-widest uppercase text-orange-500 block mb-1">
          Outreach Sequences
        </span>
        <h1 className="text-3xl font-bold tracking-tight">
          Automated Campaigns
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Manage your spaced outreach emails and track response conversions
          safely.
        </p>
      </div>
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-12 text-center">
        <p className="text-neutral-400 text-sm">
          No active automated campaigns yet. Scrape leads to get started.
        </p>
      </div>
    </div>
  );
}
