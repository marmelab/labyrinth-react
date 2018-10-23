import * as React from 'react';
import { connect } from 'react-redux';

import { createGame } from '../actions';
import { CREATE_GAME } from '../actions/types';

const NewGame = ({ onCreateGame }) => (
    <div>
        <button type="button" className="btn btn-warning" onClick={onCreateGame}>
            New Game
        </button>
    </div>
);

const mapDispatchToProps = dispatch => {
    return {
        onCreateGame: () => dispatch(createGame()),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(NewGame);
