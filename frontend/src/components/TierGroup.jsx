import ChampionAvatar from "./ChampionAvatar";

const tierColors = {
  S: "#B0473B",
  A: "#C97C2E",
  B: "#4A6FA0",
  C: "#8A8577",
};

function TierGroup({ tier, champions }) {
  if (champions.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: tierColors[tier] }}
        >
          {tier}
        </div>
        <div className="flex-1 h-px bg-[#C9A961]/30" />
      </div>

      <div className="flex flex-wrap gap-5">
        {champions.map((champion) => (
          <ChampionAvatar key={champion.name} name={champion.name} />
        ))}
      </div>
    </div>
  );
}

export default TierGroup;