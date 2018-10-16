const { produce } = require('immer');
const { movePathCardTo } = require('./pathCard');

const BOARD_SIZE = 7;

const PATH_CARD_INSERTION_POSITION = Object.freeze([
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

const createEmptyBoard = () =>
    produce({}, () => Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => 0)));

const flattenBoard = board => board.reduce((acc, val) => acc.concat(val), []);

const putCardOnBoard = (mutableBoard, toX, toY, card) => {
    mutableBoard[toX][toY] = movePathCardTo(card, toX, toY);
};

const getIndexPosition = ({ x, y }) => PATH_CARD_INSERTION_POSITION.findIndex(pair => pair.x === x && pair.y === y);

const isInsertionPosition = ({ x, y }) =>
    PATH_CARD_INSERTION_POSITION.some(position => position.x === x && position.y === y);

const convertBoundaries = x => (x < 0 ? BOARD_SIZE - 1 : x >= BOARD_SIZE ? 0 : x);

const searchCardInBoard = (board, cmpFunction) => {
    const found = flattenBoard(board).find(cmpFunction);
    return !!found && { x: found.x, y: found.y };
};

const searchTargetCardInBoard = (board, targetCard) =>
    searchCardInBoard(board, cell => cell.target === targetCard.target);

const searchPathCardInBoard = (board, pathCard) => searchCardInBoard(board, cell => cell.id === pathCard.id);

module.exports = {
    PATH_CARD_INSERTION_POSITION,
    BOARD_SIZE,
    createEmptyBoard,
    flattenBoard,
    putCardOnBoard,
    getIndexPosition,
    isInsertionPosition,
    convertBoundaries,
    searchTargetCardInBoard,
    searchPathCardInBoard,
};
