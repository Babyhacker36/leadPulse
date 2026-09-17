import { Lead } from "@/app/types";

interface MetricsGridProps {
  searchNiche: string;
  searchLocation: string;
  leads: Lead[];
}

export default function MetricsGrid({
  searchNiche,
  searchLocation,
  leads,
}: MetricsGridProps) {
  const totalLeads = leads.length;
  const hotLeads = leads.filter((lead) => lead.tier === "HOT").length;
  const avgScore = totalLeads
    ? Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / totalLeads)
    : 0;
  const samplePagesReady = leads.filter((lead) => lead.samplePageUrl).length;

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
          {avgScore}
        </div>
        <div className="text-xs text-neutral-400 mt-1">
          Weighted by audit gap
        </div>
      </div>
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5">
        <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-2">
          Hot Leads
        </span>
        <div className="text-3xl font-bold tracking-tight text-red-400">
          {hotLeads}
        </div>
        <div className="text-xs text-neutral-400 mt-1">Score 80 and above</div>
      </div>
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5">
        <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-2">
          Sample Pages Ready
        </span>
        <div className="text-3xl font-bold tracking-tight">
          {samplePagesReady}/{totalLeads}
        </div>
        <div className="text-xs text-neutral-400 mt-1">Hooks attached</div>
      </div>
    </div>
  );
}
