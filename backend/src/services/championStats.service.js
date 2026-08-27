import {
    getChallengerPlayers,
    getMatchIdsByPuuid,
    getMatchById
} from "./riot.service.js";

let trendingCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos em milissegundos


export async function getTrendingChampionsService() {

    if(trendingCache && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
        return trendingCache;
    }

    const challenger = await getChallengerPlayers();

    const players = challenger.entries.slice(0, 20);

    const champions = {};

    for (const player of players) {
        console.log("Analisando jogador:", player.puuid);

        const matchIds = await getMatchIdsByPuuid(player.puuid, 3);

        for (const matchId of matchIds) {
            const match = await getMatchById(matchId);

            const participant = match.info.participants.find(
                participant => participant.puuid === player.puuid
            );

            if (!participant) {
                continue;
            }

            const championName = participant.championName;

            if (!champions[championName]) {
                champions[championName] = {
                    games: 0,
                    wins: 0,
                    losses: 0
                };
            }

            champions[championName].games++;

            if (participant.win) {
                champions[championName].wins++;
            } else {
                champions[championName].losses++;
            }
        }
    }

    const totalGames = Object.values(champions).reduce((total, champion) => total + champion.games, 0);



    const ranking = Object.entries(champions)
        .map(([champion, stats]) => ({
            champion,
            ...stats,
            winRate: Number(((stats.wins / stats.games) * 100).toFixed(2)),
            pickRate: Number(((stats.games / totalGames) * 100).toFixed(2))
        }))
        .sort((a, b) => b.games - a.games)
        .slice(0, 5);

        trendingCache = ranking;
        cacheTimestamp = Date.now();

        return ranking; 
}