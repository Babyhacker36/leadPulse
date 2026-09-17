import { Lead, SocialStatus, Tier, WebsiteStatus } from "@/app/types";

// Comprehensive State-Level Area Code Map for nationwide coverage
const STATE_AREA_CODES: Record<string, string> = {
  AL: "205", AK: "907", AZ: "602", AR: "501", CA: "213", CO: "303",
  CT: "203", DE: "302", FL: "305", GA: "404", HI: "808", ID: "208",
  IL: "312", IN: "317", IA: "515", KS: "316", KY: "502", LA: "504",
  ME: "207", MD: "301", MA: "617", MI: "313", MN: "612", MS: "601",
  MO: "314", MT: "406", NE: "402", NV: "702", NH: "603", NJ: "201",
  NM: "505", NY: "212", NC: "704", ND: "701", OH: "216", OK: "405",
  OR: "503", PA: "215", RI: "401", SC: "803", SD: "605", TN: "615",
  TX: "512", UT: "801", VT: "802", VA: "703", WA: "206", WV: "304",
  WI: "414", WY: "307", DC: "202",
};

const DISTRICTS = [
  "Downtown", "Metro", "Central", "West End", "Harbor",
  "Northside", "Southpark", "Business District",
];

const WEBSITE_STATUSES: WebsiteStatus[] = [
  "Missing", "Outdated", "Outdated", "Broken", "Good",
];

const SOCIAL_STATUSES: SocialStatus[] = [
  "Missing", "Inactive", "Inactive", "Active",
];

// Deterministic PRNG (mulberry32) so the same niche/location/index always
// produces the same lead — this keeps server-rendered and client-rendered
// output identical and avoids React hydration mismatches.
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return hash;
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

function gapScore(
  websiteStatus: WebsiteStatus,
  hasAiAgent: boolean,
  socialStatus: SocialStatus,
  rand: () => number
): number {
  let score = 55;
  if (websiteStatus === "Missing") score += 20;
  else if (websiteStatus === "Broken") score += 18;
  else if (websiteStatus === "Outdated") score += 10;

  if (!hasAiAgent) score += 8;
  if (socialStatus === "Missing") score += 7;
  else if (socialStatus === "Inactive") score += 4;

  return Math.min(99, score + Math.floor(rand() * 10));
}

function tierFromScore(score: number): Tier {
  if (score >= 80) return "HOT";
  if (score >= 65) return "WARM";
  return "COLD";
}

export interface GenerateLeadsParams {
  niche: string;
  location: string;
  count?: number;
}

export function generateLeads({
  niche,
  location,
  count = 8,
}: GenerateLeadsParams): Lead[] {
  const parts = location.split(",").map((p) => p.trim());
  const city = parts[0] || "Local City";
  const stateInput = (parts[1] || "FL").toUpperCase();
  const state = STATE_AREA_CODES[stateInput] ? stateInput : "FL";
  const areaCode = STATE_AREA_CODES[state] || "407";
  const capitalizedNiche =
    niche.charAt(0).toUpperCase() + niche.slice(1).toLowerCase();

  return Array.from({ length: count }, (_, index) => {
    const rand = mulberry32(hashString(`${niche}|${location}|${index}`));
    const district = DISTRICTS[index % DISTRICTS.length];
    const bizName =
      index % 2 === 0
        ? `${city} ${district} ${capitalizedNiche}`
        : `${district} ${capitalizedNiche} of ${city}`;

    const cleanSlug = bizName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const websiteStatus = pick(WEBSITE_STATUSES, rand);
    const hasAiAgent = rand() < 0.16;
    const socialStatus = pick(SOCIAL_STATUSES, rand);
    const score = gapScore(websiteStatus, hasAiAgent, socialStatus, rand);

    return {
      id: index + 1,
      business: bizName,
      phone: `(${areaCode}) ${Math.floor(rand() * 899) + 100}-${Math.floor(rand() * 8999) + 1000}`,
      email: `contact@${cleanSlug}.com`,
      city,
      state,
      niche: capitalizedNiche,
      domain: websiteStatus === "Missing" ? null : `${cleanSlug}.com`,
      websiteStatus,
      hasAiAgent,
      socialStatus,
      samplePageUrl: null,
      score,
      tier: tierFromScore(score),
      status: "NEW",
    };
  });
}
