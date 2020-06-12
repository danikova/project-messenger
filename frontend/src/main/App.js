import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import {
    reset,
    themes,
} from 'react95';

import { Grid } from '@material-ui/core';
import { ChatRoomsWindow } from './ChatRooms/ChatRoomsWindow';
import { FocusedChatRoomWindow } from './FocusedChatRoomWindow';

const ResetStyles = createGlobalStyle`
  ${reset}
`;

export default class MainView extends React.Component {
    render() {
        return (
            <div className='MainView'>
                <ResetStyles />
                <ThemeProvider theme={themes.default}>
                    <Grid container spacing={2} className={'max-height'}>
                        <Grid item xs={5} sm={4} md={3}>
                            <ChatRoomsWindow></ChatRoomsWindow>
                        </Grid>
                        <Grid item xs={7} sm={8} md={9}>
                            <FocusedChatRoomWindow></FocusedChatRoomWindow>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </div>
        );
    }
}
