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
    CREATE_NEW_ROOM_REQUEST,
    LEAVE_ROOM_REQUEST,
    ADD_USER_TO_ROOM_REQUEST,
} from '../constants/room.constant';
import { TOKEN_COOKIE, UPDATE_SUCCESS } from '../constants/user.constant';
import { getCookie } from '../../shared/cookie.service';
import { uuid } from 'uuidv4';
import { socket } from "./socket.action";

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
        dispatch({
            type: PUSH_NEW_MESSAGE,
            roomId: id,
            message,
        });
    });
}

export function pushActiveMessage(messageString) {
    store.dispatch((dispatch, getState) => {
        const { user, rooms } = getState();
        const { activeRoom } = rooms;
        if (activeRoom) {
            const message = {
                user: user.data,
                message: messageString,
                sent: new Date().toISOString(),
                _id: uuid(),
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
                socket.emit('joinRoom', { roomId: response.data._id });
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
                socket.emit('leaveRoom', { roomId });
                cb && cb(response);
            },
            (error) => {
                errCb && errCb(error);
            },
        );
    });
}
