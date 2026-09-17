"use client";

import { useState } from "react";
import Navbar, { Tab } from "./components/Navbar";
import LeadEngine from "./components/LeadEngine";
import AutomationTab from "./components/AutomationTab";
import SettingsTab from "./components/SettingsTab";
import { GapFilter } from "./components/FilterBar";
import { generateLeads } from "./lib/leadGenerator";
import { useOutreachEngine } from "./hooks/useOutreachEngine";
import { Channel, Lead, QueueItem } from "./types";

export default function LeadPulseDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("leads");
  const [searchNiche, setSearchNiche] = useState("Dentists");
  const [searchLocation, setSearchLocation] = useState("Austin, TX");
  const [isScraping, setIsScraping] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<GapFilter>("ALL");

  const [leads, setLeads] = useState<Lead[]>(() =>
    generateLeads({ niche: "Dentists", location: "Austin, TX" })
  );
  const [queue, setQueue] = useState<QueueItem[]>([]);

  const { isRunning, start, pause, logs, sentToday } = useOutreachEngine(
    queue,
    setQueue
  );

  const handleScrape = async () => {
    setIsScraping(true);
    try {
      const res = await fetch(
        `/api/leads?niche=${encodeURIComponent(searchNiche)}&location=${encodeURIComponent(searchLocation)}`
      );
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch (error) {
      console.error("Failed to fetch live leads:", error);
    } finally {
      setIsScraping(false);
    }
  };

  const handleUpdateSamplePage = (leadId: number, url: string) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, samplePageUrl: url || null } : lead
      )
    );
  };

  const handleAddToQueue = (lead: Lead, channel: Channel) => {
    setQueue((prev) => {
      const alreadyQueued = prev.some(
        (item) =>
          item.leadId === lead.id &&
          item.channel === channel &&
          item.status !== "Sent"
      );
      if (alreadyQueued) return prev;
      const newItem: QueueItem = {
        id: `${lead.id}-${channel}-${Date.now()}`,
        leadId: lead.id,
        business: lead.business,
        channel,
        status: "Queued",
        addedAt: Date.now(),
      };
      return [...prev, newItem];
    });
    setLeads((prev) =>
      prev.map((l) => (l.id === lead.id ? { ...l, status: "QUEUED" } : l))
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-orange-500/30">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-360 mx-auto px-6 py-8">
        {activeTab === "leads" && (
          <LeadEngine
            searchNiche={searchNiche}
            setSearchNiche={setSearchNiche}
            searchLocation={searchLocation}
            setSearchLocation={setSearchLocation}
            isScraping={isScraping}
            onScrape={handleScrape}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            leads={leads}
            onUpdateSamplePage={handleUpdateSamplePage}
            onAddToQueue={handleAddToQueue}
          />
        )}

        {activeTab === "automation" && (
          <AutomationTab
            queue={queue}
            isRunning={isRunning}
            onStart={start}
            onPause={pause}
            logs={logs}
            sentToday={sentToday}
          />
        )}

        {activeTab === "settings" && <SettingsTab />}
      </main>
    </div>
  );
}
