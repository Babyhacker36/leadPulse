"use client";

import { Fragment, useState } from "react";
import { Channel, Lead } from "@/app/types";
import GapBadge from "./GapBadge";
import LeadDetailPanel from "./LeadDetailPanel";
import { aiAgentGap, socialGap, websiteGap } from "@/app/lib/gapDetector";

interface LeadsTableProps {
  leads: Lead[];
  onUpdateSamplePage: (leadId: number, url: string) => void;
  onAddToQueue: (lead: Lead, channel: Channel) => void;
}

const TIER_CLASSES: Record<Lead["tier"], string> = {
  HOT: "bg-red-500/10 text-red-400 border-red-500/20",
  WARM: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  COLD: "bg-neutral-800 text-neutral-400 border-neutral-700",
};

export default function LeadsTable({
  leads,
  onUpdateSamplePage,
  onAddToQueue,
}: LeadsTableProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  if (leads.length === 0) {
    return (
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-12 text-center">
        <p className="text-neutral-400 text-sm">
          No leads match this filter yet. Scrape a niche or clear your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-950/80 text-neutral-400 text-xs uppercase font-mono tracking-wider border-b border-neutral-800">
            <tr>
              <th className="py-3.75 px-6 font-medium">Business</th>
              <th className="py-3.75 px-6 font-medium">Phone</th>
              <th className="py-3.75 px-6 font-medium">Gaps</th>
              <th className="py-3.75 px-6 font-medium">Score</th>
              <th className="py-3.75 px-6 font-medium">Status</th>
              <th className="py-3.75 px-6 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            {leads.map((lead) => {
              const isExpanded = expandedId === lead.id;
              const website = websiteGap(lead);
              const ai = aiAgentGap(lead);
              const social = socialGap(lead);

              return (
                <Fragment key={lead.id}>
                  <tr
                    className="hover:bg-neutral-800/30 transition-colors cursor-pointer"
                    onClick={() =>
                      setExpandedId(isExpanded ? null : lead.id)
                    }
                  >
                    <td className="py-4 px-6">
                      <div className="font-medium text-white flex items-center gap-1.5">
                        <span className="text-neutral-500 text-xs">
                          {isExpanded ? "▾" : "▸"}
                        </span>
                        {lead.business}
                      </div>
                      <div className="text-xs text-neutral-500 mt-0.5 pl-4.5">
                        📍 {lead.city}, {lead.state} · {lead.niche}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-neutral-400 font-mono text-xs">
                      {lead.phone}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        <GapBadge label={website.label} tone={website.tone} />
                        <GapBadge label={ai.label} tone={ai.tone} />
                        <GapBadge label={social.label} tone={social.tone} />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{lead.score}</span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border ${TIER_CLASSES[lead.tier]}`}
                        >
                          {lead.tier}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedId(isExpanded ? null : lead.id);
                        }}
                        className="bg-orange-600/10 hover:bg-orange-600 text-orange-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium border border-orange-500/20 transition-all"
                      >
                        {isExpanded ? "Close" : "🔍 Gap Detail"}
                      </button>
                    </td>
                  </tr>
                  {isExpanded && (
                    <LeadDetailPanel
                      lead={lead}
                      onUpdateSamplePage={onUpdateSamplePage}
                      onAddToQueue={onAddToQueue}
                    />
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
