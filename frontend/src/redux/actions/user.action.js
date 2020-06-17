import Axios from 'axios';
import { store } from '../store';
import { setCookie, eraseCookie, getCookie } from '../../shared/cookie.service';
import {
    LOGIN_REQUEST,
    TOKEN_COOKIE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    FORGET_USER,
    GET_SELF_SUCCESS
} from '../constants/user.constant';
import { openRoom } from './room.action';

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
                    token: response.data.token,
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

export function getSelfInfo(cb, errCb) {
    store.dispatch((dispatch) => {
        const request = Axios({
            method: 'get',
            url: '/api/users/get-self',
            headers: {
                'x-access-token': getCookie(TOKEN_COOKIE),
            },
        });
        request.then(
            (response) => {
                dispatch({
                    type: GET_SELF_SUCCESS,
                    data: { ...response.data },
                });
                if (response.data.openChatRoom)
                    openRoom(response.data.openChatRoom);
                cb && cb(response);
            },
            (error) => {
                errCb && errCb(error);
            },
        );
    });
}

export function forgetUser() {
    store.dispatch((dispatch) => {
        dispatch({
            type: FORGET_USER,
        });
    });
}
