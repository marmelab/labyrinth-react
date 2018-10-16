const { produce } = require('immer');

const Type = Object.freeze({ STRAIGHT: '┃', CORNER: '┗', CROSS: '┻' }); // pointing NORTH
const Direction = Object.freeze({
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

const getPathCardFactory = () => {
    let id = 1;
    return (parameters = {}) => Object.freeze(Object.assign({}, defaultPathCard, parameters, { id: id++ }));
};

const createPathCard = getPathCardFactory();

const movePathCardTo = (pathCard, toX, toY) =>
    produce(pathCard, draft => {
        draft.x = toX;
        draft.y = toY;
    });

function getNextCoordinatesForAMove(x, y, direction) {
    switch (direction) {
        case Direction.NORTH:
            return { x: x, y: y + 1 };
        case Direction.SOUTH:
            return { x: x, y: y - 1 };
        case Direction.EAST:
            return { x: x + 1, y: y };
        case Direction.WEST:
            return { x: x - 1, y: y };
    }
    return null;
}

const rotateDirection = numberOfQuaters => direction => (4 + direction + numberOfQuaters) % 4;

const getExitDirections = card => {
    switch (card.type) {
        case Type.STRAIGHT:
            return [Direction.NORTH, Direction.SOUTH].map(rotateDirection(card.direction));
        case Type.CORNER:
            return [Direction.NORTH, Direction.EAST].map(rotateDirection(card.direction));
        case Type.CROSS:
            return [Direction.NORTH, Direction.EAST, Direction.WEST].map(rotateDirection(card.direction));
    }
};

module.exports = {
    createPathCard,
    getExitDirections,
    Type,
    Direction,
    rotateDirection,
    movePathCardTo,
    getNextCoordinatesForAMove,
    getPathCardFactory,
};
