export const fromBoardReferentialToDisplay = ({ x, y }) => ({ x: x + 1, y: 7 - y });
export const fromDisplayReferentialToBoard = ({ x, y }) => ({ x: x - 1, y: 7 - y });

export const convertBoardXToDisplayX = x => x + 1;
export const convertBoardYToDisplayY = y => 7 - y;
