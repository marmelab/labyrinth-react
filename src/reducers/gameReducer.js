import {
    CREATE_GAME_SUCCESS,
    INSERT_REMAINING_PATHCARD,
    INSERT_REMAINING_PATHCARD_OPTIMISTIC,
    ROTATE_REMAINING_PATHCARD_CLOCKWISE,
    ROTATE_REMAINING_PATHCARD_CLOCKWISE_OPTIMISTIC,
    MOVE_CURRENT_PLAYER_TO,
    MOVE_CURRENT_PLAYER_TO_OPTIMISTIC,
} from '../actions';

import { insertRemainingPathCardAt, moveCurrentPlayerTo, rotateRemainingPathCard } from '../common/game';

export default function gameReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_GAME_SUCCESS:
        case ROTATE_REMAINING_PATHCARD_CLOCKWISE:
        case INSERT_REMAINING_PATHCARD:
        case MOVE_CURRENT_PLAYER_TO:
            return action.payload;

        case ROTATE_REMAINING_PATHCARD_CLOCKWISE_OPTIMISTIC:
            return rotateRemainingPathCard(state);

        case MOVE_CURRENT_PLAYER_TO_OPTIMISTIC: {
            const { x, y } = action.payload;
            return insertRemainingPathCardAt(state, x, y);
        }
        case INSERT_REMAINING_PATHCARD_OPTIMISTIC: {
            const { x, y } = action.payload;
            return moveCurrentPlayerTo(state, x, y);
        }
        default:
            return state;
    }
}
