export const STATE = Object.freeze({
    TO_INSERT: 0,
    TO_MOVE: 1,
    END: 2,
});

export const EVENT = Object.freeze({
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
    VALIDATE: 4,
    ROTATE: 5,
    RESTART: 5,
    QUIT: 5,
});

export const ROTATE = Object.freeze({
    CLOCKWISE: 1,
    ANTI_CLOCKWISE: -1,
});
