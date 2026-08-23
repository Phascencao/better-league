import express from "express";
import { getAccount } from "../controllers/account.controller.js";

const router = express.Router();

router.get("/:gameName/:tagLine", getAccount); //API que o frontend chama para buscar o summoner

export default router;
