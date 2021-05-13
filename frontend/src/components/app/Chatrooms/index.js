import React from 'react';
import { AppWrapperGrid } from '../../shared/styled-components';
import { Grid } from '@material-ui/core';
import ChatroomsWindow from './ChatroomsWindow';
import FocusedChatroomWindow from './FocusedChatroom/FocusedChatroomWindow';
import { openRoom, pushMessage, readRoomList } from '../../../redux/actions/room.action';
import { store } from '../../../redux/store';
import { getSelf } from '../../../redux/actions/user.action';
import { withSocket } from '../SocketWrapper';

export class Chatrooms extends React.Component {
    onNewMessage = (data) => {
        const { roomId, message } = data;
        pushMessage(roomId, message);
    };

    onRefreshRoom = (data) => {
        const { roomId } = data;
        const { rooms } = store.getState();
        readRoomList();
        if (rooms.activeRoom && rooms.activeRoom._id === roomId) {
            openRoom(roomId);
        }
    };

    componentDidMount() {
        getSelf(() => {
            readRoomList();
        });
        this.props.socket.on('newMessage', this.onNewMessage);
        this.props.socket.on('refreshRoom', this.onRefreshRoom);
    }

    componentWillUnmount() {
        this.props.socket.off('newMessage', this.onNewMessage);
        this.props.socket.off('refreshRoom', this.onRefreshRoom);
    }

    render() {
        return (
            <AppWrapperGrid container spacing={2}>
                <Grid item xs={5} sm={4} md={3}>
                    <ChatroomsWindow></ChatroomsWindow>
                </Grid>
                <Grid item xs={7} sm={8} md={9}>
                    <FocusedChatroomWindow></FocusedChatroomWindow>
                </Grid>
            </AppWrapperGrid>
        );
    }
}

export default withSocket(Chatrooms);
