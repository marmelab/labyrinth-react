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
    GameModel.findById(req.params.id, function(err, game) {
        if (err) {
            res.status(400).send('unable to get the game');
            console.log(err);
        } else {
            res.status(200).json(game);
        }
    });
};

export const postRotateRemainingPathCard = (req, res) => {
    const id = req.body;
    console.log('server rotateRemainingPathCard id=', id);
    GameModel.findById(id, function(err, game) {
        if (err) {
            res.status(400).send('unable to find by id');
            console.log(err);
        } else {
            let newGame = rotateRemainingPathCard(game, 1);
            newGame = toInsertState(newGame);
            let gameModel = new GameModel(newGame);

            gameModel
                .save()
                .then(game => {
                    res.status(200).json(game);
                })
                .catch(err => {
                    res.status(400).send('unable to save to database');
                    console.log(err);
                });
        }
    });
};
