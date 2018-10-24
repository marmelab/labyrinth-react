import { createGame, rotateRemainingPathCard, toInsertState } from '../../src/common/game';
import GameModel from '../database/gameModel';

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
            console.log(err);
        });
};

export const getGame = (req, res) => {
    console.log('server getGame id=', req.params.id);
    GameModel.findById(req.params.id, function(err, gameDocument) {
        if (err) {
            res.status(400).send('unable to get the game');
            console.log(err);
        } else {
            res.status(200).json(gameDocument);
        }
    });
};

export const postRotateRemainingPathCard = (req, res) => {
    const req_id = req.body.id;
    GameModel.findById(req_id, function(err, gameDocument) {
        if (err) {
            res.status(400).send('unable to get the game by id');
            console.log(err);
            return;
        }

        let newGame = rotateRemainingPathCard(gameDocument.toObject(), 1);
        newGame = toInsertState(newGame);
        gameDocument.set(newGame);
        gameDocument
            .save()
            .then(game => {
                res.status(200).json(game);
            })
            .catch(err => {
                res.status(400).send('unable to save to database');
                console.log(err);
            });
    });
};
