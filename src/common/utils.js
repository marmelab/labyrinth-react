export const fromBoardReferentialToDisplay = ({ x, y }) => ({ x: x + 1, y: 7 - y });

export const fromDisplayReferentialToBoard = ({ x, y }) => ({ x: x - 1, y: 7 - y });
