import { produce } from 'immer';
import { movePathCardTo } from './pathCard';

export const BOARD_SIZE = 7;

export const PATH_CARD_INSERTION_POSITION = Object.freeze([
    { x: 1, y: -1 },
    { x: 3, y: -1 },
    { x: 5, y: -1 },
    { x: 7, y: 1 },
    { x: 7, y: 3 },
    { x: 7, y: 5 },
    { x: 5, y: 7 },
    { x: 3, y: 7 },
    { x: 1, y: 7 },
    { x: -1, y: 5 },
    { x: -1, y: 3 },
    { x: -1, y: 1 },
]);

export const createEmptyBoard = () => produce({}, () => Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(0)));

export const flattenBoard = board => board.reduce((acc, val) => acc.concat(val), []);

export const putCardOnBoard = (mutableBoard, toX, toY, card) => {
    mutableBoard[toX][toY] = movePathCardTo(card, toX, toY);
};

export const getIndexPosition = ({ x, y }) =>
    PATH_CARD_INSERTION_POSITION.findIndex(pair => pair.x === x && pair.y === y);

export const isInsertionPosition = ({ x, y }) =>
    PATH_CARD_INSERTION_POSITION.some(position => position.x === x && position.y === y);

export const convertBoundaries = x => (x < 0 ? BOARD_SIZE - 1 : x >= BOARD_SIZE ? 0 : x);

const searchCardInBoard = (board, cmpFunction) => {
    const found = flattenBoard(board).find(cmpFunction);
    return !!found && { x: found.x, y: found.y };
};

export const searchTargetCardInBoard = (board, targetCard) =>
    searchCardInBoard(board, cell => cell.target === targetCard.target);

const searchPathCardInBoard = (board, pathCard) => searchCardInBoard(board, cell => cell.id === pathCard.id);
