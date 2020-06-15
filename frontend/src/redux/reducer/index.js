import { combineReducers } from 'redux';
import { user } from './user.reducer';
import { rooms } from './room.reducer';
import { socket } from './socket.reducer';

const rootReducer = combineReducers({
    user,
    rooms,
    socket,
});

export default rootReducer;
