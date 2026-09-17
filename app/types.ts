export type WebsiteStatus = "Missing" | "Outdated" | "Broken" | "Good";
export type SocialStatus = "Missing" | "Inactive" | "Active";
export type Tier = "HOT" | "WARM" | "COLD";
export type LeadStatus = "NEW" | "QUEUED" | "CONTACTED";

export interface Lead {
  id: number;
  business: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  niche: string;
  domain: string | null;
  websiteStatus: WebsiteStatus;
  hasAiAgent: boolean;
  socialStatus: SocialStatus;
  samplePageUrl: string | null;
  score: number;
  tier: Tier;
  status: LeadStatus;
}

export type Channel = "Email" | "DM";
export type QueueItemStatus = "Queued" | "Sending" | "Sent" | "Skipped";

export interface QueueItem {
  id: string;
  leadId: number;
  business: string;
  channel: Channel;
  status: QueueItemStatus;
  addedAt: number;
  sentAt?: number;
}

export const DAILY_CAPS: Record<Channel, number> = {
  Email: 50,
  DM: 30,
};
