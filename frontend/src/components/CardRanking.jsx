import { useState } from "react";

// Dados falsos simulando o retorno da LEAGUE-V4 (liga da fila selecionada)
const fakeRankingData = {
  RANKED_SOLO_5x5: [
    { rank: 1, summonerName: "Faker", tag: "KR1", tier: "CHALLENGER", lp: 1487, wins: 312, losses: 198 },
    { rank: 2, summonerName: "Caps", tag: "EUW", tier: "CHALLENGER", lp: 1402, wins: 289, losses: 210 },
    { rank: 3, summonerName: "Chovy", tag: "KR1", tier: "CHALLENGER", lp: 1355, wins: 275, losses: 190 },
    { rank: 4, summonerName: "Ruler", tag: "KR2", tier: "GRANDMASTER", lp: 1298, wins: 260, losses: 205 },
    { rank: 5, summonerName: "Canyon", tag: "KR1", tier: "GRANDMASTER", lp: 1250, wins: 245, losses: 200 },
  ],
  RANKED_FLEX_SR: [
    { rank: 1, summonerName: "Nightbringer", tag: "BR1", tier: "CHALLENGER", lp: 890, wins: 120, losses: 80 },
    { rank: 2, summonerName: "Shadowfang", tag: "BR1", tier: "GRANDMASTER", lp: 820, wins: 110, losses: 90 },
    { rank: 3, summonerName: "IronWill", tag: "BR1", tier: "GRANDMASTER", lp: 780, wins: 105, losses: 95 },
    { rank: 4, summonerName: "Voidwalker", tag: "BR1", tier: "MASTER", lp: 690, wins: 95, losses: 88 },
    { rank: 5, summonerName: "Starforge", tag: "BR1", tier: "MASTER", lp: 645, wins: 90, losses: 92 },
  ],
};

const regions = [
  "BR1", "EUN1", "EUW1", "JP1", "KR", "LA1", "LA2",
  "ME1", "NA1", "OC1", "RU", "SG2", "TR1", "TW2", "VN2",
];

const tierColors = {
  CHALLENGER: "text-[#00A99D]",
  GRANDMASTER: "text-[#C0392B]",
  MASTER: "text-[#8E44AD]",
};

function CardRanking() {
  const [region, setRegion] = useState("BR1");
  const [queueType, setQueueType] = useState("RANKED_SOLO_5x5");

  const players = fakeRankingData[queueType];

  return (
    <div className="w-full max-w-sm bg-[#FBF3E1] border border-[#C9A961]/50 rounded-xl px-6 py-5">
      {/* Cabeçalho: título + seletor de região */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#C9A961]/30">
        <h2 className="text-[#17223A] text-sm font-bold uppercase tracking-wide">
          Ranking da fila
        </h2>

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="bg-[#F1E3BB] border border-[#C9A961]/50 text-[#8A6A1B] text-xs font-semibold uppercase tracking-wide rounded-md px-2 py-1 cursor-pointer focus:outline-none"
        >
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Toggle: Solo/Duo x Flexível */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setQueueType("RANKED_SOLO_5x5")}
          className={`flex-1 text-xs font-bold uppercase tracking-wide rounded-md py-1.5 border transition-colors ${
            queueType === "RANKED_SOLO_5x5"
              ? "bg-[#C9A961] text-[#17223A] border-[#C9A961]"
              : "bg-transparent text-[#8A6A1B] border-[#C9A961]/40"
          }`}
        >
          Solo/Duo
        </button>
        <button
          onClick={() => setQueueType("RANKED_FLEX_SR")}
          className={`flex-1 text-xs font-bold uppercase tracking-wide rounded-md py-1.5 border transition-colors ${
            queueType === "RANKED_FLEX_SR"
              ? "bg-[#C9A961] text-[#17223A] border-[#C9A961]"
              : "bg-transparent text-[#8A6A1B] border-[#C9A961]/40"
          }`}
        >
          Flexível
        </button>
      </div>

      {/* Lista dos jogadores no topo do ranking */}
      <div>
        {players.map((player) => (
          <div
            key={player.rank}
            className="flex items-center justify-between py-2.5 border-b border-[#E8DCC0] last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span className="text-[#8A6A1B] text-xs font-bold w-4">
                {player.rank}
              </span>
              <div>
                <p className="text-[#17223A] text-sm font-bold leading-tight">
                  {player.summonerName}
                  <span className="text-[#8A6A1B] font-normal"> #{player.tag}</span>
                </p>
                <p className={`text-[10px] font-bold uppercase tracking-wide ${tierColors[player.tier] || "text-[#8A6A1B]"}`}>
                  {player.tier}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[#17223A] text-sm font-bold">{player.lp} LP</p>
              <p className="text-[10px] text-[#8A6A1B]">
                {player.wins}V {player.losses}D
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardRanking;