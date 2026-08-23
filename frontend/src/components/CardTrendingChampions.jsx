import { useState } from "react";

// Dados falsos simulando o resultado do pipeline League-V4 -> Match-V5 -> agregação
// No back-end real, isso viria de algo como: GET /api/trending-champions?region=BR1
const fakeTrendingData = {
  BR1: [
    { champion: "Ahri", role: "MID", picks: 87, wins: 47, winRate: 54.0, pickRate: 8.7 },
    { champion: "Viego", role: "JG", picks: 91, wins: 48, winRate: 52.7, pickRate: 9.1 },
    { champion: "Janna", role: "SUP", picks: 64, wins: 35, winRate: 54.7, pickRate: 6.4 },
    { champion: "Garen", role: "TOP", picks: 78, wins: 40, winRate: 51.3, pickRate: 7.8 },
    { champion: "Jinx", role: "ADC", picks: 95, wins: 49, winRate: 51.6, pickRate: 9.5 },
  ],
  NA1: [
    { champion: "Yasuo", role: "MID", picks: 102, wins: 51, winRate: 50.0, pickRate: 10.2 },
    { champion: "Lee Sin", role: "JG", picks: 88, wins: 46, winRate: 52.3, pickRate: 8.8 },
    { champion: "Thresh", role: "SUP", picks: 70, wins: 38, winRate: 54.3, pickRate: 7.0 },
    { champion: "Ornn", role: "TOP", picks: 55, wins: 30, winRate: 54.5, pickRate: 5.5 },
    { champion: "Kai'Sa", role: "ADC", picks: 99, wins: 50, winRate: 50.5, pickRate: 9.9 },
  ],
};

const regions = [
  "BR1", "EUN1", "EUW1", "JP1", "KR", "LA1", "LA2",
  "ME1", "NA1", "OC1", "RU", "SG2", "TR1", "TW2", "VN2",
];

function CardTrendingChampions() {
  const [region, setRegion] = useState("BR1");

  // Fallback pra região sem dado fake ainda cadastrado (o back-end real cobriria todas)
  const champions = fakeTrendingData[region] || fakeTrendingData.BR1;

  return (
    <div className="w-full max-w-sm bg-[#FBF3E1] border border-[#C9A961]/50 rounded-xl px-6 py-5">
      {/* Cabeçalho: título + seletor de região */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#C9A961]/30">
        <h2 className="text-[#17223A] text-sm font-bold uppercase tracking-wide">
          Campeões em alta
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

      {/* Cabeçalho das colunas */}
      <div className="flex items-center justify-between px-1 pb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A6A1B]">
          Campeão
        </span>
        <div className="flex gap-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A6A1B] w-12 text-right">
            Winrate
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A6A1B] w-12 text-right">
            Pickrate
          </span>
        </div>
      </div>

      {/* Lista de campeões em alta */}
      <div>
        {champions.map((c) => (
          <div
            key={c.champion}
            className="flex items-center justify-between py-2.5 border-b border-[#E8DCC0] last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-md flex-shrink-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, #E8DCC0, #E8DCC0 4px, #F5EEDA 4px, #F5EEDA 8px)",
                }}
              />
              <div>
                <p className="text-[#17223A] text-sm font-bold leading-tight">
                  {c.champion}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#8A6A1B]">
                  {c.role}
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <span className="text-[#17223A] text-sm font-bold w-12 text-right">
                {c.winRate.toFixed(1)}%
              </span>
              <span className="text-[#8A6A1B] text-sm w-12 text-right">
                {c.pickRate.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardTrendingChampions;