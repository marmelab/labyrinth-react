import express from 'express';
import {
    getIndex,
    postCreateGame,
    getGame,
    postRotateRemainingPathCard,
    postInsertRemainingPathCardAt,
} from '../controllers/gameController';

const router = express.Router();

router.get('/', getIndex);

router.post('/createGame', postCreateGame);

router.get('/game/:id', getGame);

router.post('/rotateRemainingPathCard', postRotateRemainingPathCard);

router.post('/insertRemainingPathCardAt', postInsertRemainingPathCardAt);

export default router;
