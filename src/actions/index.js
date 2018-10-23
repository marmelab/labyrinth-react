import axios from 'axios';

import { CREATE_GAME, ROTATE_REMAINING_PATHCARD_CLOCKWISE } from './types';

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

export const rotateRemainingPathcardClockwise = () => {
    return dispatch => {
        const config = {
            method: 'post',
            url: `${apiUrl}/rotateRemainingPathCard`,
            data: { id: this.id },
            headers: { 'Content-Type': 'application/json' },
        };

        return axios(config)
            .then(response => {
                dispatch(rotateRemainingPathcardClockwiseSuccess(response.data));
            })
            .catch(error => {
                throw error;
            });
    };
};

const createGameSuccess = data => ({
    type: CREATE_GAME,
    payload: {
        body: data.body,
    },
});

const rotateRemainingPathcardClockwiseSuccess = data => ({
    type: ROTATE_REMAINING_PATHCARD_CLOCKWISE,
    payload: {
        body: data.body,
    },
});
