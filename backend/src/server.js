import express from "express";
import cors from "cors";
import { getAccountByRiotId } from "./services/riot.service.js";

//Basicamente a API entre frontend e backend

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.get(
  "/riot/account/:gameName/:tagLine", //API que o frontend chama para buscar o summoner
  async (req, res) => {
    const { gameName, tagLine } = req.params;

    try {
      const account = await getAccountByRiotId(gameName, tagLine); //API que chama a Riot para buscar o summoner getAccountByRiotId()
      res.json(account);
    } catch (err) {
      if (err.status) {
        return res.status(err.status).json({ message: err.message }); //se o erro tiver status, retorna o status e a mensagem do erro
      }

      console.error(err);
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  },
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
