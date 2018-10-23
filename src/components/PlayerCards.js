import React from 'react';

import { connect } from 'react-redux';

import { rotateRemainingPathcardClockwise } from '../actions/index';

import Tile from './Tile';

const PlayerCards = ({ remainingPathCard, onRotateRemainingPathCard }) => (
    <div className="board">
        <div className="row">
            <div className="box" />
            <div className="box" />
            <div className="box" />
            <div className="box">
                <Tile
                    degrees={90 * remainingPathCard.direction}
                    type={remainingPathCard.type}
                    target={remainingPathCard.target}
                    onClick={onRotateRemainingPathCard}
                />
            </div>
            <div className="box" />
            <div className="box" />
            <div className="box" />
        </div>
    </div>
);

const mapDispatchToProps = dispatch => {
    return {
        onRotateRemainingPathCard: () => {
            dispatch(rotateRemainingPathcardClockwise());
        },
    };
};

export default connect(
    null,
    mapDispatchToProps
)(PlayerCards);
