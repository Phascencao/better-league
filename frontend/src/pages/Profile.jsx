import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ProfileBanner from "../components/ProfileBanner";
import RankSummaryCard from "../components/RankSummaryCard";
import MostPlayedChampionsCard from "../components/MostPlayedChampionsCard";
import VsEloCard from "../components/VsEloCard";
import MatchHistory from "../components/MatchHistory";

const fakeProfileData = {
  gameName: "Vharos",
  tagLine: "BR1",
  level: 412,
  ladderRegion: "BR1",
  ladderPosition: 4,
  ladderScore: 128,
  updatedAgo: "6 min",
  rank: {
    queueLabel: "RANQUEADA SOLO · S15",
    tier: "Platina II",
    lp: 64,
    wins: 128,
    losses: 111,
    winRate: 53.6,
  },
  mostPlayedChampions: [
    { name: "Sylren", games: 42, kda: 7.9, winRate: 57 },
    { name: "Kaelith", games: 31, kda: 4.2, winRate: 50 },
    { name: "Ordo", games: 18, kda: 3.1, winRate: 44 },
  ],
  vsElo: {
    eloLabel: "média de Platina = 100",
    stats: [
      { label: "Ouro/min", value: 114, max: 150 },
      { label: "Dano/min", value: 103, max: 150 },
      { label: "Visão/min", value: 81, max: 150 },
    ],
  },
  matchSummary: {
    totalGames: 20,
    wins: 12,
    losses: 8,
    winRate: 53.6,
  },
  matches: [
    {
      id: 1,
      queueType: "RANQ. SOLO",
      result: "victory",
      timeAgo: "há 2 h",
      duration: "31:04",
      kills: 12,
      deaths: 3,
      assists: 9,
      kdaRatio: 7.0,
      csPerMin: 8.4,
      killParticipation: 61,
      itemsFilled: 5,
      pdlChange: "+22 PdL",
    },
    {
      id: 2,
      queueType: "RANQ. SOLO",
      result: "defeat",
      timeAgo: "há 3 h",
      duration: "24:52",
      kills: 4,
      deaths: 8,
      assists: 5,
      kdaRatio: 1.1,
      csPerMin: 6.2,
      killParticipation: 44,
      itemsFilled: 4,
      pdlChange: "-18 PdL",
    },
    {
      id: 3,
      queueType: "RANQ. SOLO",
      result: "victory",
      timeAgo: "ontem",
      duration: "36:18",
      kills: 8,
      deaths: 5,
      assists: 16,
      kdaRatio: 4.8,
      csPerMin: 7.1,
      killParticipation: 58,
      itemsFilled: 5,
      pdlChange: "+19 PdL",
    },
    {
      id: 4,
      queueType: "FLEX",
      result: "defeat",
      timeAgo: "ontem",
      duration: "28:40",
      kills: 6,
      deaths: 7,
      assists: 3,
      kdaRatio: 1.3,
      csPerMin: 7.7,
      killParticipation: 39,
      itemsFilled: 4,
      pdlChange: null,
    },
  ],
};

function Profile() {
  const { gameName, tagLine } = useParams();

  // No futuro isso vira um fetch usando gameName/tagLine da URL.
  const data = fakeProfileData;

  return (
    <div className="min-h-screen w-full bg-base">
      <Header />

      <ProfileBanner
        gameName={data.gameName}
        tagLine={data.tagLine}
        level={data.level}
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