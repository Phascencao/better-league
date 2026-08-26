function VsEloCard({ eloLabel, stats }) {
  return (
    <div className="bg-[#FBF3E1] border border-[#C9A961]/50 rounded-xl px-5 py-4">
      <h2 className="text-[#17223A] text-sm font-bold uppercase tracking-wide">
        Contra o elo
      </h2>
      <p className="text-[10px] text-[#8A6A1B] mb-3">{eloLabel}</p>

      {stats.map((stat) => (
        <div key={stat.label} className="mb-3 last:mb-0">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[#8A6A1B]">{stat.label}</span>
            <span className="text-[#17223A] font-bold">{stat.value}</span>
          </div>
          <div className="w-full h-1.5 bg-[#E8DCC0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C9A961]"
              style={{
                width: `${Math.min((stat.value / stat.max) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default VsEloCard;