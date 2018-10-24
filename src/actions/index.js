import axios from 'axios';
import { rotateRemainingPathCard } from '../common/game';

import {
    CREATE_GAME_SUCCESS,
    ROTATE_REMAINING_PATHCARD_CLOCKWISE,
    ROTATE_REMAINING_PATHCARD_CLOCKWISE_OPTIMISTIC,
} from './types';

const apiUrl = 'http://localhost:3000';

export const createGame = () => {
    return dispatch => {
        return axios
            .post(`${apiUrl}/createGame`)
            .then(response => {
                dispatch(createGameSuccess(response.data));
            })
            .catch(error => {
                throw error;
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
