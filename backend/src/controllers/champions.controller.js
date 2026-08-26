import { getTrendingChampionsService } from "../services/championStats.service.js";

export async function getTrendingChampions(req, res) {
    try {
        const data = await getTrendingChampionsService();

        res.json(data);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message,
        })
    }
}