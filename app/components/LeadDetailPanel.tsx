"use client";

import { useState } from "react";
import { Lead } from "@/app/types";
import GapBadge from "./GapBadge";
import { aiAgentGap, socialGap, websiteGap } from "@/app/lib/gapDetector";

interface LeadDetailPanelProps {
  lead: Lead;
  onUpdateSamplePage: (leadId: number, url: string) => void;
  onAddToQueue: (lead: Lead, channel: "Email" | "DM") => void;
}

export default function LeadDetailPanel({
  lead,
  onUpdateSamplePage,
  onAddToQueue,
}: LeadDetailPanelProps) {
  const [draftUrl, setDraftUrl] = useState(lead.samplePageUrl ?? "");

  const website = websiteGap(lead);
  const ai = aiAgentGap(lead);
  const social = socialGap(lead);

  return (
    <tr className="bg-neutral-950/60">
      <td colSpan={6} className="px-6 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-2">
              Gap Detector
            </span>
            <div className="flex flex-wrap gap-2 mb-3">
              <GapBadge label={website.label} tone={website.tone} />
              <GapBadge label={ai.label} tone={ai.tone} />
              <GapBadge label={social.label} tone={social.tone} />
            </div>
            <div className="text-xs text-neutral-400 space-y-1 font-mono">
              <div>📧 {lead.email}</div>
              <div>📍 {lead.city}, {lead.state}</div>
              {lead.domain && <div>🔗 {lead.domain}</div>}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-2">
              Sample Page Hook
            </span>
            <div className="flex flex-col sm:flex-row gap-2 mb-3">
              <input
                type="url"
                value={draftUrl}
                onChange={(e) => setDraftUrl(e.target.value)}
                placeholder="https://your-demo-pages.com/business-slug"
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs outline-none focus:border-orange-500"
              />
              <button
                onClick={() => onUpdateSamplePage(lead.id, draftUrl.trim())}
                className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
              >
                Save Hook
              </button>
            </div>
            {lead.samplePageUrl && (
              <a
                href={lead.samplePageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-orange-400 hover:text-orange-300 underline underline-offset-2 block mb-3"
              >
                View live sample page ↗
              </a>
            )}

            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block mb-2">
              Add to Outreach Queue
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => onAddToQueue(lead, "Email")}
                className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs font-medium px-3 py-2 rounded-lg transition-colors"
              >
                ✉️ Queue Cold Email
              </button>
              <button
                onClick={() => onAddToQueue(lead, "DM")}
                className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs font-medium px-3 py-2 rounded-lg transition-colors"
              >
                💬 Queue Social DM
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
