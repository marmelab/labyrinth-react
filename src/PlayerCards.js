import * as React from 'react';
import Tile from './Tile';

const PlayerCards = ({ remainingPathCard }) => (
    <div className="board">
        <div className="row">
            <div className="box" />
            <div className="box" />
            <div className="box" />
            <div className="box">
                <div className="remainingPathCard">
                    <Tile x={0} y={0} degrees={90 * remainingPathCard.direction} type={remainingPathCard.type} />
                </div>
            </div>
            <div className="box" />
            <div className="box" />
            <div className="box" />
        </div>
    </div>
);

export default PlayerCards;
