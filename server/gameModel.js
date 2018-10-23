const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Game = new Schema(
    {
        board: [[]],
        players: [],
        scores: [Number],
        remainingPathCard: Object,
        currentIndexOfPathCardInsertionPosition: Number,
        currentPlayerIndex: Number,
        state: Number,
        reachablePositions: [[]],
    },
    {
        collection: 'games',
    }
);

module.exports = mongoose.model('Game', Game);
