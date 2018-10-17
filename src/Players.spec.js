import React from 'react';
import { shallow } from 'enzyme';
import Players from './Players';

it('should render a player board', () => {
    const wrapper = shallow(<Players players={[0]} />);
    expect(wrapper.find('.game-board.players')).toHaveLength(1);
    expect(wrapper).toHaveLength(1);
});

it('should contain 2 players', () => {
    const wrapper = shallow(<Players players={[0, 1]} />);
    expect(wrapper.find('.player-grid')).toHaveLength(2);
    expect(wrapper.find('.player-image')).toHaveLength(2);
});
