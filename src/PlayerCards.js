import * as React from 'react';
import Tile from './Tile';
import { treasures } from './App';

const PlayerCards = ({ remainingPathCard }) => (
    <div className="board">
        <div className="row">
            <div className="box" />
            <div className="box" />
            <div className="box" />
            <div className="box">
                <div className="centered-content remainingPathCard">
                    <Tile x={0} y={0} degrees={90 * remainingPathCard.direction} type={remainingPathCard.type} />
                </div>

                {remainingPathCard.target != null && (
                    <div className="centered-content treasure">{treasures[remainingPathCard.target]}</div>
                )}
            </div>
            <div className="box" />
            <div className="box" />
            <div className="box" />
        </div>
    </div>
);

export default PlayerCards;
