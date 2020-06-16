import io from 'socket.io-client';
import { getCookie } from '../../shared/cookie.service';
import { TOKEN_COOKIE } from '../constants/user.constant';

const socket = io.connect('http://localhost:8000', {
    query: { token: getCookie(TOKEN_COOKIE) },
});

socket.on('disconnect', () => {
    socket.removeAllListeners();
});

export {
    socket
}