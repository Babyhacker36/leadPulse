"use client";

interface FilterBarProps {
  selectedAuditFilter: string;
  setSelectedAuditFilter: (grade: string) => void;
}

const GRADES = ["ALL", "B", "C", "C2", "C+", "D", "F"];

export default function FilterBar({
  selectedAuditFilter,
  setSelectedAuditFilter,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-neutral-900/40 p-3 rounded-xl border border-neutral-800/80">
      <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
        <span className="text-xs text-neutral-500 mr-2 flex items-center gap-1">
          ⚙️ Audit Grade
        </span>
        {GRADES.map((grade) => (
          <button
            key={grade}
            onClick={() => setSelectedAuditFilter(grade)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedAuditFilter === grade
                ? "bg-orange-600 text-white"
                : "bg-neutral-800/60 text-neutral-400 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            {grade}
          </button>
        ))}
      </div>
      <button className="bg-neutral-800 hover:bg-neutral-700 text-xs font-medium px-4 py-2 rounded-lg border border-neutral-700 transition-colors flex items-center gap-2">
        📥 Export CSV
      </button>
    </div>
  );
}
