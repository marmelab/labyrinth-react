import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, render } from 'enzyme';

import { Board } from './Board';
import Tile from './Tile';
import { createGame } from '../common/game';

it('should render layers', () => {
    const game = createGame();
    const wrapper = shallow(<Board game={game} />);
    expect(wrapper.find('.board-game').find('#empty')).toHaveLength(1);
    expect(wrapper.find('.board-game').find('#ground')).toHaveLength(1);
    expect(wrapper.find('.board-game').find('#players')).toHaveLength(1);
    expect(wrapper.find('.board-game').find('#insert-positions')).toHaveLength(1);
});

it('should contain 7x7 tiles', () => {
    const game = createGame();
    const wrapper = shallow(<Board game={game} />);
    expect(wrapper.find('.board-game').find('#ground')).toHaveLength(1);
    expect(wrapper.find(Tile)).toHaveLength(7 * 7);
});

it('should contain 24 treasures', () => {
    const game = createGame();
    const wrapper = render(<Board game={game} />);
    const remainingTreasure = game.remainingPathCard.target != null ? 1 : 0;
    expect(wrapper.find('.treasure')).toHaveLength(24 - remainingTreasure);
});

it('should contain at least one player', () => {
    const game = createGame();
    const wrapper = render(<Board game={game} />);
    expect(wrapper.find('.player-image').length).toBeGreaterThanOrEqual(1);
});
