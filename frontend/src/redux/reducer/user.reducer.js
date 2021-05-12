import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    FORGET_USER,
    GET_SELF_SUCCESS,
    TOKEN_COOKIE,
    UPDATE_SELF_SUCCESS,
} from '../constants/user.constant';
import { getCookie } from '../../shared/cookie.service';

export function user(
    state = {
        data: {},
        token: getCookie(TOKEN_COOKIE),
    },
    action,
) {
    switch (action.type) {
        case GET_SELF_SUCCESS:
            return {
                ...state,
                data: { ...action.data },
            };
        case UPDATE_SELF_SUCCESS:
            return {
                ...state,
                data: { ...(state.data || {}), ...action.data },
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.token,
            };
        case LOGIN_FAILURE:
        case FORGET_USER:
            return {
                data: {},
                token: null,
            };
        default:
            return state;
    }
}
