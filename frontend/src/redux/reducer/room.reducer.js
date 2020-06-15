import {
    ROOM_READ_SUCCESS,
    ROOM_READ_FAILURE,
    ROOM_DETAILS_SUCCESS,
} from '../constants/room.constant';

export function rooms(
    state = {
        activeRoom: null,
        rooms: [],
    },
    action,
) {
    switch (action.type) {
        case ROOM_READ_SUCCESS:
            return {
                ...state,
                rooms: action.data,
            };
        case ROOM_READ_FAILURE:
            return {
                ...state,
                activeRoom: null,
                rooms: []
            };
        case ROOM_DETAILS_SUCCESS:
            return {
                ...state,
                activeRoom: action.data,
            };
        default:
            return state;
    }
}
