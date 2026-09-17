"use client";

import SearchBox from "./SearchBox";
import MetricsGrid from "./MetricsGrid";
import FilterBar from "./FilterBar";
import LeadsTable from "./LeadsTable";

interface Lead {
  id: number;
  business: string;
  domain: string;
  phone: string;
  grade: string;
  failure: string;
  score: number;
  tier: string;
  status: string;
}

interface LeadEngineProps {
  searchNiche: string;
  setSearchNiche: (val: string) => void;
  searchLocation: string;
  setSearchLocation: (val: string) => void;
  isScraping: boolean;
  onScrape: () => void;
  selectedAuditFilter: string;
  setSelectedAuditFilter: (grade: string) => void;
  leads: Lead[];
}

export default function LeadEngine({
  searchNiche,
  setSearchNiche,
  searchLocation,
  setSearchLocation,
  isScraping,
  onScrape,
  selectedAuditFilter,
  setSelectedAuditFilter,
  leads,
}: LeadEngineProps) {
  // Filter leads based on the selected audit grade filter
  const filteredLeads =
    selectedAuditFilter === "ALL"
      ? leads
      : leads.filter((lead) => lead.grade === selectedAuditFilter);

  return (
    <div className="space-y-6">
      {/* Engine Subtitle Banner */}
      <div>
        <span className="text-[10px] font-mono tracking-widest uppercase text-orange-500 block mb-1">
          Local Lead Engine
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Find businesses worth fixing.
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Scrape a niche in any market, grade every site, and draft the outreach
          in one pass.
        </p>
      </div>

      {/* Search Bar Box */}
      <SearchBox
        searchNiche={searchNiche}
        setSearchNiche={setSearchNiche}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        isScraping={isScraping}
        onScrape={onScrape}
      />

      {/* Metrics Dashboard Row */}
      <MetricsGrid searchNiche={searchNiche} searchLocation={searchLocation} />

      {/* Filter & Export Bar */}
      <FilterBar
        selectedAuditFilter={selectedAuditFilter}
        setSelectedAuditFilter={setSelectedAuditFilter}
      />

      {/* Data Table */}
      <LeadsTable leads={filteredLeads} />
    </div>
  );
}
