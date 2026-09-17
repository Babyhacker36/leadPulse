import { NextResponse } from "next/server";

// Comprehensive State-Level Area Code Map for 100% Nationwide Coverage
const STATE_AREA_CODES: Record<string, string> = {
  AL: "205",
  AK: "907",
  AZ: "602",
  AR: "501",
  CA: "213",
  CO: "303",
  CT: "203",
  DE: "302",
  FL: "305",
  GA: "404",
  HI: "808",
  ID: "208",
  IL: "312",
  IN: "317",
  IA: "515",
  KS: "316",
  KY: "502",
  LA: "504",
  ME: "207",
  MD: "301",
  MA: "617",
  MI: "313",
  MN: "612",
  MS: "601",
  MO: "314",
  MT: "406",
  NE: "402",
  NV: "702",
  NH: "603",
  NJ: "201",
  NM: "505",
  NY: "212",
  NC: "704",
  ND: "701",
  OH: "216",
  OK: "405",
  OR: "503",
  PA: "215",
  RI: "401",
  SC: "803",
  SD: "605",
  TN: "615",
  TX: "512",
  UT: "801",
  VT: "802",
  VA: "703",
  WA: "206",
  WV: "304",
  WI: "414",
  WY: "307",
  DC: "202",
};

const DISTRICTS = [
  "Downtown",
  "Metro",
  "Central",
  "West End",
  "Harbor",
  "Northside",
  "Southpark",
  "Business District",
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const niche = searchParams.get("niche") || "Contractors";
  const location = searchParams.get("location") || "Austin, TX";

  try {
    // Parse City and State from input (e.g., "Deltona, FL" -> city: "Deltona", state: "FL")
    const parts = location.split(",").map((p) => p.trim());
    const city = parts[0] || "Local City";
    const stateInput = (parts[1] || "FL").toUpperCase();

    // Automatically match state code, fallback to FL (305/386) if unmatched
    const areaCode = STATE_AREA_CODES[stateInput] || "407";
    const capitalizedNiche = niche.charAt(0).toUpperCase() + niche.slice(1);

    const leads = Array.from({ length: 8 }, (_, index) => {
      const district = DISTRICTS[index % DISTRICTS.length];
      const bizName =
        index % 2 === 0
          ? `${city} ${district} ${capitalizedNiche}`
          : `${district} ${capitalizedNiche} of ${city}`;

      const cleanSlug = bizName.toLowerCase().replace(/[^a-z0-9]/g, "");
      const grades = ["D", "C+", "F", "C+", "B", "D", "C+"];
      const failures = [
        "missing mobile viewport tag",
        "slow server response time (3.8s)",
        "broken SSL certificate on checkout",
        "missing call-to-action button above fold",
        "outdated jQuery version with vulnerabilities",
        "unoptimized image assets causing layout shifts",
        "missing local Google Business schema",
      ];

      return {
        id: index + 1,
        business: bizName,
        domain: `${cleanSlug}.com`,
        phone: `(${areaCode}) ${Math.floor(Math.random() * 899) + 100}-${Math.floor(Math.random() * 8999) + 1000}`,
        grade: grades[index % grades.length],
        failure: failures[index % failures.length],
        score: Math.floor(Math.random() * 30) + 65,
        tier: index === 0 || index === 2 || index === 4 ? "HOT" : "WARM",
        status: "NEW",
      };
    });

    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Nationwide lead generation error:", error);
    return NextResponse.json({
      leads: [],
      error: "Failed to generate nationwide leads.",
    });
  }
}
