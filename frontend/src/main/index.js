import React from 'react';
import styled from 'styled-components';

import { Grid } from '@material-ui/core';
import ChatRoomsWindow from './ChatRooms/ChatRoomsWindow';
import FocusedChatRoomWindow from './FocusedChatRoom/FocusedChatRoomWindow';
import { AppWrapperGrid } from '../shared/components';
import {
    readRoomList,
    pushMessage,
    openRoom,
} from '../redux/actions/room.action';
import { socket } from '../redux/actions/socket.action';
import { getSelfInfo } from '../redux/actions/user.action';
import { store } from '../redux/store';
import AppBar from './AppBar';

const MainViewWrapper = styled.div`
    padding: 20px;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    margin: 0;
`;

export default class MainView extends React.Component {
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
            <MainViewWrapper>
                <AppBar />
                <AppWrapperGrid container spacing={2}>
                    <Grid item xs={5} sm={4} md={3}>
                        <ChatRoomsWindow></ChatRoomsWindow>
                    </Grid>
                    <Grid item xs={7} sm={8} md={9}>
                        <FocusedChatRoomWindow></FocusedChatRoomWindow>
                    </Grid>
                </AppWrapperGrid>
            </MainViewWrapper>
        );
    }
}
