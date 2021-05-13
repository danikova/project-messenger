import Axios from 'axios';
import { store } from '..';
import {
    ROOM_READ_REQUEST,
    ROOM_READ_SUCCESS,
    ROOM_READ_FAILURE,
    ROOM_DETAILS_REQUEST,
    ROOM_DETAILS_SUCCESS,
    ROOM_DETAILS_FAILURE,
    PUSH_NEW_MESSAGE,
    CREATE_NEW_ROOM_REQUEST,
    LEAVE_ROOM_REQUEST,
    ADD_USER_TO_ROOM_REQUEST,
    ROOM_MORE_MESSAGE_REQUEST,
    ROOM_MORE_MESSAGE_SUCCESS,
    ROOM_MORE_MESSAGE_FAILURE,
} from '../constants/room.constant';
import { TOKEN_COOKIE } from '../constants/user.constant';
import { getCookie } from '../../shared/cookie.service';
import { v4 as uuid } from 'uuid';
import { updateSelf } from './user.action';

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
    updateSelf({ openChatroom: id });
    store.dispatch((dispatch) => {
        dispatch({
            type: ROOM_DETAILS_REQUEST,
        });
        const request = Axios({
            method: 'get',
            url: `/api/rooms/${id}`,
            headers: {
                'x-access-token': getCookie(TOKEN_COOKIE),
            },
        });
        request.then(
            (response) => {
                dispatch({
                    type: ROOM_DETAILS_SUCCESS,
                    data: { ...response.data },
                });
                cb && cb(response);
            },
            (error) => {
                dispatch({
                    type: ROOM_DETAILS_FAILURE,
                    error: { ...error },
                });
                errCb && errCb(error);
            },
        );
    });
}

export function pushMessage(id, message) {
    store.dispatch((dispatch) => {
        dispatch({
            type: PUSH_NEW_MESSAGE,
            roomId: id,
            message,
        });
    });
}

export function loadOlderMessages(id, number, cb, errCb) {
    store.dispatch((dispatch) => {
        dispatch({
            type: ROOM_MORE_MESSAGE_REQUEST,
        });
        const request = Axios({
            method: 'post',
            url: `/api/rooms/${id}/messages-from`,
            headers: {
                'x-access-token': getCookie(TOKEN_COOKIE),
            },
            data: {
                number,
            },
        });
        request.then(
            (response) => {
                dispatch({
                    type: ROOM_MORE_MESSAGE_SUCCESS,
                    data: response.data,
                });
                cb && cb(response);
            },
            (error) => {
                dispatch({
                    type: ROOM_MORE_MESSAGE_FAILURE,
                    error: { ...error },
                });
                errCb && errCb(error);
            },
        );
    });
}

export function pushActiveMessage(messageString) {
    store.dispatch((dispatch, getState) => {
        const { user, rooms } = getState();
        const { activeRoom } = rooms;
        if (activeRoom) {
            const message = {
                userId: user.data._id,
                message: messageString,
                sent: new Date().toISOString(),
                _id: `temp-${uuid()}`,
            };
            dispatch({
                type: PUSH_NEW_MESSAGE,
                roomId: activeRoom._id,
                message,
            });
        }
    });
}

export function createNewRow(roomName, cb, errCb) {
    store.dispatch((dispatch) => {
        dispatch({
            type: CREATE_NEW_ROOM_REQUEST,
        });
        const request = Axios({
            method: 'post',
            url: '/api/rooms',
            headers: {
                'x-access-token': getCookie(TOKEN_COOKIE),
            },
            data: {
                name: roomName,
            },
        });
        request.then(
            (response) => {
                readRoomList();
                cb && cb(response);
            },
            (error) => {
                errCb && errCb(error);
            },
        );
    });
}

export function addUserToRoom(roomId, username, cb, errCb) {
    store.dispatch((dispatch, getState) => {
        const { rooms } = getState();
        const { activeRoom } = rooms;
        dispatch({
            type: ADD_USER_TO_ROOM_REQUEST,
        });
        const request = Axios({
            method: 'post',
            url: `/api/rooms/${roomId}/add-user/`,
            headers: {
                'x-access-token': getCookie(TOKEN_COOKIE),
            },
            data: {
                username,
            },
        });
        request.then(
            (response) => {
                if (roomId === activeRoom._id) openRoom(roomId);
                cb && cb(response);
            },
            (error) => {
                errCb && errCb(error);
            },
        );
    });
}

export function leaveRoom(roomId, cb, errCb) {
    store.dispatch((dispatch) => {
        dispatch({
            type: LEAVE_ROOM_REQUEST,
        });
        const request = Axios({
            method: 'post',
            url: `/api/rooms/${roomId}/remove-self/`,
            headers: {
                'x-access-token': getCookie(TOKEN_COOKIE),
            },
        });
        request.then(
            (response) => {
                readRoomList();
                dispatch({
                    type: ROOM_DETAILS_SUCCESS,
                    data: {},
                });
                cb && cb(response);
            },
            (error) => {
                errCb && errCb(error);
            },
        );
    });
}
