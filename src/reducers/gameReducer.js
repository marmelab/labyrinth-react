import { CREATE_GAME_SUCCESS } from '../actions/types';

export default function gameReducer(state = [], action) {
    switch (action.type) {
        case CREATE_GAME_SUCCESS:
            return action.payload.game;

        default:
            return state;
    }
}
