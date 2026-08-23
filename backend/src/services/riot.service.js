import { env } from "../config/env.js";

const BASE = `https://${env.riotRegion}.api.riotgames.com`;

function httpError(message, status) {
  //adiciona o status para o erro, para que o server.js possa retornar o status correto para o frontend
  const err = new Error(message);
  err.status = status;
  return err;
}

async function riotFetch(path) {
  if (!env.riotApiKey) {
    //verifica se a API key está configurada
    throw httpError("RIOT_API_KEY não configurada no backend/.env", 500);
  }

  //faz a requisição para a Riot com o header X-Riot-Token e um timeout de 8 segundos
  const res = await fetch(`${BASE}${path}`, {
    headers: { "X-Riot-Token": env.riotApiKey },
    signal: AbortSignal.timeout(8000),
  });

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

  return res.json();
}

export function getAccountByRiotId(gameName, tagLine) {
  return riotFetch(
    `/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
  );
}
