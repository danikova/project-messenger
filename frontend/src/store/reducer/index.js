import { combineReducers } from 'redux';
import { user } from './user.reducer';
import { users } from './users.reducer';
import { rooms } from './room.reducer';

const rootReducer = combineReducers({
    user,
    users,
    rooms
});

export default rootReducer;
