import { createGame, rotateRemainingPathCard, toInsertState } from '../src/common/game';
import mongoose from 'mongoose';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongodb/games').then(
    () => console.log('Database is connected'),
    err => {
        console.log('Cannot connect to the database\n' + err);
    }
);

app.use(bodyParser.json());
app.use(cors());

const GameModel = require('./gameModel');

app.get('/', (req, res) => res.status(200).json({ msg: 'Welcome to Labyrinth API server' }));

app.post('/createGame', (req, res) => {
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
});

app.get('/getGame/:id', (req, res) => {
    GameModel.findById(req.params.id, function(err, game) {
        if (err) {
            console.log(err);
        } else {
            res.json(game);
        }
    });
});

app.post('/rotateRemainingPathCard', (req, res) => {
    const id = req.body;
    console.log('server rotateRemainingPathCard id=', id);
    GameModel.findById(id, function(err, game) {
        if (err) {
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
});

module.exports = app;
