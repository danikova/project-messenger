import React, { useContext } from 'react';
import io from 'socket.io-client';
import { TOKEN_COOKIE } from '../../redux/constants/user.constant';
import { getCookie } from '../../shared/cookie.service';
import { LoadingDialog } from '../shared/LoadingDialog';

const SocketContext = React.createContext();

export default class SocketWrapper extends React.Component {
    state = {
        socket: null,
        connected: false,
        showLoadingDialog: false,
        loadingDialogInterval: null,
    };

    componentDidMount() {
        const socket = io.connect(window.location.origin, {
            query: { token: getCookie(TOKEN_COOKIE) },
            path: '/comm/socket',
        });

        socket.on('disconnect', () => {
            socket.removeAllListeners();
            this.setState({ socket: null, connected: false });
        });

        socket.on('connect', () => {
            clearInterval(this.state.loadingDialogInterval);
            this.setState({ connected: true, showLoadingDialog: false });
        });

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
