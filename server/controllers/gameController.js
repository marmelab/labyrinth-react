import { createGame, handleEvent } from '../../src/common/game';

import { EVENT } from '../../src/common/constants';

import GameModel from '../database/gameModel';

export const getIndex = (req, res) => res.status(200).json({ msg: 'Welcome to Labyrinth' });

export const postCreateGame = (req, res) => {
    const game = createGame();
    let gameModel = new GameModel(game);
    gameModel
        .save()
        .then(game => {
            res.status(200).json(game);
        })
        .catch(err => {
            res.status(400).send('unable to save to database');
        });
};

export const getGame = (req, res) => {
    GameModel.findById(req.params.id, function(err, gameDocument) {
        if (err) {
            res.status(400).send('unable to get the game');
            return;
        }
        res.status(200).json(gameDocument);
    });
};

const genericPostAction = (req, res, event, args) => {
    const req_id = req.body.id;
    GameModel.findById(req_id, function(err, gameDocument) {
        if (err) {
            res.status(400).send('unable to get the game by id');
            return;
        }
        const context = Object.assign({ game: gameDocument.toObject() }, args);
        const newGame = handleEvent(event, context);
        gameDocument.set(newGame);
        gameDocument
            .save()
            .then(game => {
                res.status(200).json(game);
            })
            .catch(err => {
                res.status(400).send('unable to save to database');
            });
    });
};

export const postRotateRemainingPathCard = (req, res) => {
    genericPostAction(req, res, EVENT.ROTATE_REMAINING_PATHCARD, {});
};

export const postInsertRemainingPathCardAt = (req, res) => {
    genericPostAction(req, res, EVENT.INSERT_REMAINING_PATHCARD_AT, { x: req.body.x, y: req.body.y });
};
export const postMoveCurrentPlayerTo = (req, res) => {
    genericPostAction(req, res, EVENT.MOVE_PLAYER_TO, { x: req.body.x, y: req.body.y });
};
