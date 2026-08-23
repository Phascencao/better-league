import Header from "./components/Header";
import CardBestChoices from "./components/CardBestChoices";
import InputSummoner from "./components/InputSummoner";
import { useState } from "react";

function Home() {
  const [summoner, setSummoner] = useState("");
  console.log(summoner);

  function SerchRiotSummoner(summonerName) {
    const newSummoner = summonerName.trim();
    setSummoner(newSummoner);
  }
  return (
    <div className="min-h-screen w-full bg-base ">
      <Header />

      <h1 className="text-[#17223A] text-2xl font-bold text-center py-20">
        Leia a partida antes de jogá-la
      </h1>

      <InputSummoner
        SerchRiotSummoner={SerchRiotSummoner}
        summoner={summoner}
      />

      <div className="flex justify-center">
        <CardBestChoices>teste</CardBestChoices>
        <CardBestChoices>teste</CardBestChoices>
        <CardBestChoices>teste</CardBestChoices>
      </div>
    </div>
  );
}

export default Home;
