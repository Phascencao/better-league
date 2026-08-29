import express from "express";
import cors from "cors";
import accountRoute from "./routes/account.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { env } from "./config/env.js";
import championsRoute from "./routes/champions.routes.js"; 
import { refreshTrendingChampions } from "./services/championStats.service.js";

//Basicamente onde orquestra as rotas e middlewares do backend. Aqui é onde o servidor é iniciado e as rotas são registradas.

const app = express();

app.use(express.json());


app.use(cors());



//verifica a saude do servidor, para o frontend saber se o backend está funcionando
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
// Rotas
app.use("/riot/account", accountRoute); //rota para buscar o summoner na Riot
app.use("/api/champions", championsRoute); //rota para buscar os campeões em alta

const PORT = env.port || 3000;

app.use(errorHandler);

const TRENDING_REFRESH_INTERVAL = 10 * 60 * 1000;

refreshTrendingChampions().catch((error) => {
  console.error("Erro ao atualizar campeões em alta:", error);
});

setInterval(() => {
    refreshTrendingChampions().catch((error) => {
        console.error(
            "Erro ao atualizar campeões em alta:",
            error
        );
    });
}, TRENDING_REFRESH_INTERVAL);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
