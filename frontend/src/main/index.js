import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { reset, themes } from 'react95';

import { Grid } from '@material-ui/core';
import ChatRoomsWindow from './ChatRooms/ChatRoomsWindow';
import FocusedChatRoomWindow from './FocusedChatRoom/FocusedChatRoomWindow';
import { MaxHeightGrid } from '../shared/components';
import { loginWithCredentials } from '../redux/actions/user.action';
import { readRoomList, openRoom } from '../redux/actions/room.action';
import { socket } from '../redux/actions/socket.action';

const MainViewWrapper = styled.div`
    padding: 20px;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    margin: 0;
`;

const ResetStyles = createGlobalStyle`
  ${reset}
`;

export default class MainView extends React.Component {
    onNewMessage = (data)=>{
        console.log(data);
    }

    componentDidMount() {
        loginWithCredentials('danikova', 'password123', (response) => {
            readRoomList();
            if (response.data.openChatRoom)
                openRoom(response.data.openChatRoom);
        });

        socket.on('newMessage', this.onNewMessage);
    }

    componentWillUnmount(){
        socket.off('newMessage', this.onNewMessage);
    }

    render() {
        return (
            <MainViewWrapper>
                <ResetStyles />
                <ThemeProvider theme={themes.default}>
                    <MaxHeightGrid container spacing={2}>
                        <Grid item xs={5} sm={4} md={3}>
                            <ChatRoomsWindow></ChatRoomsWindow>
                        </Grid>
                        <Grid item xs={7} sm={8} md={9}>
                            <FocusedChatRoomWindow></FocusedChatRoomWindow>
                        </Grid>
                    </MaxHeightGrid>
                </ThemeProvider>
            </MainViewWrapper>
        );
    }
}
