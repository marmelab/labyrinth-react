const { createPlayer, addTargetCardToPlay } = require('./player');

describe('Intialized Player', () => {
    it('should use the given parameters, and an empty target card deck', () => {
        const player = createPlayer('green', 0, 0, []);
        expect(player.x).toBe(0);
        expect(player.y).toBe(0);
        expect(player.color).toEqual('green');
        expect(player.targetCards).toEqual([]);
    });
});

describe('Add a card', () => {
    const player = createPlayer('green', 0, 0, []);

    it('should have exactly 1 card', () => {
        const newPlayer = addTargetCardToPlay(player, 0);
        expect(newPlayer.targetCards).toHaveLength(1);
    });
    it('should have exactly 2 cards', () => {
        const newPlayer = addTargetCardToPlay(addTargetCardToPlay(player, 0), 1);
        expect(newPlayer.targetCards).toHaveLength(2);
    });
});
