import Axios from 'axios';
import { store } from '../store';
import { setCookie, eraseCookie } from '../../shared/cookie.service';
import {
    LOGIN_REQUEST,
    TOKEN_COOKIE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../constants/user.constant';

export function loginWithCredentials(username, password, cb, errCb) {
    store.dispatch((dispatch) => {
        dispatch({
            type: LOGIN_REQUEST,
        });
        const request = Axios({
            method: 'post',
            url: '/auth/sign-in',
            data: {
                username,
                password,
            },
        });
        request.then(
            (response) => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    data: { ...response.data },
                });
                setCookie(TOKEN_COOKIE, response.data.token);
                cb && cb(response);
            },
            (error) => {
                dispatch({
                    type: LOGIN_FAILURE,
                    error: { ...error },
                });
                eraseCookie(TOKEN_COOKIE);
                errCb && errCb(error);
            },
        );
    });
}
