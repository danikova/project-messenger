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
import {
    API_ROOMS_URL,
    API_ROOM_DETAIL_URL,
    API_ROOM_DETAIL_ADD_USER_URL,
    API_ROOM_DETAIL_MESSAGE_FROM_URL,
    API_ROOM_DETAIL_REMOVE_SELF_URL,
} from '../../routes';
import UrlTemplate from 'url-template';

export function readRoomList(cb, errCb) {
    store.dispatch((dispatch) => {
        dispatch({
            type: ROOM_READ_REQUEST,
        });
        const request = Axios({
            method: 'get',
            url: API_ROOMS_URL,
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

export function getRoomDetail(roomId, cb, errCb) {
    updateSelf({ openChatroom: roomId });
    store.dispatch((dispatch) => {
        dispatch({
            type: ROOM_DETAILS_REQUEST,
        });
        const request = Axios({
            method: 'get',
            url: UrlTemplate.parse(API_ROOM_DETAIL_URL).expand({ roomId }),
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

export function loadOlderMessages(roomId, number, cb, errCb) {
    store.dispatch((dispatch) => {
        dispatch({
            type: ROOM_MORE_MESSAGE_REQUEST,
        });
        const request = Axios({
            method: 'post',
            url: UrlTemplate.parse(API_ROOM_DETAIL_MESSAGE_FROM_URL).expand({
                roomId,
            }),
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
            url: API_ROOMS_URL,
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
    store.dispatch((dispatch) => {
        dispatch({
            type: ADD_USER_TO_ROOM_REQUEST,
        });
        const request = Axios({
            method: 'post',
            url: UrlTemplate.parse(API_ROOM_DETAIL_ADD_USER_URL).expand({
                roomId,
            }),
            headers: {
                'x-access-token': getCookie(TOKEN_COOKIE),
            },
            data: {
                username,
            },
        });
        request.then(
            (response) => {
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
            url: UrlTemplate.parse(API_ROOM_DETAIL_REMOVE_SELF_URL).expand({
                roomId,
            }),
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
