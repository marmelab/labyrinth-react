import { createGame, handleEvent } from '../../src/common/game';

import { EVENT } from '../../src/common/constants';

import GameModel from '../database/gameModel';

export const getIndex = (req, res) => res.status(200).json({ msg: 'Welcome to Labyrinth' });

export const getGame = (req, res) => {
    GameModel.findById(req.params.id, function(err, gameDocument) {
        if (err) {
            res.status(400).send('unable to get the game');
            return;
        }
        res.status(200).json(gameDocument);
    });
};

const saveGameDocumentAndRespond = (res, gameModel) => {
    gameModel
        .save()
        .then(game => {
            res.status(200).json(game);
        })
        .catch(err => {
            res.status(400).send('unable to save to database');
        });
};

export const postCreateGame = (req, res) => {
    const game = createGame();
    let gameDocument = new GameModel(game);
    saveGameDocumentAndRespond(res, gameDocument);
};

const genericPostAction = (gameId, res, event, args = {}) => {
    GameModel.findById(gameId, function(err, gameDocument) {
        if (err) {
            res.status(400).send('unable to get the game by id');
            return;
        }
        const context = Object.assign({ game: gameDocument.toObject() }, args);
        const newGame = handleEvent(event, context);
        gameDocument.set(newGame);
        saveGameDocumentAndRespond(res, gameDocument);
    });
};

export const postRotateRemainingPathCard = (req, res) => {
    const gameId = req.params && req.params.id ? req.params.id : req.body.id;
    genericPostAction(gameId, res, EVENT.ROTATE_REMAINING_PATHCARD);
};

export const postInsertRemainingPathCardAt = (req, res) => {
    const gameId = req.params && req.params.id ? req.params.id : req.body.id;
    const { x, y } = req.body;
    genericPostAction(gameId, res, EVENT.INSERT_REMAINING_PATHCARD_AT, { x, y });
};

export const postMoveCurrentPlayerTo = (req, res) => {
    const gameId = req.params && req.params.id ? req.params.id : req.body.id;
    const { x, y } = req.body;
    genericPostAction(gameId, res, EVENT.MOVE_PLAYER_TO, { x, y });
};
