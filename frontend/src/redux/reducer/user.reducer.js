import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/user.action';

export function user(state = {}, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, ...action.data };
        case LOGIN_FAILURE:
            return {};
        default:
            return state;
    }
}
