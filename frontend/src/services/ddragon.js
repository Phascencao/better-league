// Data Dragon — CDN público de assets da Riot (ícones, campeões, itens).
// Não usa RIOT_API_KEY e não conta no rate limit, por isso é chamado direto
// do front sem passar pelo nosso backend.

// ---------------------------------------------------------------------------
// PALIATIVO: versão chumbada.
// A versão certa vem de https://ddragon.leagueoflegends.com/api/versions.json
// (índice 0 = mais recente). Isso vai migrar pro backend, com cache em memória,
// pra não fazer um round-trip a cada montagem de componente.
// Enquanto isso: ao trocar de patch, atualize a linha abaixo.
//
// Por que não pode ficar chumbado pra sempre: a cada patch a Riot adiciona
// ícones novos, e um profileIconId recém-lançado responde 403 numa versão
// antiga da URL. O contrário funciona (ícone antigo em versão nova).
// ---------------------------------------------------------------------------
export const DDRAGON_VERSION = "16.17.1";

const CDN = "https://ddragon.leagueoflegends.com/cdn";

/**
 * Monta a URL do ícone de perfil.
 * Retorna null quando não há id, pra quem chama cair no placeholder.
 */
export function getProfileIconUrl(profileIconId) {
  if (profileIconId === null || profileIconId === undefined) return null;

  return `${CDN}/${DDRAGON_VERSION}/img/profileicon/${profileIconId}.png`;
}
