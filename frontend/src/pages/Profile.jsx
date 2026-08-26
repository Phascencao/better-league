import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Header from "../components/Header";
import ProfileIcon from "../components/ProfileIcon";
import { getSummonerByRiotId } from "../services/summoner";

// Dados falsos simulando o retorno de Account-V1 + Summoner-V4 + League-V4 + Match-V5 (agregado)
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

const queueTabs = ["Ranqueada solo", "Flex", "Normal", "ARAM"];

function ChampionPlaceholder({ className }) {
  return (
    <div
      className={className}
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, #E8DCC0, #E8DCC0 4px, #F5EEDA 4px, #F5EEDA 8px)",
      }}
    />
  );
}

function MatchCard({ match }) {
  const isVictory = match.result === "victory";
  const resultLabel = isVictory ? "VITÓRIA" : "DERROTA";
  const accentColor = isVictory ? "#2F7D5C" : "#B03A2E";

  return (
    <div
      className="flex items-center justify-between bg-[#FBF3E1] border-l-4 rounded-lg px-5 py-4"
      style={{ borderLeftColor: accentColor }}
    >
      <div className="flex items-center gap-5">
        <div className="w-20">
          <p
            className="text-xs font-bold uppercase tracking-wide"
            style={{ color: accentColor }}
          >
            {resultLabel}
          </p>
          <p className="text-[10px] text-[#8A6A1B] uppercase tracking-wide mt-0.5">
            {match.queueType}
          </p>
          <p className="text-[10px] text-[#8A6A1B] mt-1">
            {match.timeAgo} · {match.duration}
          </p>
        </div>

        <ChampionPlaceholder className="w-11 h-11 rounded-md flex-shrink-0" />

        <div>
          <p className="text-[#17223A] text-lg font-bold leading-none">
            {match.kills} / {match.deaths} / {match.assists}
          </p>
          <p className="text-[11px] text-[#8A6A1B] mt-1">
            KDA {match.kdaRatio.toFixed(1)} · {match.csPerMin.toFixed(1)} CS/min
            · P/Kill {match.killParticipation}%
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-sm ${
                i < match.itemsFilled
                  ? "bg-[#E8DCC0] border border-[#C9A961]/50"
                  : "border border-dashed border-[#C9A961]/40"
              }`}
            />
          ))}
        </div>

        <span
          className="text-sm font-bold w-16 text-right"
          style={{ color: match.pdlChange ? accentColor : "#8A6A1B" }}
        >
          {match.pdlChange || "—"}
        </span>
      </div>
    </div>
  );
}

function Profile() {
  const { gameName, tagLine } = useParams();
  const [summoner, setSummoner] = useState(null);

  // Por enquanto só ícone e nível vêm da API de verdade. O resto da tela
  // (elo, campeões, partidas) segue nos dados fake até as outras rotas
  // do backend existirem.
  const data = fakeProfileData;

  useEffect(() => {
    // StrictMode monta duas vezes em dev: a flag evita setState em componente
    // já desmontado quando a resposta chega fora de ordem.
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

      {/* Cabeçalho do perfil */}
      <div className="relative overflow-hidden bg-[#F5EEDA] border-b border-[#C9A961]/30">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, rgba(160, 130, 60, 0.12) 0px, rgba(160, 130, 60, 0.12) 2px, transparent 2px, transparent 12px)",
            WebkitMaskImage:
              "linear-gradient(to left, black 0%, transparent 100%)",
            maskImage: "linear-gradient(to left, black 0%, transparent 100%)",
          }}
        />

        <div className="relative z-10 w-full px-10 py-8 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <ProfileIcon
              profileIconId={summoner?.profileIconId}
              level={summoner?.summonerLevel}
            />

            <div>
              <div className="flex items-baseline gap-1">
                <h1 className="font-serif text-[#17223A] text-2xl font-bold">
                  {gameName}
                </h1>
                <span className="text-[#8A6A1B] text-base font-semibold">
                  #{tagLine}
                </span>
              </div>
              <p className="text-[#8A6A1B] text-xs mt-1">
                Ladder {data.ladderRegion} #{data.ladderPosition}{" "}
                {data.ladderScore} | atualizado há {data.updatedAgo}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="text-[#8A6A1B] text-sm font-semibold border border-[#C9A961]/60 rounded-md px-4 py-2 hover:bg-[#F1E3BB] transition-colors">
              Histórico
            </button>
            <button className="bg-[#C9A961] text-[#17223A] text-sm font-bold rounded-md px-4 py-2 hover:opacity-90 transition-opacity">
              Atualizar
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="w-full flex flex-col md:flex-row gap-6 px-10 py-8">
        {/* Coluna esquerda */}
        <div className="w-full md:w-[340px] flex-shrink-0 flex flex-col gap-6">
          {/* Elo atual */}
          <div className="bg-[#FBF3E1] border border-[#C9A961]/50 rounded-xl px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A6A1B] mb-3">
              {data.rank.queueLabel}
            </p>

            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 rounded-full flex-shrink-0"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #E8C97A, #B8860B)",
                }}
              />
              <div>
                <p className="font-serif text-[#17223A] text-lg font-bold leading-tight">
                  {data.rank.tier}
                </p>
                <p className="text-[#8A6A1B] text-xs font-semibold">
                  {data.rank.lp} PdL
                </p>
              </div>
            </div>

            <div className="w-full h-2 bg-[#E8DCC0] rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-[#C9A961]"
                style={{ width: `${data.rank.winRate}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-[#8A6A1B]">
              <span>
                {data.rank.wins}V · {data.rank.losses}D
              </span>
              <span>{data.rank.winRate.toFixed(1)}% vitórias</span>
            </div>
          </div>

          {/* Campeões mais jogados */}
          <div className="bg-[#FBF3E1] border border-[#C9A961]/50 rounded-xl px-5 py-4">
            <h2 className="text-[#17223A] text-sm font-bold uppercase tracking-wide mb-3">
              Campeões mais jogados
            </h2>

            {data.mostPlayedChampions.map((champion) => (
              <div
                key={champion.name}
                className="flex items-center justify-between py-2.5 border-b border-[#E8DCC0] last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <ChampionPlaceholder className="w-9 h-9 rounded-md flex-shrink-0" />
                  <div>
                    <p className="text-[#17223A] text-sm font-bold leading-tight">
                      {champion.name}
                    </p>
                    <p className="text-[10px] text-[#8A6A1B]">
                      {champion.games} partidas · {champion.kda.toFixed(1)} KDA
                    </p>
                  </div>
                </div>
                <span className="text-[#17223A] text-sm font-bold">
                  {champion.winRate}%
                </span>
              </div>
            ))}
          </div>

          {/* Contra o elo */}
          <div className="bg-[#FBF3E1] border border-[#C9A961]/50 rounded-xl px-5 py-4">
            <h2 className="text-[#17223A] text-sm font-bold uppercase tracking-wide">
              Contra o elo
            </h2>
            <p className="text-[10px] text-[#8A6A1B] mb-3">
              {data.vsElo.eloLabel}
            </p>

            {data.vsElo.stats.map((stat) => (
              <div key={stat.label} className="mb-3 last:mb-0">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#8A6A1B]">{stat.label}</span>
                  <span className="text-[#17223A] font-bold">{stat.value}</span>
                </div>
                <div className="w-full h-1.5 bg-[#E8DCC0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C9A961]"
                    style={{
                      width: `${Math.min((stat.value / stat.max) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna direita */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex gap-2">
              {queueTabs.map((tab, index) => (
                <button
                  key={tab}
                  className={`text-xs font-bold uppercase tracking-wide rounded-md px-4 py-2 border transition-colors ${
                    index === 0
                      ? "bg-[#C9A961] text-[#17223A] border-[#C9A961]"
                      : "bg-[#FBF3E1] text-[#8A6A1B] border-[#C9A961]/40"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <p className="text-[11px] text-[#8A6A1B]">
              ÚLTIMAS {data.matchSummary.totalGames} · {data.matchSummary.wins}V{" "}
              {data.matchSummary.losses}D · {data.matchSummary.winRate}%
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {data.matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>

          <button className="w-full text-[#8A6A1B] text-sm font-semibold border border-[#C9A961]/50 rounded-lg py-3 hover:bg-[#F1E3BB] transition-colors">
            Carregar mais 10 partidas
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
