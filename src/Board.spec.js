import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Board from './Board';
import Tile from './Tile';
import { createGame } from './common/game';

it('renders without crashing', () => {
    const game = createGame();
    const board = game.board;
    const div = document.createElement('div');
    ReactDOM.render(<Board board={board} players={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should contain 7x7 tiles', () => {
    const board = createGame().board;
    const wrapper = shallow(<Board board={board} players={[]} />);
    expect(wrapper.find('.board-game')).toHaveLength(3);
    expect(wrapper.find('.board-game').find('#ground')).toHaveLength(1);
    expect(wrapper.find(Tile)).toHaveLength(7 * 7);
});

it('should render a player board', () => {
    const board = createGame().board;
    const wrapper = shallow(<Board board={board} players={[{ x: 0, y: 0 }]} />);
    expect(wrapper.find('.board-game').find('#players')).toHaveLength(1);
});
