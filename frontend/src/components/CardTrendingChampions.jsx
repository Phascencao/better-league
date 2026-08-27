import { useEffect, useState } from "react";
import { getTrendingChampions } from "../services/champions.js";
import { getChampionImageUrl } from "../services/ddragon.js";

// Dados falsos simulando o resultado do pipeline League-V4 -> Match-V5 -> agregação
// No back-end real, isso viria de algo como: GET /api/trending-champions?region=BR1


const regions = [
  "BR1", "EUN1", "EUW1", "JP1", "KR", "LA1", "LA2",
  "ME1", "NA1", "OC1", "RU", "SG2", "TR1", "TW2", "VN2",
];

function CardTrendingChampions() {
  const [region, setRegion] = useState("BR1");
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTrendingChampions() {
      try {
        setLoading(true);
        setError(null);

        const data = await getTrendingChampions();
        setChampions(data);
      } catch (error) {
        console.error(error);
        setError("Erro ao buscar campeões em alta");
      } finally {
        setLoading(false);
      }
    }

    loadTrendingChampions();
  }, []);
  
    if (loading) {
      return (
        <div className="w-full max-w-sm bg-[#FBF3E1] border border-[#C9A961]/50 rounded-xl px-6 py-5">
          <p className="text-[#17223A] text-sm font-bold">
            Carregando campeões...
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="w-full max-w-sm bg-[#FBF3E1] border border-[#C9A961]/50 rounded-xl px-6 py-5">
          <p className="text-red-600 text-sm font-bold">
            {error}
          </p>
        </div>
      );
    }

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
              <img
                src={getChampionImageUrl(c.champion)}
                alt={c.champion}
                className="w-9 h-9 rounded-md object-cover flex-shrink-0"
              />
              <div>
                <p className="text-[#17223A] text-sm font-bold leading-tight">
                  {c.champion}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#8A6A1B]">
                  {c.games} Partidas
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