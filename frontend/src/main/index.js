import React from 'react';
import styled from 'styled-components';

import { Grid } from '@material-ui/core';
import ChatRoomsWindow from './ChatRooms/ChatRoomsWindow';
import FocusedChatRoomWindow from './FocusedChatRoom/FocusedChatRoomWindow';
import { MaxHeightGrid } from '../shared/components';
import { readRoomList, pushMessage } from '../redux/actions/room.action';
import { socket } from '../redux/actions/socket.action';
import { getSelfInfo } from '../redux/actions/user.action';

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

    componentDidMount() {
        getSelfInfo(() => {
            readRoomList();
        });
        socket.on('newMessage', this.onNewMessage);
    }

    componentWillUnmount() {
        socket.off('newMessage', this.onNewMessage);
    }

    render() {
        return (
            <MainViewWrapper>
                <MaxHeightGrid container spacing={2}>
                    <Grid item xs={5} sm={4} md={3}>
                        <ChatRoomsWindow></ChatRoomsWindow>
                    </Grid>
                    <Grid item xs={7} sm={8} md={9}>
                        <FocusedChatRoomWindow></FocusedChatRoomWindow>
                    </Grid>
                </MaxHeightGrid>
            </MainViewWrapper>
        );
    }
}
