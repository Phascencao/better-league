import ChampionPlaceholder from "./ChampionPlaceholder";

function MatchCard({ match }) {
  const isVictory = match.result === "victory";
  const resultLabel = isVictory ? "VITÓRIA" : "DERROTA";
  const accentColor = isVictory ? "#2F7D5C" : "#B03A2E";

  return (
    <div
      className="flex items-center justify-between bg-[#FBF3E1] border-l-4 rounded-lg px-5 py-4"
      style={{ borderLeftColor: accentColor }}
    >
      <div className="flex items-center gap-5">
        <div className="w-20">
          <p
            className="text-xs font-bold uppercase tracking-wide"
            style={{ color: accentColor }}
          >
            {resultLabel}
          </p>
          <p className="text-[10px] text-[#8A6A1B] uppercase tracking-wide mt-0.5">
            {match.queueType}
          </p>
          <p className="text-[10px] text-[#8A6A1B] mt-1">
            {match.timeAgo} · {match.duration}
          </p>
        </div>

        <ChampionPlaceholder className="w-11 h-11 rounded-md flex-shrink-0" />

        <div>
          <p className="text-[#17223A] text-lg font-bold leading-none">
            {match.kills} / {match.deaths} / {match.assists}
          </p>
          <p className="text-[11px] text-[#8A6A1B] mt-1">
            KDA {match.kdaRatio.toFixed(1)} · {match.csPerMin.toFixed(1)}{" "}
            CS/min · P/Kill {match.killParticipation}%
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-sm ${
                i < match.itemsFilled
                  ? "bg-[#E8DCC0] border border-[#C9A961]/50"
                  : "border border-dashed border-[#C9A961]/40"
              }`}
            />
          ))}
        </div>

        <span
          className="text-sm font-bold w-16 text-right"
          style={{ color: match.pdlChange ? accentColor : "#8A6A1B" }}
        >
          {match.pdlChange || "—"}
        </span>
      </div>
    </div>
  );
}

export default MatchCard;