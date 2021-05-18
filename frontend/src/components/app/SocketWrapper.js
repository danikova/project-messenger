import React, { useContext } from 'react';
import io from 'socket.io-client';
import { logoutUser } from '../../store/actions/user.action';
import { TOKEN_COOKIE } from '../../store/constants/user.constant';
import { getCookie } from '../../shared/cookie.service';
import { LoadingDialog } from '../shared/LoadingDialog';
import { API_COMMUNICATION_SOCKET_URL } from '../../routes';
import { injectIntl } from 'react-intl';
import { withSnackbar } from 'notistack';

const SocketContext = React.createContext();

export class SocketWrapper extends React.Component {
    state = {
        socket: null,
        connected: false,
        showLoadingDialog: false,
        loadingDialogInterval: null,
    };

    componentDidMount() {
        const socket = io.connect(window.location.origin, {
            query: { token: getCookie(TOKEN_COOKIE) },
            path: API_COMMUNICATION_SOCKET_URL,
        });

        socket.on('connect', () => {
            clearInterval(this.state.loadingDialogInterval);
            this.setState({
                connected: true,
                showLoadingDialog: false,
                loadingDialogInterval: null,
            });
        });

        const closeSocket = () => {
            socket.removeAllListeners();
            clearInterval(this.state.loadingDialogInterval);
            logoutUser();
            socket.disconnect();
        };

        socket.on('disconnect', closeSocket);
        socket.on('unauthorized', closeSocket);

        this.setState({
            socket,
            loadingDialogInterval: setInterval(() => {
                this.setState({ showLoadingDialog: true });
            }, 300),
        });
    }

    componentWillUnmount() {
        if (this.state.socket) this.state.socket.emit('disconnect');
    }

    render() {
        if (!this.state.connected) {
            if (this.state.showLoadingDialog) return <LoadingDialog />;
            return null;
        }

        return (
            <SocketContext.Provider value={{ socket: this.state.socket }}>
                {this.props.children}
            </SocketContext.Provider>
        );
    }
}

export default injectIntl(withSnackbar(SocketWrapper));

export function useSocket() {
    const context = useContext(SocketContext);
    return context.socket;
}

export function withSocket(Component) {
    const WrappedComponent = React.forwardRef((props, ref) => (
        <SocketContext.Consumer>
            {(context) => (
                <Component {...props} ref={ref} socket={context.socket} />
            )}
        </SocketContext.Consumer>
    ));

    return WrappedComponent;
}
