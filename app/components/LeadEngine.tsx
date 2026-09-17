"use client";

import { Channel, Lead } from "@/app/types";
import SearchBox from "./SearchBox";
import MetricsGrid from "./MetricsGrid";
import FilterBar, { GapFilter } from "./FilterBar";
import LeadsTable from "./LeadsTable";

interface LeadEngineProps {
  searchNiche: string;
  setSearchNiche: (val: string) => void;
  searchLocation: string;
  setSearchLocation: (val: string) => void;
  isScraping: boolean;
  onScrape: () => void;
  selectedFilter: GapFilter;
  setSelectedFilter: (filter: GapFilter) => void;
  leads: Lead[];
  onUpdateSamplePage: (leadId: number, url: string) => void;
  onAddToQueue: (lead: Lead, channel: Channel) => void;
}

function matchesFilter(lead: Lead, filter: GapFilter): boolean {
  switch (filter) {
    case "ALL":
      return true;
    case "NO_WEBSITE":
      return lead.websiteStatus === "Missing";
    case "OUTDATED_WEBSITE":
      return lead.websiteStatus === "Outdated";
    case "BROKEN_WEBSITE":
      return lead.websiteStatus === "Broken";
    case "NO_AI_AGENT":
      return !lead.hasAiAgent;
    case "SOCIAL_GAP":
      return lead.socialStatus !== "Active";
    case "HOT":
      return lead.tier === "HOT";
  }
}

function toCsv(leads: Lead[]): string {
  const headers = [
    "Business", "Phone", "Email", "City", "State", "Niche",
    "Website Status", "Has AI Agent", "Social Status",
    "Sample Page URL", "Score", "Tier", "Status",
  ];
  const rows = leads.map((lead) => [
    lead.business, lead.phone, lead.email, lead.city, lead.state, lead.niche,
    lead.websiteStatus, lead.hasAiAgent ? "Yes" : "No", lead.socialStatus,
    lead.samplePageUrl ?? "", String(lead.score), lead.tier, lead.status,
  ]);
  const escape = (val: string) => `"${val.replace(/"/g, '""')}"`;
  return [headers, ...rows]
    .map((row) => row.map(escape).join(","))
    .join("\n");
}

export default function LeadEngine({
  searchNiche,
  setSearchNiche,
  searchLocation,
  setSearchLocation,
  isScraping,
  onScrape,
  selectedFilter,
  setSelectedFilter,
  leads,
  onUpdateSamplePage,
  onAddToQueue,
}: LeadEngineProps) {
  const filteredLeads = leads.filter((lead) => matchesFilter(lead, selectedFilter));

  const handleExportCsv = () => {
    const csv = toCsv(filteredLeads);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `leadpulse-${searchNiche.toLowerCase()}-${searchLocation.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

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
          Scrape a niche in any city and state nationwide, spot the gaps, and
          hook them with a custom sample page.
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
      <MetricsGrid
        searchNiche={searchNiche}
        searchLocation={searchLocation}
        leads={leads}
      />

      {/* Filter & Export Bar */}
      <FilterBar
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        onExportCsv={handleExportCsv}
      />

      {/* Data Table */}
      <LeadsTable
        leads={filteredLeads}
        onUpdateSamplePage={onUpdateSamplePage}
        onAddToQueue={onAddToQueue}
      />
    </div>
  );
}
