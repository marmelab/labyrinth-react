import { createGame } from '../src/common/game';

const express = require('express');
const app = express();

app.get('/', (req, res) => res.status(200).json({ msg: 'Welcome to Labyrinth API server' }));

app.get('/createGame', (req, res) => {
    const game = createGame();
    res.status(200).json(game);
});

module.exports = app;
