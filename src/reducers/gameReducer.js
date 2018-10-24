import {
    CREATE_GAME_SUCCESS,
    INSERT_REMAINING_PATHCARD,
    INSERT_REMAINING_PATHCARD_OPTIMISTIC,
    ROTATE_REMAINING_PATHCARD_CLOCKWISE,
    ROTATE_REMAINING_PATHCARD_CLOCKWISE_OPTIMISTIC,
} from '../actions/types';

export default function gameReducer(state = [], action) {
    switch (action.type) {
        case CREATE_GAME_SUCCESS:
        case ROTATE_REMAINING_PATHCARD_CLOCKWISE:
        case ROTATE_REMAINING_PATHCARD_CLOCKWISE_OPTIMISTIC:
        case INSERT_REMAINING_PATHCARD:
        case INSERT_REMAINING_PATHCARD_OPTIMISTIC:
            return action.payload;
        default:
            return state;
    }
}
