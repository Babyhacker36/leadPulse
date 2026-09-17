interface MetricsGridProps {
  searchNiche: string;
  searchLocation: string;
  totalLeads: number; // Add this prop definition
}

export default function MetricsGrid({
  searchNiche,
  searchLocation,
  totalLeads,
}: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5">
        <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-2">
          Leads Found
        </span>
        <div className="text-3xl font-bold tracking-tight">{totalLeads}</div>
        <div className="text-xs text-neutral-400 mt-1">
          {searchNiche} - {searchLocation}
        </div>
      </div>
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5">
        <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-2">
          Avg Outreach Score
        </span>
        <div className="text-3xl font-bold tracking-tight text-orange-400">
          68
        </div>
        <div className="text-xs text-neutral-400 mt-1">
          Weighted by audit gap
        </div>
      </div>
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5">
        <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-2">
          Hot Leads
        </span>
        <div className="text-3xl font-bold tracking-tight text-red-400">1</div>
        <div className="text-xs text-neutral-400 mt-1">Score 80 and above</div>
      </div>
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5">
        <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-2">
          Contacted
        </span>
        <div className="text-3xl font-bold tracking-tight">0/{totalLeads}</div>
        <div className="text-xs text-neutral-400 mt-1">
          Drafts copied and sent
        </div>
      </div>
    </div>
  );
}
