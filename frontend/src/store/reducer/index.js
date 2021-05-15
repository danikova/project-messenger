import { combineReducers } from 'redux';
import { user } from './user.reducer';
import { users } from './users.reducer';
import { rooms } from './room.reducer';
import { settings } from './settings.reducer';

const rootReducer = combineReducers({
    user,
    users,
    rooms,
    settings,
});

export default rootReducer;
