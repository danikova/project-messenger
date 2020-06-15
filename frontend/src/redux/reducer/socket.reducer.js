import { SOCKET_OPEN } from '../constants/socket.constant';

export function socket(state = null, action) {
    switch (action.type) {
        case SOCKET_OPEN:
            return action.data;
        default:
            return state;
    }
}
