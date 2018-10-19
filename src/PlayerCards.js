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
                <Tile
                    degrees={90 * remainingPathCard.direction}
                    type={remainingPathCard.type}
                    target={remainingPathCard.target}
                />
            </div>
            <div className="box" />
            <div className="box" />
            <div className="box" />
        </div>
    </div>
);

export default PlayerCards;
