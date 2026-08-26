import axios from "axios";

const API_URL = "http://localhost:3333";

export async function getSummonerByRiotId(gameName, tagLine) {
  const { data } = await axios.get(
    `${API_URL}/riot/account/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
  );

  return data;
}

export async function searchSummoner(riotId) {
  const [name, tag] = riotId.split("#");

  return getSummonerByRiotId(name, tag);
}
