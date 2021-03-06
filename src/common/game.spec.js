import { Direction } from './pathCard';

import { getCurrentTargetCard } from './player';

import { PATH_CARD_INSERTION_POSITION, searchTargetCardInBoard } from './board';

import { movePlayer, createGame, insertRemainingPathCardAt, setRemainingPathCardAt } from './game';

describe('Game movePlayer', () => {
    const game = createGame();

    const { board, players, scores, currentPlayerIndex, reachablePositions } = game;
    const player = players[currentPlayerIndex];
    const score = scores[currentPlayerIndex];
    const currentPlayerReachablePositions = reachablePositions[currentPlayerIndex];

    const targetCard = getCurrentTargetCard(player);
    const { x: targetX, y: targetY } = searchTargetCardInBoard(board, targetCard);
    const { x: playerX, y: playerY } = player;

    it('should start with a null score', () => {
        expect(score).toBe(0);
    });

    it('should start with a not null currentPlayerReachablePositions', () => {
        expect(currentPlayerReachablePositions).not.toBeNull();
    });

    it('should not be on the target', () => {
        expect(playerX === targetX && playerY === targetY).toBeFalsy();
    });
});

describe('create a game', () => {
    const game = createGame();
    const { board, remainingPathCard } = game;

    it('should be in 1, -1', () => {
        expect(remainingPathCard.x).toBe(1);
        expect(remainingPathCard.y).toBe(-1);
    });
});

describe('put remainingPathCard on the board', () => {
    const game = createGame();
    PATH_CARD_INSERTION_POSITION.forEach(position => {
        const { x, y } = position;
        const newGame = setRemainingPathCardAt(game, x, y);
        it('should be in x,y', () => {
            expect(newGame.remainingPathCard.x).toBe(x);
            expect(newGame.remainingPathCard.y).toBe(y);
        });
    });
});

describe('insert a pathCard at 1,-1', () => {
    const game = createGame();
    const { board: oldBoard, remainingPathCard } = game;
    const { board: newBoard, remainingPathCard: newRemainingPathCard } = insertRemainingPathCardAt(game, 1, -1);

    it('should be in 1, -1', () => {
        expect(remainingPathCard.x).toBe(1);
        expect(remainingPathCard.y).toBe(-1);
    });

    it('should be in 1, 7', () => {
        expect(newRemainingPathCard.x).toBe(1);
        expect(newRemainingPathCard.y).toBe(7);
    });

    it('should have insert the right remainingCard', () => {
        expect(newBoard[0][1].x).toBe(1);
        expect(newBoard[0][1].y).toBe(0);
    });

    it('should have inserted remaining card', () => {
        expect(newBoard[0][1].type).toBe(remainingPathCard.type);
        expect(newBoard[0][1].direction).toBe(remainingPathCard.direction);
    });

    it('should have extracted board[6][1]', () => {
        expect(oldBoard[6][1].type).toBe(newRemainingPathCard.type);
        expect(oldBoard[6][1].direction).toBe(newRemainingPathCard.direction);
    });
});

describe('insert a pathCard up and down', () => {
    const game = createGame();
    const game1 = insertRemainingPathCardAt(game, 1, -1);
    const game2 = insertRemainingPathCardAt(game1, 1, 7);

    it('should be in 1, 7', () => {
        expect(game1.remainingPathCard.x).toBe(1);
        expect(game1.remainingPathCard.y).toBe(7);
    });

    it('should be in 1, -1', () => {
        expect(game2.remainingPathCard.x).toBe(1);
        expect(game2.remainingPathCard.y).toBe(-1);
    });

    it('should do the identity', () => {
        expect(game.currentIndexOfPathCardInsertionPosition).toEqual(game2.currentIndexOfPathCardInsertionPosition);
    });

    it('should do the identity', () => {
        expect(game.remainingPathCard).toEqual(game2.remainingPathCard);
    });

    it('should do the identity', () => {
        expect(JSON.stringify(game.board)).toEqual(JSON.stringify(game2.board));
    });

    it('should do the identity', () => {
        expect(JSON.stringify(game)).toEqual(JSON.stringify(game2));
    });
});

describe('insert a pathCard into all possible absolute positions', () => {
    const game = createGame();

    PATH_CARD_INSERTION_POSITION.forEach(position => {
        const { x: x1, y: y1 } = position;
        const game1 = insertRemainingPathCardAt(game, x1, y1);

        const { x: x2, y: y2 } = game1.remainingPathCard;
        const game2 = insertRemainingPathCardAt(game1, x2, y2);

        const { x: x3, y: y3 } = game2.remainingPathCard;
        const game3 = insertRemainingPathCardAt(game2, x3, y3);

        it('should do the identity', () => {
            expect(game2.remainingPathCard.x).toBe(x1);
            expect(game2.remainingPathCard.y).toBe(y1);

            expect(game1.remainingPathCard).toEqual(game3.remainingPathCard);
            expect(JSON.stringify(game1)).toEqual(JSON.stringify(game3));
        });
    });
});
