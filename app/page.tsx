"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import LeadEngine from "./components/LeadEngine";
import CampaignsTab from "./components/CampaignsTab";
import SettingsTab from "./components/SettingsTab";

export default function LeadPulseDashboard() {
  const [activeTab, setActiveTab] = useState<
    "leads" | "campaigns" | "settings"
  >("leads");
  const [searchNiche, setSearchNiche] = useState("Dentists");
  const [searchLocation, setSearchLocation] = useState("Austin, TX");
  const [isScraping, setIsScraping] = useState(false);
  const [selectedAuditFilter, setSelectedAuditFilter] = useState("ALL");

  const leads = [
    {
      id: 1,
      business: "Summit Dentist Partners",
      domain: "summitdentist.com",
      phone: "(512) 781-7114",
      grade: "D",
      failure: "multiple failures",
      score: 84,
      tier: "HOT",
      status: "NEW",
    },
    {
      id: 2,
      business: "Halstead Dentist LLC",
      domain: "halsteaddentist.com",
      phone: "(512) 302-3139",
      grade: "C+",
      failure: "slow on mobile",
      score: 73,
      tier: "WARM",
      status: "NEW",
    },
    {
      id: 3,
      business: "Northgate Dentist",
      domain: "northgatedentist.com",
      phone: "(512) 705-6081",
      grade: "C+",
      failure: "slow on mobile",
      score: 70,
      tier: "WARM",
      status: "NEW",
    },
    {
      id: 4,
      business: "Hollis Dentist Co.",
      domain: "hollisdentist.com",
      phone: "(512) 889-7311",
      grade: "C+",
      failure: "slow on mobile",
      score: 70,
      tier: "WARM",
      status: "NEW",
    },
    {
      id: 5,
      business: "Lantern Dentist & Sons",
      domain: "lanterndentist.com",
      phone: "(512) 508-6126",
      grade: "C+",
      failure: "slow on mobile",
      score: 67,
      tier: "WARM",
      status: "NEW",
    },
  ];

  const handleScrape = () => {
    setIsScraping(true);
    setTimeout(() => setIsScraping(false), 1500);
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
            selectedAuditFilter={selectedAuditFilter}
            setSelectedAuditFilter={setSelectedAuditFilter}
            leads={leads}
          />
        )}

        {activeTab === "campaigns" && <CampaignsTab />}
        {activeTab === "settings" && <SettingsTab />}
      </main>
    </div>
  );
}
