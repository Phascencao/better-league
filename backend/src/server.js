import express from "express";
import cors from "cors";
import accountRoute from "./routes/account.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { env } from "./config/env.js";

//Basicamente onde orquestra as rotas e middlewares do backend. Aqui é onde o servidor é iniciado e as rotas são registradas.

const app = express();

const PORT = env.port || 3000;

app.use(cors());

//verifica a saude do servidor, para o frontend saber se o backend está funcionando
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/riot/account", accountRoute); //rota para buscar o summoner na Riot

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
