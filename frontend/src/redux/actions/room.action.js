import Axios from 'axios';
import { store } from '../store';
import {
    ROOM_READ_REQUEST,
    ROOM_READ_SUCCESS,
    ROOM_READ_FAILURE,
    ROOM_DETAILS_REQUEST,
    ROOM_DETAILS_SUCCESS,
    ROOM_DETAILS_FAILURE,
    PUSH_NEW_MESSAGE,
    PUSH_NEW_ACTIVE_MESSAGE,
} from '../constants/room.constant';
import { TOKEN_COOKIE, UPDATE_SUCCESS } from '../constants/user.constant';
import { getCookie } from '../../shared/cookie.service';

export function readRoomList(cb, errCb) {
    store.dispatch((dispatch) => {
        dispatch({
            type: ROOM_READ_REQUEST,
        });
        const request = Axios({
            method: 'get',
            url: '/api/rooms',
            headers: {
                'x-access-token': getCookie(TOKEN_COOKIE),
            },
        });
        request.then(
            (response) => {
                dispatch({
                    type: ROOM_READ_SUCCESS,
                    data: [...response.data],
                });
                cb && cb(response);
            },
            (error) => {
                dispatch({
                    type: ROOM_READ_FAILURE,
                    error: { ...error },
                });
                errCb && errCb(error);
            },
        );
    });
}

export function openRoom(id, cb, errCb) {
    store.dispatch((dispatch) => {
        dispatch({
            type: ROOM_DETAILS_REQUEST,
        });
        const getRoomDetail = Axios({
            method: 'get',
            url: `/api/rooms/${id}`,
            headers: {
                'x-access-token': getCookie(TOKEN_COOKIE),
            },
        });
        const updateUser = Axios({
            method: 'put',
            url: '/api/users',
            data: {
                openChatRoom: id,
            },
            headers: {
                'x-access-token': getCookie(TOKEN_COOKIE),
            },
        });
        Promise.all([getRoomDetail, updateUser]).then(
            (responses) => {
                const room = responses[0];
                dispatch({
                    type: ROOM_DETAILS_SUCCESS,
                    data: { ...room.data },
                });
                dispatch({
                    type: UPDATE_SUCCESS,
                    data: { openChatRoom: id },
                });
                cb && cb(responses);
            },
            (errors) => {
                const roomError = errors[0];
                dispatch({
                    type: ROOM_DETAILS_FAILURE,
                    error: { ...roomError },
                });
                errCb && errCb(errors);
            },
        );
    });
}

export function pushMessage(id, message) {
    store.dispatch((dispatch, getState) => {
        const { user } = getState();
        dispatch({
            type: PUSH_NEW_MESSAGE,
            roomId: id,
            message: {
                user: { ...user },
                message: message,
            },
        });
    });
}

export function pushActiveMessage(message) {
    store.dispatch((dispatch, getState) => {
        const { user, rooms } = getState();
        const { activeRoom } = rooms;
        message = {
            user: { ...user },
            message: message,
        };
        if (activeRoom) {
            dispatch({
                type: PUSH_NEW_ACTIVE_MESSAGE,
                message
            });
        }
    });
}
