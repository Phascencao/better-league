import Header from "./components/Header";
import CardBestChoices from "./components/CardBestChoices";
import CardTrendingChampions from "./components/CardTrendingChampions";
import CardRanking from "./components/CardRanking";
import InputSummoner from "./components/InputSummoner";
import { useState } from "react";

const freeRotationChampions = [
  { name: "Yasuo", role: "MID" },
  { name: "Lee Sin", role: "JG" },
  { name: "Garen", role: "TOP" },
  { name: "Lux", role: "SUP" },
  { name: "Jinx", role: "ADC" },
];

function Home() {
  const [summoner, setSummoner] = useState("");

  function SerchRiotSummoner(summonerName) {
    const newSummoner = summonerName.trim();
    setSummoner(newSummoner);
  }

  return (
    <div className="min-h-screen w-full bg-base">
      <Header />

      {/* HERO: eyebrow + título + subtítulo + fundo listrado */}
      <div
  className="relative"
  style={{
    backgroundImage:
      "repeating-linear-gradient(-45deg, rgba(160, 130, 60, 0.09) 0px, rgba(160, 130, 60, 0.09) 2px, transparent 2px, transparent 12px)",
  }}
>
  <div className="max-w-2xl mx-auto text-center px-4 pt-20 pb-10">
    <p className="text-[#8A6A1B] text-xs font-bold tracking-[0.3em] uppercase mb-4">
      Temporada 15 · Patch 15.16
    </p>

    <h1 className="font-serif text-[#17223A] text-4xl md:text-5xl font-bold leading-tight mb-6">
      Leia a partida antes
      <br />
      de jogá-la
    </h1>

    <p className="text-[#5B5142] text-base max-w-xl mx-auto">
      Histórico, tier list e análise ao vivo. Um número em destaque por
      bloco, o resto é contexto.
    </p>
  </div>

  <div className="pb-16">
    <InputSummoner
      SerchRiotSummoner={SerchRiotSummoner}
      summoner={summoner}
    />
  </div>
</div>

      <div className="flex flex-wrap justify-center gap-6 px-4 pb-20">
        <CardBestChoices title="Rotação grátis da semana" badge="SEMANAL">
          {freeRotationChampions.map((champion) => (
            <div
              key={champion.name}
              className="flex items-center justify-between py-3 border-b border-[#E8DCC0] last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-md flex-shrink-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #E8DCC0, #E8DCC0 4px, #F5EEDA 4px, #F5EEDA 8px)",
                  }}
                />
                <span className="text-[#17223A] text-sm font-bold">
                  {champion.name}
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A6A1B] bg-[#F1E3BB] border border-[#C9A961]/50 rounded-md px-2 py-1">
                {champion.role}
              </span>
            </div>
          ))}
        </CardBestChoices>

        <CardTrendingChampions />

        <CardRanking />
      </div>
    </div>
  );
}

export default Home;