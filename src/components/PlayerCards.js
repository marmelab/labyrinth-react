import React from 'react';

import { connect } from 'react-redux';

import { rotateRemainingPathcardClockwise } from '../actions/index';

import Tile from './Tile';

const PlayerCards = ({ game, onRotateRemainingPathCard }) =>
    game.remainingPathCard ? (
        <div className="board">
            <div className="row">
                <div className="box" />
                <div className="box" />
                <div className="box" />
                <div className="box">
                    <Tile
                        degrees={90 * game.remainingPathCard.direction}
                        type={game.remainingPathCard.type}
                        target={game.remainingPathCard.target}
                        onClick={() => onRotateRemainingPathCard(game)}
                    />
                </div>
                <div className="box" />
                <div className="box" />
                <div className="box" />
            </div>
        </div>
    ) : (
        <div className="board" />
    );

const mapStateToProps = state => {
    return {
        game: state.game,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRotateRemainingPathCard: game => {
            dispatch(rotateRemainingPathcardClockwise(game));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerCards);
