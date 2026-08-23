import { getSummonerProfile } from "../services/riot.service.js";

export async function getAccount(req, res, next) {
  const { gameName, tagLine } = req.params;

  try {
    const summoner = await getSummonerProfile(gameName, tagLine); //API que chama a Riot para buscar o summoner getAccountByRiotId()
    res.json(summoner);
    console.log(summoner); //retorna o summoner para o frontend
  } catch (err) {
    next(err); //passa o erro para o middleware de erro, que vai tratar o erro e enviar a resposta para o frontend
  }
}
