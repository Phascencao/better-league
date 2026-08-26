import RoleIcon from "./RoleIcon";
import ChampionPickHighlight from "./ChampionPickHighlight";
import TierGroup from "./TierGroup";

const roleLabels = {
  TOP: "Topo",
  JG: "Selva",
  MID: "Meio",
  ADC: "Atirador",
  SUP: "Suporte",
};

const tierOrder = ["S", "A", "B", "C"];

function RoleTierListCard({ role, champions, pick }) {
  const championsByTier = tierOrder.map((tier) => ({
    tier,
    champions: champions.filter((c) => c.tier === tier),
  }));

  return (
    <div className="bg-[#FBF3E1] border border-[#C9A961]/50 rounded-xl px-6 py-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-md bg-[#C9A961] text-[#17223A] flex items-center justify-center flex-shrink-0">
          <RoleIcon role={role} className="h-5 w-5" />
        </div>
        <h2 className="font-serif text-[#17223A] text-lg font-bold">
          Tier list de {roleLabels[role]}
        </h2>
      </div>

      {pick && <ChampionPickHighlight {...pick} />}

      {championsByTier.map(({ tier, champions: tierChamps }) => (
        <TierGroup key={tier} tier={tier} champions={tierChamps} />
      ))}
    </div>
  );
}

export default RoleTierListCard;