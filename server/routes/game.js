import express from 'express';
import { getIndex, postCreateGame, getGame, postRotateRemainingPathCard } from '../controllers/gameController';

const router = express.Router();

router.get('/', getIndex);

router.post('/createGame', postCreateGame);

router.get('/game/:id', getGame);

router.post('/rotateRemainingPathCard', postRotateRemainingPathCard);

export default router;
