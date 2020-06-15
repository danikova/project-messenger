import {
    ROOM_READ_SUCCESS,
    ROOM_READ_FAILURE,
    ROOM_DETAILS_SUCCESS,
    PUSH_NEW_MESSAGE,
    PUSH_NEW_ACTIVE_MESSAGE,
} from '../constants/room.constant';
import { uuid } from 'uuidv4';

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
                rooms: [],
            };
        case ROOM_DETAILS_SUCCESS:
            return {
                ...state,
                activeRoom: action.data,
            };
        case PUSH_NEW_ACTIVE_MESSAGE:
            state = { ...state };
            if (!state.activeRoom) return state;
            action.roomId = state.activeRoom._id;
            action.message._id = uuid();
            state.activeRoom.messages.push(action.message);
            /* falls through */
        case PUSH_NEW_MESSAGE:
            state = { ...state };
            state.rooms = state.rooms.map((it) => {
                if (it._id === action.roomId)
                    return { ...it, messages: [{ ...action.message }] };
                return it;
            });
            return { ...state };
        default:
            return state;
    }
}
