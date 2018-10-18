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
    expect(wrapper.find('.game-board')).toHaveLength(2);
    expect(wrapper.find(Tile)).toHaveLength(7 * 7);
});

it('should render a player board', () => {
    const board = createGame().board;
    const wrapper = shallow(<Board board={board} players={[0]} />);
    expect(wrapper.find('.game-board.players')).toHaveLength(1);
    expect(wrapper).toHaveLength(1);
});

it('should contain 2 players', () => {
    const board = createGame().board;
    const wrapper = shallow(<Board board={board} players={[0, 1]} />);
    expect(wrapper.find('.player-grid')).toHaveLength(2);
    expect(wrapper.find('.player-image')).toHaveLength(2);
});
