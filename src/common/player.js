import { produce } from 'immer';

import { convertBoundaries } from './board';

export const createPlayer = (color, x, y, targetCards) =>
    Object.freeze({
        color,
        x,
        y,
        targetCards,
    });

export const addTargetCardToPlay = (player, card) =>
    produce(player, draft => {
        draft.targetCards = player.targetCards.concat(card);
    });

export const removeTargetCardToPlay = player =>
    produce(player, draft => {
        draft.targetCards.pop();
    });

export const movePlayerTo = (player, toX, toY) =>
    produce(player, draft => {
        draft.x = toX;
        draft.y = toY;
    });

export const moveAPlayerInPosition = ({ players, fromX, fromY, toX, toY }) =>
    players.map(player => (player.x === fromX && player.y === fromY ? movePlayerTo(player, toX, toY) : player));

export const putPlayersBackOnBoard = game =>
    produce(game, draft => {
        draft.players = game.players.map(player =>
            movePlayerTo(player, convertBoundaries(player.x), convertBoundaries(player.y))
        );
    });

export const getNumberOfRemainingTargetCard = player => (player.targetCards || []).length;

export const getCurrentTargetCard = player =>
    player.targetCards.length ? player.targetCards[player.targetCards.length - 1] : null;

export const isCurrentTargetReached = (player, board) =>
    board[player.y][player.x].target === getCurrentTargetCard(player).target;
