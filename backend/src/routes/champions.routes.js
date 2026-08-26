import { Router } from 'express';
import { getTrendingChampions } from '../controllers/champions.controller.js';

const router = Router();

router.get('/trending', getTrendingChampions);

export default router;