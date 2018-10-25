import {
    CREATE_GAME_SUCCESS,
    ROTATE_REMAINING_PATHCARD_CLOCKWISE,
    ROTATE_REMAINING_PATHCARD_CLOCKWISE_OPTIMISTIC,
} from '../actions/types';

export default function gameReducer(state = [], action) {
    switch (action.type) {
        case CREATE_GAME_SUCCESS:
        case ROTATE_REMAINING_PATHCARD_CLOCKWISE:
        case ROTATE_REMAINING_PATHCARD_CLOCKWISE_OPTIMISTIC:
            return action.payload;
        default:
            return state;
    }
}
