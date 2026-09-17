import { Lead } from "@/app/types";

export interface GapInfo {
  label: string;
  tone: "critical" | "warning" | "good";
}

export function websiteGap(lead: Lead): GapInfo {
  switch (lead.websiteStatus) {
    case "Missing":
      return { label: "Website: Missing", tone: "critical" };
    case "Broken":
      return { label: "Website: Broken", tone: "critical" };
    case "Outdated":
      return { label: "Website: Outdated", tone: "warning" };
    case "Good":
      return { label: "Website: Healthy", tone: "good" };
  }
}

export function aiAgentGap(lead: Lead): GapInfo {
  return lead.hasAiAgent
    ? { label: "AI Agent: Active", tone: "good" }
    : { label: "No 24/7 AI Agent", tone: "critical" };
}

export function socialGap(lead: Lead): GapInfo {
  switch (lead.socialStatus) {
    case "Missing":
      return { label: "Social: Missing", tone: "critical" };
    case "Inactive":
      return { label: "Social: Inactive", tone: "warning" };
    case "Active":
      return { label: "Social: Active", tone: "good" };
  }
}

export function gapCount(lead: Lead): number {
  let count = 0;
  if (lead.websiteStatus !== "Good") count += 1;
  if (!lead.hasAiAgent) count += 1;
  if (lead.socialStatus !== "Active") count += 1;
  return count;
}
