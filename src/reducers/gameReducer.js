import { CREATE_GAME, CREATE_GAME_SUCCESS, ROTATE_REMAINING_PATHCARD_CLOCKWISE } from '../actions/types';

export default function gameReducer(state = [], action) {
    switch (action.type) {
        case CREATE_GAME_SUCCESS:
            return action.payload.game;

        case ROTATE_REMAINING_PATHCARD_CLOCKWISE:
        // return [...state, action.payload];

        default:
            return state;
    }
}
