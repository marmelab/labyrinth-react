import { combineReducers } from 'redux';
import games from './gameReducer';

export default combineReducers({
    games: games,
});
