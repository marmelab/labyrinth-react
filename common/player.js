const { produce } = require('immer');

const { convertBoundaries } = require('./board');

const createPlayer = (color, x, y, targetCards) =>
    Object.freeze({
        color,
        x,
        y,
        targetCards,
    });

const addTargetCardToPlay = (player, card) =>
    produce(player, draft => {
        draft.targetCards = player.targetCards.concat(card);
    });

const removeTargetCardToPlay = player =>
    produce(player, draft => {
        draft.targetCards.pop();
    });

const movePlayerTo = (player, toX, toY) =>
    produce(player, draft => {
        draft.x = toX;
        draft.y = toY;
    });

const moveAllPlayers = ({ players, fromX, fromY, toX, toY }) =>
    players.map(player => (player.x === fromX && player.y === fromY ? movePlayerTo(player, toX, toY) : player));

const putPlayersBackOnBoard = game =>
    produce(game, draft => {
        draft.players = game.players.map(player =>
            movePlayerTo(player, convertBoundaries(player.x), convertBoundaries(player.y))
        );
    });

const getNumberOfRemainingTargetCard = player => (player.targetCards || []).length;

const getCurrentTargetCard = player =>
    player.targetCards.length ? player.targetCards[player.targetCards.length - 1] : null;

const isCurrentTargetReached = (player, board) =>
    board[player.x][player.y].target === getCurrentTargetCard(player).target;

module.exports = {
    createPlayer,
    addTargetCardToPlay,
    removeTargetCardToPlay,
    getCurrentTargetCard,
    getNumberOfRemainingTargetCard,
    isCurrentTargetReached,
    movePlayerTo,
    moveAllPlayers,
    putPlayersBackOnBoard,
};
