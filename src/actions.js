import { apiUrl } from './config';

export const CREATE_GAME = 'CREATE_GAME';
export const CREATE_GAME_SUCCESS = 'CREATE_GAME_SUCCESS';

export const ROTATE_REMAINING_PATHCARD_CLOCKWISE = 'ROTATE_REMAINING_PATHCARD_CLOCKWISE';
export const ROTATE_REMAINING_PATHCARD_CLOCKWISE_OPTIMISTIC = 'ROTATE_REMAINING_PATHCARD_CLOCKWISE_OPTIMISTIC';

export const INSERT_REMAINING_PATHCARD = 'INSERT_REMAINING_PATHCARD';
export const INSERT_REMAINING_PATHCARD_OPTIMISTIC = 'INSERT_REMAINING_PATHCARD_OPTIMISTIC';

export const MOVE_CURRENT_PLAYER_TO = 'MOVE_CURRENT_PLAYER_TO';
export const MOVE_CURRENT_PLAYER_TO_OPTIMISTIC = 'MOVE_CURRENT_PLAYER_TO_OPTIMISTIC';

export const createGame = () => ({
    type: CREATE_GAME,
    meta: {
        axios: {
            method: 'post',
            url: `${apiUrl}/createGame`,
            headers: { 'Content-Type': 'application/json' },
        },
        afterAction: CREATE_GAME_SUCCESS,
    },
});

export const rotateRemainingPathcardClockwise = gameId => ({
    type: ROTATE_REMAINING_PATHCARD_CLOCKWISE_OPTIMISTIC,
    payload: { id: gameId },
    meta: {
        axios: {
            method: 'post',
            url: `${apiUrl}/rotateRemainingPathCard`,
            headers: { 'Content-Type': 'application/json' },
        },
        afterAction: ROTATE_REMAINING_PATHCARD_CLOCKWISE,
    },
});

export const insertRemainingPathcardAt = (gameId, x, y) => ({
    type: INSERT_REMAINING_PATHCARD_OPTIMISTIC,
    payload: { id: gameId, x, y },
    meta: {
        axios: {
            method: 'post',
            url: `${apiUrl}/insertRemainingPathCardAt`,
            headers: { 'Content-Type': 'application/json' },
        },
        afterAction: INSERT_REMAINING_PATHCARD,
    },
});

export const actionMoveCurrentPlayerTo = (gameId, x, y) => ({
    type: MOVE_CURRENT_PLAYER_TO_OPTIMISTIC,
    payload: { id: gameId, x, y },
    meta: {
        axios: {
            method: 'post',
            url: `${apiUrl}/moveCurrentPlayerTo`,
            headers: { 'Content-Type': 'application/json' },
        },
        afterAction: MOVE_CURRENT_PLAYER_TO,
    },
});
