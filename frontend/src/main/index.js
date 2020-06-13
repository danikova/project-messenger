import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { reset, themes } from 'react95';

import { Grid } from '@material-ui/core';
import { ChatRoomsWindow } from './ChatRooms/ChatRoomsWindow';
import { FocusedChatRoomWindow } from './FocusedChatRoomWindow';
import { MaxHeightGrid } from '../shared/components';

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
