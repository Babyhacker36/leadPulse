"use client";

interface SearchBoxProps {
  searchNiche: string;
  setSearchNiche: (val: string) => void;
  searchLocation: string;
  setSearchLocation: (val: string) => void;
  isScraping: boolean;
  onScrape: () => void;
}

export default function SearchBox({
  searchNiche,
  setSearchNiche,
  searchLocation,
  setSearchLocation,
  isScraping,
  onScrape,
}: SearchBoxProps) {
  return (
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 flex flex-col md:flex-row gap-3 shadow-xl backdrop-blur-sm">
      <div className="flex-1 flex items-center bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 focus-within:border-orange-500 transition-colors">
        <span className="text-neutral-500 mr-3">🔍</span>
        <input
          type="text"
          value={searchNiche}
          onChange={(e) => setSearchNiche(e.target.value)}
          placeholder="Niche (e.g., Dentists, Roofers)"
          className="bg-transparent border-none outline-none w-full text-sm placeholder:text-neutral-600"
        />
      </div>
      <div className="flex-1 flex items-center bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 focus-within:border-orange-500 transition-colors">
        <span className="text-neutral-500 mr-3">📍</span>
        <input
          type="text"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          placeholder="Location (e.g., Austin, TX)"
          className="bg-transparent border-none outline-none w-full text-sm placeholder:text-neutral-600"
        />
      </div>
      <button
        disabled={isScraping}
        onClick={onScrape}
        className="bg-orange-600 hover:bg-orange-500 text-white font-medium px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-orange-600/20 active:scale-95 disabled:opacity-50"
      >
        {isScraping ? "Scraping Leads..." : "⚡ Scrape Leads"}
      </button>
    </div>
  );
}
