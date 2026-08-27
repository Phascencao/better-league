const API_URL = "http://localhost:3333";

export async function getTrendingChampions() {
    const response = await fetch(
        `${API_URL}/api/champions/trending`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar campeões em alta");
    }

    return response.json();
}