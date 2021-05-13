import io from 'socket.io-client';
import { getCookie } from '../../shared/cookie.service';
import { TOKEN_COOKIE } from '../constants/user.constant';

const socket = io.connect(window.location.origin, {
    query: { token: getCookie(TOKEN_COOKIE) },
    path: '/comm/socket',
});

socket.on('disconnect', () => {
    socket.removeAllListeners();
});

export { socket };
