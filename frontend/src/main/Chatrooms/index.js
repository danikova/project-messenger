import React from 'react';
import { AppWrapperGrid } from '../../shared/components';
import { Grid } from '@material-ui/core';
import ChatroomsWindow from './ChatroomsWindow';
import FocusedChatroomWindow from './FocusedChatroom/FocusedChatroomWindow';
import { openRoom, pushMessage, readRoomList } from '../../redux/actions/room.action';
import { store } from '../../redux/store';
import { getSelfInfo } from '../../redux/actions/user.action';
import { socket } from '../../redux/actions/socket.action';

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
        getSelfInfo(() => {
            readRoomList();
        });
        socket.on('newMessage', this.onNewMessage);
        socket.on('refreshRoom', this.onRefreshRoom);
    }

    componentWillUnmount() {
        socket.off('newMessage', this.onNewMessage);
        socket.off('refreshRoom', this.onRefreshRoom);
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

export default Chatrooms;
