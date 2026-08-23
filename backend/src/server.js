import express from "express";
import cors from "cors";
import { getAccountByRiotId } from "./services/riot.service.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.get(
  "/riot/account/v1/accounts/by-riot-id/:gameName/:tagLine",
  async (req, res) => {
    const { gameName, tagLine } = req.params;

    try {
      const account = await getAccountByRiotId(gameName, tagLine);
      res.json(account);
    } catch (err) {
      if (err.status) {
        return res.status(err.status).json({ message: err.message });
      }

      console.error(err);
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  },
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
