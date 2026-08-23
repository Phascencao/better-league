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

      <h1 className="text-[#17223A] text-2xl font-bold text-center py-20">
        Leia a partida antes de jogá-la
      </h1>

      <InputSummoner
        SerchRiotSummoner={SerchRiotSummoner}
        summoner={summoner}
      />

      <div className="flex flex-wrap justify-center gap-6 px-4 pb-20 pt-16">
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