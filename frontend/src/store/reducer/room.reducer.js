import {
    ROOM_READ_SUCCESS,
    ROOM_READ_FAILURE,
    ROOM_DETAILS_SUCCESS,
    PUSH_NEW_MESSAGE_SUCCESS,
    ROOM_MORE_MESSAGE_SUCCESS,
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
                rooms: [],
            };
        case ROOM_DETAILS_SUCCESS:
            const keysLength = Object.keys(action.data).length;
            return {
                ...state,
                activeRoom: keysLength !== 0 ? action.data : null,
            };
        case ROOM_MORE_MESSAGE_SUCCESS:
            if (state.activeRoom._id === action.data._id)
                return {
                    ...state,
                    activeRoom: {
                        ...state.activeRoom,
                        messages: [
                            ...action.data.messages,
                            ...state.activeRoom.messages,
                        ],
                    },
                };
            return { ...state };
        case PUSH_NEW_MESSAGE_SUCCESS:
            state = { ...state };
            if (state.activeRoom && state.activeRoom._id === action.roomId)
                state.activeRoom.messages.push({
                    ...action.message,
                });
            state.rooms = state.rooms.map((it) => {
                if (it._id === action.roomId)
                    return { ...it, messages: [{ ...action.message }] };
                return it;
            });
            state.rooms.sort(function (a, b) {
                const aDate =
                    (a.messages[0] && a.messages[0].sent) || a.updatedAt;
                const bDate =
                    (b.messages[0] && b.messages[0].sent) || b.updatedAt;
                return new Date(bDate) - new Date(aDate);
            });
            return { ...state };
        default:
            return state;
    }
}
