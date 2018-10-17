import { Direction } from './pathCard';

import { getCurrentTargetCard } from './player';

import { PATH_CARD_INSERTION_POSITION, searchTargetCardInBoard } from './board';

import {
    movePlayer,
    createGame,
    insertRemainingPathCard,
    insertRemainingPathCardAt,
    setRemainingPathCardAt,
} from './game';

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

    it('should increase score when target is reached', () => {
        // TODO: add tests
        let { x, y } = { x: playerX, y: playerY };
        const godMode = true;
        let newScore = score;
        if (searchTargetCardInBoard(board, targetCard)) {
            let currentGame = game;
            if (x === targetX && y === targetY) {
                expect(newScore).toBe(score + 1);
            } else if (x < targetX) {
                currentGame = movePlayer(currentGame, Direction.EAST, godMode);
            } else if (x > targetX) {
                currentGame = movePlayer(currentGame, Direction.WEST, godMode);
            } else if (y < targetY) {
                currentGame = movePlayer(currentGame, Direction.NORTH, godMode);
            } else if (y > targetY) {
                currentGame = movePlayer(currentGame, Direction.SOUTH, godMode);
            }
        }
    });
});

describe('create a game', () => {
    const game = createGame();
    const { board, remainingPathCard } = game;

    it('should be in 1, -1', () => {
        expect(remainingPathCard.x).toBe(1);
        expect(remainingPathCard.y).toBe(-1);
    });

    it('should be the board', () => {
        expect(board[1][-1]).toEqual(remainingPathCard);
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

describe('insert a pathCard into Board', () => {
    const game = createGame();
    const { board: oldBoard, remainingPathCard } = game;
    const { board: newBoard, remainingPathCard: newRemainingPathCard } = insertRemainingPathCard(game);

    it('should be in 1, -1', () => {
        expect(remainingPathCard.x).toBe(1);
        expect(remainingPathCard.y).toBe(-1);
    });

    it('should be in 1, 7', () => {
        expect(newRemainingPathCard.x).toBe(1);
        expect(newRemainingPathCard.y).toBe(7);
    });

    it('should have insert the right remainingCard', () => {
        expect(newBoard[1][0].x).toBe(1);
        expect(newBoard[1][0].y).toBe(0);
    });

    it('should have inserted remaining card', () => {
        expect(newBoard[1][0].type).toBe(remainingPathCard.type);
        expect(newBoard[1][0].direction).toBe(remainingPathCard.direction);
    });

    it('should have extracted board[1][6]', () => {
        expect(oldBoard[1][6].type).toBe(newRemainingPathCard.type);
        expect(oldBoard[1][6].direction).toBe(newRemainingPathCard.direction);
    });
});

describe('insert a pathCard up and down', () => {
    const game = createGame();
    const game1 = insertRemainingPathCard(game);
    const game2 = insertRemainingPathCard(game1);

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

describe('insert a pathCard into all possible positions', () => {
    const game = createGame();
    PATH_CARD_INSERTION_POSITION.forEach(position => {
        const { x, y } = position;
        const newGame = setRemainingPathCardAt(game, x, y);

        const game1 = insertRemainingPathCard(newGame);
        const game2 = insertRemainingPathCard(game1);
        it('should do the identity', () => {
            expect(newGame.remainingPathCard).toEqual(game2.remainingPathCard);
            expect(JSON.stringify(newGame)).toEqual(JSON.stringify(game2));
        });
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
