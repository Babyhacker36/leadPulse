import { NextResponse } from "next/server";
import { generateLeads } from "@/app/lib/leadGenerator";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const niche = searchParams.get("niche") || "Contractors";
  const location = searchParams.get("location") || "Austin, TX";

  try {
    const leads = generateLeads({ niche, location, count: 8 });
    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Nationwide lead generation error:", error);
    return NextResponse.json({
      leads: [],
      error: "Failed to generate nationwide leads.",
    });
  }
}
