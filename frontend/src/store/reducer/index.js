import { combineReducers } from 'redux';
import { user } from './user.reducer';
import { users } from './users.reducer';
import { rooms } from './room.reducer';
import { settings } from './settings.reducer';
import { notifications } from './notifications.reducer';

const rootReducer = combineReducers({
    user,
    users,
    rooms,
    settings,
    notifications
});

export default rootReducer;
