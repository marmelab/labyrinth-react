import { createPathCard, Type, Direction } from './pathCard';
import { createTargetCard } from './targetCard';
import { createEmptyBoard } from './board';
import { createPlayer, addTargetCardToPlay } from './player';
import { produce } from 'immer';

export const buildBoard = () => {
    let targetNumber = 0;
    const pathCardToInsert = [
        // row 0
        {
            type: Type.CORNER,
            x: 0,
            y: 0,
            direction: Direction.EAST,
        },
        {
            type: Type.CROSS,
            x: 2,
            y: 0,
            direction: Direction.SOUTH,
            target: targetNumber++,
        },
        {
            type: Type.CROSS,
            x: 4,
            y: 0,
            direction: Direction.SOUTH,
            target: targetNumber++,
        },
        {
            type: Type.CORNER,
            x: 6,
            y: 0,
            direction: Direction.SOUTH,
        },

        // row 2
        {
            type: Type.CROSS,
            x: 0,
            y: 2,
            direction: Direction.EAST,
            target: targetNumber++,
        },
        {
            type: Type.CROSS,
            x: 2,
            y: 2,
            direction: Direction.EAST,
            target: targetNumber++,
        },
        {
            type: Type.CROSS,
            x: 4,
            y: 2,
            direction: Direction.SOUTH,
            target: targetNumber++,
        },
        {
            type: Type.CROSS,
            x: 6,
            y: 2,
            direction: Direction.WEST,
            target: targetNumber++,
        },

        // row 4
        {
            type: Type.CROSS,
            x: 0,
            y: 4,
            direction: Direction.EAST,
            target: targetNumber++,
        },
        {
            type: Type.CROSS,
            x: 2,
            y: 4,
            direction: Direction.NORTH,
            target: targetNumber++,
        },
        {
            type: Type.CROSS,
            x: 4,
            y: 4,
            direction: Direction.WEST,
            target: targetNumber++,
        },
        {
            type: Type.CROSS,
            x: 6,
            y: 4,
            direction: Direction.WEST,
            target: targetNumber++,
        },

        // row 6
        {
            type: Type.CORNER,
            x: 0,
            y: 6,
            direction: Direction.NORTH,
        },
        {
            type: Type.CROSS,
            x: 2,
            y: 6,
            direction: Direction.NORTH,
            target: targetNumber++,
        },
        {
            type: Type.CROSS,
            x: 4,
            y: 6,
            direction: Direction.NORTH,
            target: targetNumber++,
        },
        {
            type: Type.CORNER,
            x: 6,
            y: 6,
            direction: Direction.WEST,
        },
    ];

    const initBoardFromRow = (board, row) =>
        produce(board, draft => {
            row.forEach(card => {
                const pathCard = createPathCard(card);
                draft[pathCard.x][pathCard.y] = pathCard;
            });
        });

    const board = initBoardFromRow(createEmptyBoard(), pathCardToInsert);

    return Object.freeze({ board: board, targetNumber: targetNumber });
};

export const buildPathDeck = numberOfTargetAlreadyOnBoard =>
    Object.freeze([
        ...Array.from({ length: 13 }, () => createPathCard({ type: Type.STRAIGHT })),
        ...Array.from({ length: 9 }, () => createPathCard({ type: Type.CORNER })),
        ...Array.from({ length: 6 }, () =>
            createPathCard({ type: Type.CORNER, target: numberOfTargetAlreadyOnBoard++ })
        ),
        ...Array.from({ length: 6 }, () =>
            createPathCard({ type: Type.CROSS, target: numberOfTargetAlreadyOnBoard++ })
        ),
    ]);

export const buildTargetDeck = maxTargetNumber =>
    Object.freeze(Array.from({ length: maxTargetNumber }, (_, k) => createTargetCard(k)));

export const shuffle = array =>
    produce(array, draft => {
        for (let i = draft.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [draft[i], draft[j]] = [draft[j], draft[i]];
        }
    });

export const initPlayers = (board, nbPlayers) => {
    const STARTING_POSITION_FOR_PLAYER = [
        { x: 0, y: 0, color: 'yellow' },
        { x: 6, y: 6, color: 'green' },
        { x: 6, y: 0, color: 'blue' },
        { x: 0, y: 6, color: 'red' },
    ];

    const players = Object.freeze(
        Array.from({ length: nbPlayers }, (_, k) => {
            const { x, y, color } = STARTING_POSITION_FOR_PLAYER[k];
            return createPlayer(color, x, y, []);
        })
    );
    return players;
};

export const dealCards = (players, cards) => {
    const nbPlayers = players.length;
    const nbCards = cards.length;
    const nbCardsPerPlayer = nbCards / nbPlayers;
    let newPlayers = produce(players, draft => {
        cards.forEach((card, index) => {
            const indexPlayer = Math.trunc(index / nbCardsPerPlayer);
            draft[indexPlayer] = addTargetCardToPlay(draft[indexPlayer], card);
        });
    });
    return newPlayers;
};

const dealCardsOnBoard = (board, shuffledPathDeck) => {
    let deck = shuffledPathDeck.slice();
    const newBoard = produce(board, draft => {
        board.forEach((column, x) => {
            column.forEach((cell, y) => {
                if (!cell) {
                    const pathCard = deck.pop();
                    const directions = Object.values(Direction);
                    const randomDirection = directions[Math.floor(Math.random() * directions.length)];

                    const newPathCard = produce(pathCard, draftCard => {
                        draftCard.direction = randomDirection;
                        draftCard.x = x;
                        draftCard.y = y;
                    });
                    draft[x][y] = newPathCard;
                }
            });
        });
    });

    return Object.freeze({ board: newBoard, remaingPathCard: deck.pop() });
};

export const initGame = (nbPlayers, nbTargetCards) => {
    const { board, targetNumber: numberOfTargetAlreadyOnBoard } = buildBoard();

    const pathDeck = buildPathDeck(numberOfTargetAlreadyOnBoard);
    const shuffledPathDeck = shuffle(pathDeck);
    const { board: newBoard, remaingPathCard: remainingPathCard } = dealCardsOnBoard(board, shuffledPathDeck);

    const playersWithPathCard = initPlayers(newBoard, nbPlayers);
    const targetDeck = buildTargetDeck(nbTargetCards);
    const suffledTargetDeck = shuffle(targetDeck);

    const playersWithTargetCards = dealCards(playersWithPathCard, suffledTargetDeck);

    return Object.freeze({
        board: newBoard,
        players: playersWithTargetCards,
        remainingPathCard: remainingPathCard,
    });
};
