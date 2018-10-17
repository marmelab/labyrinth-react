import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import Tile from './Tile';

import { createGame } from './common/game';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReactTestUtils from 'react-dom/test-utils';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
    const game = createGame();
    const board = game.board;
    const div = document.createElement('div');
    ReactDOM.render(<Board board={board} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should render 7x7 tiles', () => {
    const game = createGame();
    const board = game.board;
    const renderer = new ShallowRenderer();
    renderer.render(<Board board={board} />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('div');
    expect(result.props.children).toHaveLength(7 * 7);

    expect(ReactTestUtils.isElementOfType(result.props.children[0], Tile)).toBeTruthy();
});

// Using Enzyme
it('should contain 7x7 tiles', () => {
    const board = createGame().board;
    const wrapper = shallow(<Board board={board} />);
    expect(wrapper.find('.game-board')).toHaveLength(1);
    expect(wrapper.find(Tile)).toHaveLength(7 * 7);
});
