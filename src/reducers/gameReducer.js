import { CREATE_GAME, ROTATE_REMAINING_PATHCARD_CLOCKWISE } from '../actions/types';

export default function gameReducer(state = [], action) {
    switch (action.type) {
        case CREATE_GAME:
            return [...state, action.payload];
        case ROTATE_REMAINING_PATHCARD_CLOCKWISE:
            return [...state, action.payload];
        default:
            return state;
    }
}
