function RankSummaryCard({ queueLabel, tier, lp, wins, losses, winRate }) {
  return (
    <div className="bg-[#FBF3E1] border border-[#C9A961]/50 rounded-xl px-5 py-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A6A1B] mb-3">
        {queueLabel}
      </p>

      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-12 h-12 rounded-full flex-shrink-0"
          style={{
            background: "radial-gradient(circle at 30% 30%, #E8C97A, #B8860B)",
          }}
        />
        <div>
          <p className="font-serif text-[#17223A] text-lg font-bold leading-tight">
            {tier}
          </p>
          <p className="text-[#8A6A1B] text-xs font-semibold">{lp} PdL</p>
        </div>
      </div>

      <div className="w-full h-2 bg-[#E8DCC0] rounded-full overflow-hidden mb-2">
        <div className="h-full bg-[#C9A961]" style={{ width: `${winRate}%` }} />
      </div>

      <div className="flex justify-between text-[11px] text-[#8A6A1B]">
        <span>
          {wins}V · {losses}D
        </span>
        <span>{winRate.toFixed(1)}% vitórias</span>
      </div>
    </div>
  );
}

export default RankSummaryCard;