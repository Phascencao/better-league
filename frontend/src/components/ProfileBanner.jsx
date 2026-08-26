import ChampionPlaceholder from "./ChampionPlaceholder";

function ProfileBanner({
  gameName,
  tagLine,
  level,
  ladderRegion,
  ladderPosition,
  ladderScore,
  updatedAgo,
  onShowHistory,
  onRefresh,
}) {
  return (
    <div className="relative overflow-hidden bg-[#F5EEDA] border-b border-[#C9A961]/30">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, rgba(160, 130, 60, 0.12) 0px, rgba(160, 130, 60, 0.12) 2px, transparent 2px, transparent 12px)",
          WebkitMaskImage:
            "linear-gradient(to left, black 0%, transparent 100%)",
          maskImage: "linear-gradient(to left, black 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto flex items-center justify-between px-6 py-8">
        <div className="flex items-center gap-5">
          <div className="relative">
            <ChampionPlaceholder className="w-20 h-20 rounded-xl" />
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#17223A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {level}
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-1">
              <h1 className="font-serif text-[#17223A] text-2xl font-bold">
                {gameName}
              </h1>
              <span className="text-[#8A6A1B] text-base font-semibold">
                #{tagLine}
              </span>
            </div>
            <p className="text-[#8A6A1B] text-xs mt-1">
              Ladder {ladderRegion} #{ladderPosition} {ladderScore} |
              atualizado há {updatedAgo}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onShowHistory}
            className="text-[#8A6A1B] text-sm font-semibold border border-[#C9A961]/60 rounded-md px-4 py-2 hover:bg-[#F1E3BB] transition-colors"
          >
            Histórico
          </button>
          <button
            onClick={onRefresh}
            className="bg-[#C9A961] text-[#17223A] text-sm font-bold rounded-md px-4 py-2 hover:opacity-90 transition-opacity"
          >
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileBanner;