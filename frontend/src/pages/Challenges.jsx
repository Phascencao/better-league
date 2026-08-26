import Header from "../components/Header";
import ChallengeCard from "../components/ChallengeCard";

// Dados falsos simulando o que seria calculado a partir do histórico
// de partidas do jogador (via Match-V5), agrupado por categoria.
const fakeChallenges = {
  Combate: [
    {
      id: "duels",
      title: "Duelos",
      subtitle: "Melhorar combate",
      objectives: [
        "Vença 60% ou mais dos duelos 1x1.",
        "Participe de pelo menos 8 duelos por partida.",
      ],
      reward: "Combate ↑",
    },
    {
      id: "picks",
      title: "Picks",
      subtitle: "Melhorar combate",
      objectives: [
        "Consiga pelo menos 3 picks isolados por partida.",
        "Mantenha KDA acima de 3.0 em picks.",
      ],
      reward: "Combate ↑",
    },
    {
      id: "stat-contribution",
      title: "Contribuição",
      subtitle: "Melhorar combate",
      objectives: [
        "Participe de 60% ou mais do dano da equipe.",
        "Termine entre os 2 melhores em dano do time.",
      ],
      reward: "Combate ↑",
    },
    {
      id: "teamfights",
      title: "Lutas em grupo",
      subtitle: "Melhorar combate",
      objectives: [
        "Participe de 70% ou mais das lutas em grupo.",
        "Sobreviva a pelo menos 80% das lutas que entrar.",
      ],
      reward: "Combate ↑",
    },
  ],
  Farm: [
    {
      id: "cs-efficiency",
      title: "Eficiência de CS",
      subtitle: "Melhorar farm",
      objectives: [
        "Perca no máximo 10 CS por non-recall.",
        "Mantenha 90% de eficiência de farm.",
      ],
      reward: "Farm ↑",
    },
    {
      id: "early",
      title: "Início de jogo",
      subtitle: "Melhorar farm",
      objectives: [
        "Alcance 70+ CS aos 10 minutos.",
        "Não perca XP por ausência da rota.",
      ],
      reward: "Farm ↑",
    },
    {
      id: "general-income",
      title: "Renda geral",
      subtitle: "Melhorar farm",
      objectives: [
        "Alcance 380 ou mais de GPM.",
        "Consiga pelo menos 7 CS por minuto.",
      ],
      reward: "Farm ↑",
    },
    {
      id: "late",
      title: "Final de jogo",
      subtitle: "Melhorar farm",
      objectives: [
        "Mantenha farm consistente após os 25 min.",
        "Não perca creeps por estar fora de posição.",
      ],
      reward: "Farm ↑",
    },
    {
      id: "mid",
      title: "Meio de jogo",
      subtitle: "Melhorar farm",
      objectives: [
        "Sustente 8+ CS/min entre 10 e 25 min.",
        "Aproveite resets pra completar ondas.",
      ],
      reward: "Farm ↑",
    },
  ],
  Visão: [
    {
      id: "placement",
      title: "Posicionamento",
      subtitle: "Melhorar visão",
      objectives: [
        "Coloque pelo menos 1.5 wards por minuto.",
        "Cubra objetivos-chave antes de spawnarem.",
      ],
      reward: "Visão ↑",
    },
    {
      id: "vision-denial",
      title: "Negação de visão",
      subtitle: "Melhorar visão",
      objectives: [
        "Destrua 3+ wards inimigas por partida.",
        "Limpe a visão antes de objetivos.",
      ],
      reward: "Visão ↑",
    },
    {
      id: "vision-impact",
      title: "Impacto de visão",
      subtitle: "Melhorar visão",
      objectives: [
        "Mantenha pontuação de visão acima da média do elo.",
        "Contribua com visão mesmo fora da rota de suporte.",
      ],
      reward: "Visão ↑",
    },
  ],
};

function Challenges() {
  function handleActivate(challengeId) {
    // TODO: quando o back-end existir, chamar a API pra marcar
    // esse desafio como ativo pro jogador logado.
    console.log("Ativar desafio:", challengeId);
  }

  return (
    <div className="min-h-screen w-full bg-base">
      <Header />

      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <h1 className="font-display font-semibold text-4xl sm:text-display text-primary mb-6">
          Lista de desafios
        </h1>

        {Object.entries(fakeChallenges).map(([category, challenges]) => (
          <div key={category} className="mb-16">
            <h2 className="text-[#8A6A1B] text-xs font-bold uppercase tracking-widest mb-4">
              {category}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {challenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  title={challenge.title}
                  subtitle={challenge.subtitle}
                  objectives={challenge.objectives}
                  reward={challenge.reward}
                  onActivate={() => handleActivate(challenge.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Challenges;