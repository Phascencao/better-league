import { useState } from "react";
import Header from "../components/Header";
import TierListSubmenu from "../components/TierListSubmenu";
import RoleFilterButtons from "../components/RoleFilterButtons";
import RoleTierListCard from "../components/RoleTierListCard";

// Dados falsos simulando o que viria de League-V4 + Match-V5 agregado.
const allChampions = [
  { name: "Darius", role: "TOP", tierNormal: "S", tierHighElo: "S" },
  { name: "Gwen", role: "TOP", tierNormal: "S", tierHighElo: "A" },
  { name: "Camille", role: "TOP", tierNormal: "S", tierHighElo: "S" },
  { name: "Shen", role: "TOP", tierNormal: "S", tierHighElo: "B" },
  { name: "Mordekaiser", role: "TOP", tierNormal: "A", tierHighElo: "S" },
  { name: "Garen", role: "TOP", tierNormal: "A", tierHighElo: "C" },
  { name: "Jax", role: "TOP", tierNormal: "A", tierHighElo: "A" },
  { name: "Malphite", role: "TOP", tierNormal: "B", tierHighElo: "B" },
  { name: "Nasus", role: "TOP", tierNormal: "B", tierHighElo: "C" },

  { name: "Lee Sin", role: "JG", tierNormal: "S", tierHighElo: "S" },
  { name: "Viego", role: "JG", tierNormal: "S", tierHighElo: "A" },
  { name: "Kindred", role: "JG", tierNormal: "A", tierHighElo: "S" },
  { name: "Graves", role: "JG", tierNormal: "A", tierHighElo: "B" },
  { name: "Sejuani", role: "JG", tierNormal: "B", tierHighElo: "A" },
  { name: "Warwick", role: "JG", tierNormal: "B", tierHighElo: "C" },

  { name: "Ahri", role: "MID", tierNormal: "S", tierHighElo: "A" },
  { name: "Yasuo", role: "MID", tierNormal: "S", tierHighElo: "B" },
  { name: "Azir", role: "MID", tierNormal: "A", tierHighElo: "S" },
  { name: "Zed", role: "MID", tierNormal: "A", tierHighElo: "A" },
  { name: "Annie", role: "MID", tierNormal: "B", tierHighElo: "B" },
  { name: "Lux", role: "MID", tierNormal: "B", tierHighElo: "C" },

  { name: "Jinx", role: "ADC", tierNormal: "S", tierHighElo: "S" },
  { name: "Kai'Sa", role: "ADC", tierNormal: "S", tierHighElo: "A" },
  { name: "Caitlyn", role: "ADC", tierNormal: "A", tierHighElo: "S" },
  { name: "Ezreal", role: "ADC", tierNormal: "A", tierHighElo: "B" },
  { name: "Jhin", role: "ADC", tierNormal: "B", tierHighElo: "A" },
  { name: "Ashe", role: "ADC", tierNormal: "C", tierHighElo: "C" },

  { name: "Thresh", role: "SUP", tierNormal: "S", tierHighElo: "S" },
  { name: "Janna", role: "SUP", tierNormal: "S", tierHighElo: "A" },
  { name: "Nautilus", role: "SUP", tierNormal: "A", tierHighElo: "S" },
  { name: "Lulu", role: "SUP", tierNormal: "A", tierHighElo: "B" },
  { name: "Leona", role: "SUP", tierNormal: "B", tierHighElo: "A" },
  { name: "Soraka", role: "SUP", tierNormal: "C", tierHighElo: "C" },
];

// Dados falsos da "escolha principal" de cada role (o campeão com maior
// winrate na posição, com runas/build/feitiços vindos de estatísticas
// agregadas de partidas — no futuro, dados reais do Match-V5).
const rolePicks = {
  TOP: {
    championName: "Camille",
    blurb:
      "Os ajustes deste patch trazem Camille de volta ao topo depois de uma passagem pela rota de suporte. Ela perdeu um pouco do all-in inicial, mas os cooldowns menores dão muito mais poder de troca em duelos prolongados.",
    runes: ["Conquistador", "Triunfo", "Lenda: Alacridade", "Último Suspiro"],
    summonerSpells: ["Fulgor", "Barreira"],
    buildItems: [
      "Lâmina do Rei Destronado",
      "Botas Ligeiras",
      "Machado do Carrasco",
      "Serpente Voraz",
      "Espinho de Maldição",
      "Capa Espectral",
    ],
  },
  JG: {
    championName: "Viego",
    blurb:
      "Viego continua sendo a escolha mais segura pra quem quer impacto imediato na selva. Seu passivo permite roubar picks e virar teamfights sozinho quando a equipe está atrás.",
    runes: ["Chuva de Lâminas", "Triunfo", "Lenda: Alacridade", "Último Suspiro"],
    summonerSpells: ["Fulgor", "Punição"],
    buildItems: [
      "Machado Negro",
      "Botas Ligeiras",
      "Lâmina do Duelista",
      "Espada Sombria de Vidro",
      "Guante Sanguinário",
      "Capa Espectral",
    ],
  },
  MID: {
    championName: "Ahri",
    blurb:
      "Ahri se mantém relevante graças ao charme confiável e à mobilidade alta, permitindo controlar o ritmo do jogo mesmo em compsição defensiva. Ótima opção pra quem prioriza segurança sem abrir mão de dano.",
    runes: ["Chama Arcana", "Fluxo Mágico", "Nuvem de Tempestade", "Caçador Absoluto"],
    summonerSpells: ["Fulgor", "Ignição"],
    buildItems: [
      "Chama de Luden",
      "Botas de Bruxaria",
      "Éter Sombrio",
      "Bastão do Vazio",
      "Chapéu da Chama Rewind",
      "Cetro de Zhonya",
    ],
  },
  ADC: {
    championName: "Jinx",
    blurb:
      "Jinx segue sendo o atirador com maior escalonamento tardio, transformando qualquer teamfight prolongada a favor do time. O ponto fraco é o início lento, então priorize farm seguro nos primeiros minutos.",
    runes: ["Chuva de Lâminas", "Triunfo", "Lenda: Alacridade", "Corte no Coração"],
    summonerSpells: ["Fulgor", "Barreira"],
    buildItems: [
      "Lâmina Infinita",
      "Botas de Berserker",
      "Chicote de Ira",
      "Machado do Carrasco",
      "Guardião Espectral",
      "Bala de Prata",
    ],
  },
  SUP: {
    championName: "Thresh",
    blurb:
      "Thresh continua imbatível em jogabilidade: sua corrente pode ganhar ou perder o jogo sozinha. Exige boa mira, mas recompensa muito quem domina o combo de engajamento.",
    runes: ["Arauto Sombrio", "Charge de Alma", "Chamado de Herege", "Corte no Coração"],
    summonerSpells: ["Fulgor", "Exaustão"],
    buildItems: [
      "Aegis do Anjo Caído",
      "Botas do Cavaleiro Sagrado",
      "Bastão do Purificador",
      "Capa de Duende",
      "Manto Redentor",
      "Broche de Coragem",
    ],
  },
};

const roleOrder = ["TOP", "JG", "MID", "ADC", "SUP"];

function TierList() {
  const [activeTab, setActiveTab] = useState("Tier list");
  const [activeRole, setActiveRole] = useState("ALL");

  const isHighElo = activeTab === "High Elo";
  const isImplementedTab =
    activeTab === "Tier list" || activeTab === "High Elo";

  const rolesToShow = activeRole === "ALL" ? roleOrder : [activeRole];

  return (
    <div className="min-h-screen w-full bg-base">
      <Header />

      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <h1 className="font-serif text-[#17223A] text-3xl font-bold mb-6">
          Tier list
        </h1>

        <TierListSubmenu activeTab={activeTab} onChange={setActiveTab} />

        {isImplementedTab ? (
          <>
            <div className="mb-8">
              <RoleFilterButtons
                activeRole={activeRole}
                onChange={setActiveRole}
              />
            </div>

            {rolesToShow.map((role) => {
              const championsForRole = allChampions
                .filter((c) => c.role === role)
                .map((c) => ({
                  name: c.name,
                  tier: isHighElo ? c.tierHighElo : c.tierNormal,
                }));

              return (
                <RoleTierListCard
                  key={role}
                  role={role}
                  champions={championsForRole}
                  pick={rolePicks[role]}
                />
              );
            })}
          </>
        ) : (
          <div className="bg-[#FBF3E1] border border-[#C9A961]/50 rounded-xl px-6 py-16 text-center text-[#8A6A1B]">
            Essa aba ainda não foi implementada.
          </div>
        )}
      </div>
    </div>
  );
}

export default TierList;