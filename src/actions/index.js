import axios from 'axios';

import { rotateRemainingPathCard, insertRemainingPathCardAt } from '../common/game';
import { apiUrl } from '../config';
import {
    CREATE_GAME_SUCCESS,
    ROTATE_REMAINING_PATHCARD_CLOCKWISE,
    ROTATE_REMAINING_PATHCARD_CLOCKWISE_OPTIMISTIC,
    INSERT_REMAINING_PATHCARD,
    INSERT_REMAINING_PATHCARD_OPTIMISTIC,
} from './types';

export const createGame = () => {
    return dispatch => {
        return axios.post(`${apiUrl}/createGame`).then(response => {
            dispatch(createGameSuccess(response.data));
        });
    };
};

const optimisticRotateRemainingPathcardClockwise = (dispatch, game) =>
    Promise.resolve(dispatch(rotateRemainingPathcardClockwiseOptimistic(rotateRemainingPathCard(game, 1))));

const networkRotateRemainingPathcardClockwise = (dispatch, game) => {
    const config = {
        method: 'post',
        url: `${apiUrl}/rotateRemainingPathCard`,
        data: { id: game._id },
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(response => {
        dispatch(rotateRemainingPathcardClockwiseSuccess(response.data));
    });
};

export const rotateRemainingPathcardClockwise = game => {
    return dispatch => {
        Promise.all([
            optimisticRotateRemainingPathcardClockwise(dispatch, game),
            networkRotateRemainingPathcardClockwise(dispatch, game),
        ]);
    };
};

const optimisticInsertRemainingPathcardAt = (dispatch, game, x, y) => {
    const newGame = insertRemainingPathCardAt(game, x, y);
    console.log('optimistic new game: ', newGame);
    return Promise.resolve(dispatch(insertRemainingPathcardAtOptimistic(newGame)));
};

const networkInsertRemainingPathcardAt = (dispatch, game, x, y) => {
    const config = {
        method: 'post',
        url: `${apiUrl}/insertRemainingPathCardAt`,
        data: { id: game._id, x: x, y: y },
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(response => {
        console.log('network new game: ', response.data);
        dispatch(insertRemainingPathcardAtSuccess(response.data));
    });
};

const convertDisplayToBoard = x => (x === 0 ? -1 : x === 6 ? 7 : x);

export const insertRemainingPathcardAt = (game, x, y) => {
    const boardX = convertDisplayToBoard(x);
    const boardY = convertDisplayToBoard(y);

    return dispatch => {
        Promise.all([
            optimisticInsertRemainingPathcardAt(dispatch, game, boardX, boardY),
            networkInsertRemainingPathcardAt(dispatch, game, boardX, boardY),
        ]);
    };
};

const createGameSuccess = data => ({
    type: CREATE_GAME_SUCCESS,
    payload: data,
});

const rotateRemainingPathcardClockwiseSuccess = data => ({
    type: ROTATE_REMAINING_PATHCARD_CLOCKWISE,
    payload: data,
});

const rotateRemainingPathcardClockwiseOptimistic = data => ({
    type: ROTATE_REMAINING_PATHCARD_CLOCKWISE_OPTIMISTIC,
    payload: data,
});

const insertRemainingPathcardAtSuccess = data => ({
    type: INSERT_REMAINING_PATHCARD,
    payload: data,
});

const insertRemainingPathcardAtOptimistic = data => ({
    type: INSERT_REMAINING_PATHCARD_OPTIMISTIC,
    payload: data,
});
