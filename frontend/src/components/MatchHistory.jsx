import { useState } from "react";
import MatchCard from "./MatchCard";

const queueTabs = ["Ranqueada solo", "Flex", "Normal", "ARAM"];

function MatchHistory({ summary, matches, onLoadMore }) {
  const [activeTab, setActiveTab] = useState(queueTabs[0]);

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2">
          {queueTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-bold uppercase tracking-wide rounded-md px-4 py-2 border transition-colors ${
                activeTab === tab
                  ? "bg-[#C9A961] text-[#17223A] border-[#C9A961]"
                  : "bg-[#FBF3E1] text-[#8A6A1B] border-[#C9A961]/40"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <p className="text-[11px] text-[#8A6A1B]">
          ÚLTIMAS {summary.totalGames} · {summary.wins}V {summary.losses}D ·{" "}
          {summary.winRate}%
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>

      <button
        onClick={onLoadMore}
        className="w-full text-[#8A6A1B] text-sm font-semibold border border-[#C9A961]/50 rounded-lg py-3 hover:bg-[#F1E3BB] transition-colors"
      >
        Carregar mais 10 partidas
      </button>
    </div>
  );
}

export default MatchHistory;