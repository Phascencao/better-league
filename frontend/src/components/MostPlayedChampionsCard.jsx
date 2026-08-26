import ChampionPlaceholder from "./ChampionPlaceholder";

function MostPlayedChampionsCard({ champions }) {
  return (
    <div className="bg-[#FBF3E1] border border-[#C9A961]/50 rounded-xl px-5 py-4">
      <h2 className="text-[#17223A] text-sm font-bold uppercase tracking-wide mb-3">
        Campeões mais jogados
      </h2>

      {champions.map((champion) => (
        <div
          key={champion.name}
          className="flex items-center justify-between py-2.5 border-b border-[#E8DCC0] last:border-b-0"
        >
          <div className="flex items-center gap-3">
            <ChampionPlaceholder className="w-9 h-9 rounded-md flex-shrink-0" />
            <div>
              <p className="text-[#17223A] text-sm font-bold leading-tight">
                {champion.name}
              </p>
              <p className="text-[10px] text-[#8A6A1B]">
                {champion.games} partidas · {champion.kda.toFixed(1)} KDA
              </p>
            </div>
          </div>
          <span className="text-[#17223A] text-sm font-bold">
            {champion.winRate}%
          </span>
        </div>
      ))}
    </div>
  );
}

export default MostPlayedChampionsCard;