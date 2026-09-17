"use client";

export type GapFilter =
  | "ALL"
  | "NO_WEBSITE"
  | "OUTDATED_WEBSITE"
  | "BROKEN_WEBSITE"
  | "NO_AI_AGENT"
  | "SOCIAL_GAP"
  | "HOT";

interface FilterBarProps {
  selectedFilter: GapFilter;
  setSelectedFilter: (filter: GapFilter) => void;
  onExportCsv: () => void;
}

const FILTERS: { value: GapFilter; label: string }[] = [
  { value: "ALL", label: "ALL" },
  { value: "NO_WEBSITE", label: "No Website" },
  { value: "OUTDATED_WEBSITE", label: "Outdated Site" },
  { value: "BROKEN_WEBSITE", label: "Broken Site" },
  { value: "NO_AI_AGENT", label: "No AI Agent" },
  { value: "SOCIAL_GAP", label: "Social Gap" },
  { value: "HOT", label: "🔥 Hot" },
];

export default function FilterBar({
  selectedFilter,
  setSelectedFilter,
  onExportCsv,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-neutral-900/40 p-3 rounded-xl border border-neutral-800/80">
      <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
        <span className="text-xs text-neutral-500 mr-2 flex items-center gap-1 whitespace-nowrap">
          ⚙️ Gap Filter
        </span>
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSelectedFilter(filter.value)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              selectedFilter === filter.value
                ? "bg-orange-600 text-white"
                : "bg-neutral-800/60 text-neutral-400 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <button
        onClick={onExportCsv}
        className="bg-neutral-800 hover:bg-neutral-700 text-xs font-medium px-4 py-2 rounded-lg border border-neutral-700 transition-colors flex items-center gap-2 whitespace-nowrap"
      >
        📥 Export CSV
      </button>
    </div>
  );
}
