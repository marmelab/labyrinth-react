export const STATE = Object.freeze({
    TO_INSERT: 0,
    TO_MOVE: 1,
    END: 2,
});

export const EVENT = Object.freeze({
    MOVE_PLAYER_TO: 0,
    INSERT_REMAINING_PATHCARD_AT: 1,
    ROTATE_REMAINING_PATHCARD: 2,
    RESTART: 3,
    QUIT: 4,
});

export const ROTATE = Object.freeze({
    CLOCKWISE: 1,
    ANTI_CLOCKWISE: -1,
});
