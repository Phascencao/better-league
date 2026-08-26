import { getChallengerPlayers } from "./riot.service.js";

export async function getTrendingChampionsService() {
    const data = await getChallengerPlayers();

    console.log("Challenger recebido:", data);

    return data;
}