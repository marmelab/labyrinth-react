import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, render } from 'enzyme';

import { Board } from './Board';
import Tile from './Tile';
import { createGame } from '../common/game';

it('renders without crashing', () => {
    const game = createGame();
    const board = game.board;
    const div = document.createElement('div');
    ReactDOM.render(<Board board={board} players={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should render layers', () => {
    const board = createGame().board;
    const wrapper = shallow(<Board board={board} players={[{ x: 0, y: 0 }]} />);
    expect(wrapper.find('.board-game').find('#empty')).toHaveLength(1);
    expect(wrapper.find('.board-game').find('#ground')).toHaveLength(1);
    expect(wrapper.find('.board-game').find('#players')).toHaveLength(1);
    expect(wrapper.find('.board-game').find('#insert-positions')).toHaveLength(1);
});

it('should contain 7x7 tiles', () => {
    const board = createGame().board;
    const wrapper = shallow(<Board board={board} players={[]} />);
    expect(wrapper.find('.board-game').find('#ground')).toHaveLength(1);
    expect(wrapper.find(Tile)).toHaveLength(7 * 7);
});

it('should contain 24 treasures', () => {
    const game = createGame();
    const board = game.board;
    const wrapper = render(<Board board={board} players={[]} />);
    const remainingTreasure = game.remainingPathCard.target != null ? 1 : 0;
    expect(wrapper.find('.treasure')).toHaveLength(24 - remainingTreasure);
});
