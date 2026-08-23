import { env } from "../config/env.js";

const REGION = `https://${env.riotRegion}.api.riotgames.com`;
const PLATAFORM = `https://${env.riotPlataform}.api.riotgames.com`;

function httpError(message, status) {
  //adiciona o objeto status para o erro, para que o server.js possa retornar o status correto
  const err = new Error(message);
  err.status = status;
  return err;
}

//monta o disparo para a API DA RIOT
async function riotFetch(base, path) {
  if (!env.riotApiKey) {
    //verifica se a API key está configurada
    throw httpError("RIOT_API_KEY não configurada no backend/.env", 500);
  }

  console.log(
    `api key <<<<<<<<< ${env.riotApiKey} <<<<<<<<<<<< ${base}${path}`,
  ); //loga o status da requisição para a Riot no console do backend

  //faz a requisição para a Riot com o header X-Riot-Token e um timeout de 8 segundos
  const res = await fetch(`${base}${path}`, {
    headers: { "X-Riot-Token": env.riotApiKey },
    signal: AbortSignal.timeout(8000),
  });

  //definindo erros operacionais (quase um dicionário) para o backend, para que o frontend possa tratar os erros corretamente
  if (!res.ok) {
    if (res.status === 404) throw httpError("Invocador não encontrado.", 404);
    if (res.status === 401 || res.status === 403) {
      throw httpError("Chave da Riot inválida ou expirada.", 502);
    }
    if (res.status === 429) {
      throw httpError("Muitas requisições. Tente em instantes.", 429);
    }
    throw httpError("Erro ao consultar a Riot.", 502);
  }

  return res.json(); //retorna o json da resposta da Riot (erro caso nn seja ok)
}

export function getAccountByRiotId(gameName, tagLine) {
  return riotFetch(
    REGION,
    `/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
  );
}

export function getAccountByPuuid(puuid) {
  return riotFetch(
    PLATAFORM,
    `/lol/summoner/v4/summoners/by-puuid/${encodeURIComponent(puuid)}`,
  );
}

export async function getSummonerProfile(gameName, tagLine) {
  console.log("entrou no getSummonerProfile");
  const account = await getAccountByRiotId(gameName, tagLine);
  console.log("peguei o account"); //retorna o account para o frontend
  const summoner = await getAccountByPuuid(account.puuid);
  console.log(summoner); //retorna o summoner para o frontend
  return summoner;
}
