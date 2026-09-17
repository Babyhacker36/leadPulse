interface Lead {
  id: number;
  business: string;
  domain: string;
  phone: string;
  grade: string;
  failure: string;
  score: number;
  tier: string;
  status: string;
}

interface LeadsTableProps {
  leads: Lead[];
}

export default function LeadsTable({ leads }: LeadsTableProps) {
  return (
    <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-950/80 text-neutral-400 text-xs uppercase font-mono tracking-wider border-b border-neutral-800">
            <tr>
              <th className="py-3.75 px-6 font-medium">Business</th>
              <th className="py-3.75 px-6 font-medium">Phone</th>
              <th className="py-3.75 px-6 font-medium">Audit Grade</th>
              <th className="py-3.75 px-6 font-medium">AI Outreach Score</th>
              <th className="py-3.75 px-6 font-medium">Status</th>
              <th className="py-3.75 px-6 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="hover:bg-neutral-800/30 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="font-medium text-white">{lead.business}</div>
                  <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                    🔗 {lead.domain}
                  </div>
                </td>
                <td className="py-4 px-6 text-neutral-400 font-mono text-xs">
                  {lead.phone}
                </td>
                <td className="py-4 px-6">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-neutral-800 border border-neutral-700 text-xs font-mono">
                    <span className="font-bold text-orange-400">
                      {lead.grade}
                    </span>
                    <span className="text-neutral-400">{lead.failure}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{lead.score}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
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
                  <button className="bg-orange-600/10 hover:bg-orange-600 text-orange-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium border border-orange-500/20 transition-all">
                    ✍️ Draft Email
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
