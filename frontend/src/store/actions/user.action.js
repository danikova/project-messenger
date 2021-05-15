import Axios from 'axios';
import { store } from '..';
import { API_USER_DETAIL_URL, API_USER_SELF_URL } from '../../routes';
import { setCookie, eraseCookie, getCookie } from '../../shared/cookie.service';
import {
    LOGIN_REQUEST,
    TOKEN_COOKIE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    FORGET_USER,
    GET_SELF_SUCCESS,
    UPDATE_SELF_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_SELF_REQUEST,
    GET_SELF_FAILURE,
    UPDATE_SELF_REQUEST,
    UPDATE_SELF_FAILURE,
} from '../constants/user.constant';
import { openRoom } from './room.action';
import UrlTemplate from 'url-template';

export function loginUser(data, url, cb, errCb) {
    store.dispatch((dispatch) => {
        dispatch({
            type: LOGIN_REQUEST,
        });
        const request = Axios({
            method: 'post',
            url: url,
            data: data,
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

export function getSelf(cb, errCb) {
    store.dispatch((dispatch) => {
        dispatch({
            type: GET_SELF_REQUEST,
        });
        const request = Axios({
            method: 'get',
            url: API_USER_SELF_URL,
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
                dispatch({
                    type: GET_USER_SUCCESS,
                    data: { ...response.data },
                });
                if (response.data.openChatroom)
                    openRoom(response.data.openChatroom);
                cb && cb(response);
            },
            (error) => {
                dispatch({
                    type: GET_SELF_FAILURE,
                    error: { ...error },
                });
                errCb && errCb(error);
            },
        );
    });
}

export function updateSelf(data, cb, errCb) {
    store.dispatch((dispatch) => {
        dispatch({
            type: UPDATE_SELF_REQUEST,
        });
        const request = Axios({
            method: 'put',
            url: API_USER_SELF_URL,
            headers: {
                'x-access-token': getCookie(TOKEN_COOKIE),
            },
            data,
        });
        request.then(
            (response) => {
                dispatch({
                    type: UPDATE_SELF_SUCCESS,
                    data: { ...response.data },
                });
                cb && cb(response);
            },
            (error) => {
                dispatch({
                    type: UPDATE_SELF_FAILURE,
                    error: { ...error },
                });
                errCb && errCb(error);
            },
        );
    });
}

export function getUserInfo(userId, cb, errCb) {
    store.dispatch((dispatch) => {
        dispatch({
            type: GET_USER_REQUEST,
        });
        const request = Axios({
            method: 'get',
            url: UrlTemplate.parse(API_USER_DETAIL_URL).expand({ userId }),
            headers: {
                'x-access-token': getCookie(TOKEN_COOKIE),
            },
        });
        request.then(
            (response) => {
                dispatch({
                    type: GET_USER_SUCCESS,
                    data: { ...response.data },
                });
                if (response.data.openChatroom)
                    openRoom(response.data.openChatroom);
                cb && cb(response);
            },
            (error) => {
                dispatch({
                    type: GET_USER_FAILURE,
                    error: { ...error },
                });
                errCb && errCb(error);
            },
        );
    });
}

export function logoutUser() {
    store.dispatch((dispatch) => {
        dispatch({
            type: FORGET_USER,
        });
    });
}
