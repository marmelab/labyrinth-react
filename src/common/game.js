import { produce } from 'immer';

import { STATE, EVENT, ROTATE } from './constants';
import { initGame } from './gameFactory';
import { getExitDirections, Direction, rotateDirection, movePathCardTo, getNextCoordinatesForAMove } from './pathCard';

import {
    BOARD_SIZE,
    PATH_CARD_INSERTION_POSITION,
    isInsertionPosition,
    putCardOnBoard,
    getIndexPosition,
} from './board';

import {
    isCurrentTargetReached,
    removeTargetCardToPlay,
    movePlayerTo,
    moveAllPlayers,
    putPlayersBackOnBoard,
} from './player';

const NB_PLAYER = 2;
const NB_TARGET_CARD = 24;

export const createGame = () => {
    let { board, players, remainingPathCard } = initGame(NB_PLAYER, NB_TARGET_CARD);
    const currentIndexOfPathCardInsertionPosition = 0;
    const { x, y } = PATH_CARD_INSERTION_POSITION[currentIndexOfPathCardInsertionPosition];

    const game = Object.freeze({
        board: board,
        players: players,
        scores: Array.from({ length: players.length }, () => 0),
        remainingPathCard: movePathCardTo(remainingPathCard, x, y),
        currentIndexOfPathCardInsertionPosition: currentIndexOfPathCardInsertionPosition,
        currentPlayerIndex: 0,
        state: STATE.TO_INSERT,
        reachablePositions: Array.from({ length: players.length }, () => []),
    });
    return computeReachablePositionsForAllPlayers(game);
};

export const handleEvent = (event, context) => {
    const { game, x, y } = context;
    let newGame = game;

    if (isGameInMoveState(game)) {
        if (event === EVENT.MOVE_PLAYER_TO) {
            newGame = moveCurrentPlayerTo(game, x, y);
            newGame = increasePlayerScoreIfOnTarget(newGame);
            newGame = computeReachablePositionsForAllPlayers(newGame);
            newGame = toNextPlayerTurn(newGame);
            newGame = putGameInInsertState(newGame);
        }
    } else if (isGameInInsertState(game)) {
        if (event === EVENT.INSERT_REMAINING_PATHCARD_AT) {
            newGame = insertRemainingPathCardAt(game, x, y);
            newGame = increasePlayerScoreIfOnTarget(newGame);
            newGame = computeReachablePositionsForAllPlayers(newGame);
            newGame = putGameInMoveState(newGame);
        } else if (event === EVENT.ROTATE_REMAINING_PATHCARD) {
            newGame = rotateRemainingPathCard(game);
            newGame = computeReachablePositionsForAllPlayers(newGame);
        }
    } else if (isGameInEndState(game)) {
        // game over
    }

    return newGame;
};

export const putGameInInsertState = game =>
    produce(game, draft => {
        draft.state = STATE.TO_INSERT;
    });

export const putGameInMoveState = game =>
    produce(game, draft => {
        draft.state = STATE.TO_MOVE;
    });

export const putGameInEndState = game =>
    produce(game, draft => {
        draft.state = STATE.END;
    });

export const isGameInInsertState = game => game.state === STATE.TO_INSERT;

export const isGameInMoveState = game => game.state === STATE.TO_MOVE;

export const isGameInEndState = game => game.state === STATE.END;

export const toNextPlayerTurn = game =>
    produce(game, draft => {
        draft.currentPlayerIndex = (draft.currentPlayerIndex + 1) % draft.players.length;
    });

const increasePlayerScoreIfOnTarget = game => {
    const { board, players, scores, currentPlayerIndex } = game;
    const player = players[currentPlayerIndex];
    const score = scores[currentPlayerIndex];
    const isTargetReached = isCurrentTargetReached(player, board);
    const newScore = isTargetReached ? score + 1 : score;
    const newPlayer = isTargetReached ? removeTargetCardToPlay(player) : player;
    return produce(game, draft => {
        draft.players[currentPlayerIndex] = newPlayer;
        draft.scores[currentPlayerIndex] = newScore;
    });
};

export const positionIsIn = ({ x, y }, positions) =>
    positions.findIndex(position => position.x === x && position.y === y) > -1;

const computeAllReachablePositionsFromXY = (board, x, y) => {
    const result = [];
    const todo = [{ x, y }];

    while (todo.length > 0) {
        const position = todo.pop();
        result.push(position);
        const nextPositions = computeImmediateReachablePositionsFromXY(board, position.x, position.y);

        nextPositions.forEach(position => {
            if (!positionIsIn(position, result) && !positionIsIn(position, todo)) {
                todo.push(position);
            }
        });
    }
    return result;
};

const computeImmediateReachablePositionsFromXY = (board, x, y) =>
    Object.values(Direction).reduce((res, direction) => {
        const { x: nextX, y: nextY } = getNextCoordinatesForAMove(x, y, direction);
        if (
            nextX >= 0 &&
            nextX < board.length &&
            nextY >= 0 &&
            nextY < board.length &&
            getExitDirections(board[y][x]).includes(direction)
        ) {
            const nextPathCard = board[nextY][nextX];
            const nextPathCardEntranceDirections = getExitDirections(nextPathCard).map(rotateDirection(2));
            if (nextPathCardEntranceDirections.includes(direction)) {
                res.push({ x: nextX, y: nextY });
            }
        }
        return res;
    }, []);

const computeReachablePositionsForAllPlayers = game => {
    const newGame = produce(game, draft => {
        draft.reachablePositions = game.reachablePositions.map((v, k) => {
            const board = game.board;
            const { x, y } = game.players[k];
            return computeAllReachablePositionsFromXY(board, x, y);
        });
    });
    return newGame;
};

export const moveCurrentPlayerTo = (game, x, y) => {
    const { players, currentPlayerIndex } = game;
    const player = players[currentPlayerIndex];
    const newGame = produce(game, draft => {
        draft.players[currentPlayerIndex] = movePlayerTo(player, x, y);
    });
    return newGame;
};

export const setRemainingPathCardAt = (game, x, y) => {
    const index = getIndexPosition({ x, y });
    const newRemainingCard = movePathCardTo(game.remainingPathCard, x, y);
    return produce(game, draft => {
        draft.currentIndexOfPathCardInsertionPosition = index;
        draft.remainingPathCard = newRemainingCard;
    });
};

export const rotateRemainingPathCard = (game, deltaDirection = ROTATE.CLOCKWISE) => {
    const { remainingPathCard } = game;
    const newRemainingPathCard = produce(remainingPathCard, draft => {
        draft.direction = (remainingPathCard.direction + deltaDirection) % 4;
    });
    return produce(game, draft => {
        draft.remainingPathCard = newRemainingPathCard;
    });
};

const shiftColumnDown = (game, x) => {
    let newGame = game;
    for (let j = 0; j < 6; j++) {
        newGame = movePathCardAndPlayer({
            game: newGame,
            fromX: x,
            fromY: j + 1,
            toX: x,
            toY: j,
        });
    }
    return produce(newGame, draft => {
        putCardOnBoard(draft.board, x, 6, game.remainingPathCard);
    });
};

const shiftColumnUp = (game, x) => {
    let newGame = game;
    for (let j = 5; j >= 0; j--) {
        newGame = movePathCardAndPlayer({
            game: newGame,
            fromX: x,
            fromY: j,
            toX: x,
            toY: j + 1,
        });
    }
    return produce(newGame, draft => {
        putCardOnBoard(draft.board, x, 0, game.remainingPathCard);
    });
};

const shiftRowLeft = (game, y) => {
    let newGame = game;
    for (let i = 0; i < 6; i++) {
        newGame = movePathCardAndPlayer({
            game: newGame,
            fromX: i + 1,
            fromY: y,
            toX: i,
            toY: y,
        });
    }
    return produce(newGame, draft => {
        putCardOnBoard(draft.board, BOARD_SIZE - 1, y, game.remainingPathCard);
    });
};

const shiftRowRight = (game, y) => {
    let newGame = game;
    for (let i = 5; i >= 0; i--) {
        newGame = movePathCardAndPlayer({
            game: newGame,
            fromX: i,
            fromY: y,
            toX: i + 1,
            toY: y,
        });
    }
    return produce(newGame, draft => {
        putCardOnBoard(draft.board, 0, y, game.remainingPathCard);
    });
};

const movePathCardAndPlayer = ({ game, fromX, fromY, toX, toY }) =>
    produce(game, draft => {
        draft.board[toY][toX] = movePathCardTo(game.board[fromY][fromX], toX, toY);
        const { players } = game;
        draft.players = moveAllPlayers({
            players,
            fromX,
            fromY,
            toX,
            toY,
        });
    });

const doShift = ({ game, shiftFunction, fromX, fromY, toX, toY, fixed }) => {
    const { players } = game;

    const extractedPathCard = movePathCardTo(game.board[fromY][fromX], toX, toY);
    const currentIndexOfPathCardInsertionPosition = getIndexPosition({
        x: toX,
        y: toY,
    });

    const newGame1 = produce(game, draft => {
        draft.players = moveAllPlayers({
            players,
            fromX,
            fromY,
            toX,
            toY,
        });
    });

    const newGame2 = shiftFunction(newGame1, fixed);

    const newGame3 = produce(newGame2, draft => {
        draft.remainingPathCard = movePathCardTo(extractedPathCard, toX, toY);
        draft.currentIndexOfPathCardInsertionPosition = currentIndexOfPathCardInsertionPosition;
    });

    return putPlayersBackOnBoard(newGame3);
};

export const insertRemainingPathCardAt = (game, x, y) => {
    if (!isInsertionPosition({ x, y })) {
        return game;
    }

    const newGame = setRemainingPathCardAt(game, x, y);

    if (x < 0) {
        return doShift({
            game: newGame,
            shiftFunction: shiftRowRight,
            fromX: 6,
            fromY: y,
            toX: 7,
            toY: y,
            fixed: y,
        });
    }
    if (x >= BOARD_SIZE) {
        return doShift({
            game: newGame,
            shiftFunction: shiftRowLeft,
            fromX: 0,
            fromY: y,
            toX: -1,
            toY: y,
            fixed: y,
        });
    }
    if (y < 0) {
        return doShift({
            game: newGame,
            shiftFunction: shiftColumnUp,
            fromX: x,
            fromY: 6,
            toX: x,
            toY: 7,
            fixed: x,
        });
    }
    if (y >= BOARD_SIZE) {
        return doShift({
            game: newGame,
            shiftFunction: shiftColumnDown,
            fromX: x,
            fromY: 0,
            toX: x,
            toY: -1,
            fixed: x,
        });
    }

    return newGame;
};
