import React from 'react';
import { connect } from 'react-redux';

import { rotateRemainingPathcardClockwise } from '../actions/index';
import Tile from './Tile';
import { isGameInInsertState, isGameInMoveState } from '../../src/common/game';
import { getCurrentTargetCard, getNumberOfRemainingTargetCard } from '../common/player';
import { treasures } from './assets';
import Player from './Player';

const PlayerCards = ({ game, onRotateRemainingPathCard }) =>
    game.remainingPathCard ? (
        <div className="board">
            <div className="row">
                <div className="box">
                    <div className="game-invite-current-player">
                        <Player playerIndex={game.currentPlayerIndex} />
                    </div>
                </div>
                <div className="box" />
                <div className="box" />
                <div className="box">
                    <Tile
                        degrees={90 * game.remainingPathCard.direction}
                        type={game.remainingPathCard.type}
                        target={game.remainingPathCard.target}
                        onClick={() => onRotateRemainingPathCard(game)}
                        isRemainingTile
                    />
                </div>
                <div className="box" />
                <div className="box" />
                <div className="box" />
            </div>

            <div className="game-state">
                {isGameInInsertState(game) && 'Please Insert the remaining path card'}
                {isGameInMoveState(game) && 'Please Move your pawn'}
            </div>

            <div className="player-score">Your score is: {game.scores[game.currentPlayerIndex]}</div>

            <div className="current-target">
                Current target: {treasures[getCurrentTargetCard(game.players[game.currentPlayerIndex]).target]}
            </div>

            <div className="remaining-targets">
                Number of remaining target cards:{' '}
                {getNumberOfRemainingTargetCard(game.players[game.currentPlayerIndex])}
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
