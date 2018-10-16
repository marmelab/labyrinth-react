const { createEmptyBoard, flattenBoard } = require('./board');

describe('Board', () => {
    const board = createEmptyBoard();
    it('should return correct size', () => {
        expect(board).toHaveLength(7);
    });

    it('should contain length*length cells', () => {
        const flattenArray = flattenBoard(board);
        expect(flattenArray).toHaveLength(board.length * board.length);
        flattenArray.forEach(element => expect(element).toBe(0));
    });
});
