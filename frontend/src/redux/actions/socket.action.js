import { store } from '../store';
import io from 'socket.io-client';
import { getCookie } from '../../shared/cookie.service';
import { SOCKET_OPEN } from '../constants/socket.constant';
import { TOKEN_COOKIE } from '../constants/user.constant';

export function openSocket(cb, errCb) {
    store.dispatch((dispatch) => {
        let socket;
        try {
            socket = io.connect('http://localhost:8000', {
                query: { token: getCookie(TOKEN_COOKIE) },
            });
            dispatch({
                type: SOCKET_OPEN,
                data: socket,
            });
            cb && cb(socket);
        } catch (e) {
            errCb && errCb(e);
        }
    });
}
