import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Header from "../components/Header";
import ProfileBanner from "../components/ProfileBanner";
import RankSummaryCard from "../components/RankSummaryCard";
import MostPlayedChampionsCard from "../components/MostPlayedChampionsCard";
import VsEloCard from "../components/VsEloCard";
import MatchHistory from "../components/MatchHistory";
import { getSummonerByRiotId } from "../services/summoner";

const fakeProfileData = {
  // ... mantém exatamente igual ao que já está aí (rank, mostPlayedChampions,
  // vsElo, matchSummary, matches, ladderRegion, ladderPosition, ladderScore,
  // updatedAgo). Só gameName/tagLine/level do topo do objeto deixam de ser
  // usados no banner, mas pode deixar no objeto sem problema.
};

function Profile() {
  const { gameName, tagLine } = useParams();
  const [summoner, setSummoner] = useState(null);

  // No futuro isso vira um fetch usando gameName/tagLine da URL pro resto dos dados.
  const data = fakeProfileData;

  useEffect(() => {
    let ativo = true;

    async function carregarSummoner() {
      try {
        const resposta = await getSummonerByRiotId(gameName, tagLine);
        if (ativo) setSummoner(resposta.summoner);
      } catch (error) {
        console.error(error);
        if (ativo) toast.error("Não foi possível carregar esse perfil.");
      }
    }

    carregarSummoner();

    return () => {
      ativo = false;
    };
  }, [gameName, tagLine]);

  return (
    <div className="min-h-screen w-full bg-base">
      <Header />

      <ProfileBanner
        gameName={gameName}
        tagLine={tagLine}
        profileIconId={summoner?.profileIconId}
        level={summoner?.summonerLevel}
        ladderRegion={data.ladderRegion}
        ladderPosition={data.ladderPosition}
        ladderScore={data.ladderScore}
        updatedAgo={data.updatedAgo}
      />

      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-6 px-6 py-8">
        <div className="w-full md:w-72 flex-shrink-0 flex flex-col gap-6">
          <RankSummaryCard {...data.rank} />
          <MostPlayedChampionsCard champions={data.mostPlayedChampions} />
          <VsEloCard {...data.vsElo} />
        </div>

        <MatchHistory summary={data.matchSummary} matches={data.matches} />
      </div>
    </div>
  );
}

export default Profile;