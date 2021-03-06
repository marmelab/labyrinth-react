/* eslint-disable default-case */
import { produce } from 'immer';

export const Type = Object.freeze({ STRAIGHT: '┃', CORNER: '┗', CROSS: '┻' }); // pointing NORTH

export const Direction = Object.freeze({
    NORTH: 0,
    EAST: 1,
    SOUTH: 2,
    WEST: 3,
});

const defaultPathCard = {
    type: null,
    x: null,
    y: null,
    direction: Direction.NORTH,
    target: null,
    id: null,
};

export const getPathCardFactory = () => {
    let id = 1;
    return (parameters = {}) => Object.freeze(Object.assign({}, defaultPathCard, parameters, { id: id++ }));
};

export const createPathCard = getPathCardFactory();

export const movePathCardTo = (pathCard, toX, toY) =>
    produce(pathCard, draft => {
        draft.x = toX;
        draft.y = toY;
    });

export function getNextCoordinatesForAMove(x, y, direction) {
    switch (direction) {
        case Direction.NORTH:
            return { x: x, y: y - 1 };
        case Direction.SOUTH:
            return { x: x, y: y + 1 };
        case Direction.EAST:
            return { x: x + 1, y: y };
        case Direction.WEST:
            return { x: x - 1, y: y };
    }
    return null;
}

export const rotateDirection = numberOfQuaters => direction => (4 + direction + numberOfQuaters) % 4;

export const getExitDirections = card => {
    switch (card.type) {
        case Type.STRAIGHT:
            return [Direction.NORTH, Direction.SOUTH].map(rotateDirection(card.direction));
        case Type.CORNER:
            return [Direction.NORTH, Direction.EAST].map(rotateDirection(card.direction));
        case Type.CROSS:
            return [Direction.NORTH, Direction.EAST, Direction.WEST].map(rotateDirection(card.direction));
    }
};
