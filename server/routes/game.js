import express from 'express';
import {
    getIndex,
    postCreateGame,
    getGame,
    postRotateRemainingPathCard,
    postInsertRemainingPathCardAt,
    postMoveCurrentPlayerTo,
} from '../controllers/gameController';

const router = express.Router();

router.get('/', getIndex);

router.post('/createGame', postCreateGame);

router.get('/game/:id', getGame);

router.post('/rotateRemainingPathCard', postRotateRemainingPathCard);

router.post('/insertRemainingPathCardAt', postInsertRemainingPathCardAt);

router.post('/moveCurrentPlayerTo', postMoveCurrentPlayerTo);

export default router;
