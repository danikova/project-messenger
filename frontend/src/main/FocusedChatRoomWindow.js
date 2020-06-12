import React from 'react';
import {
    Window,
    WindowHeader,
    WindowContent,
    Cutout,
    TextArea,
    Button,
} from 'react95';
import { Grid } from '@material-ui/core';
export class FocusedChatRoomWindow extends React.Component {
    render() {
        return (
            <Window className={'focused-chat-room window'}>
                <WindowHeader className={'windowHeader'}>
                    <span>focusedChatRoom.exe</span>
                </WindowHeader>
                <WindowContent className={'windowContent'}>
                    <div className={'content-wrapper'}>
                        <Cutout className={'text-field'}></Cutout>
                        <div className={'response-field'}>
                            <Grid container className={'max-height'}>
                                <Grid item xs={10} md={11}>
                                    <TextArea placeholder='Type in here..' />
                                </Grid>
                                <Grid item xs={2} md={1}>
                                    <Button
                                        fullWidth
                                        size='lg'
                                        className='send-button'
                                    >
                                        send
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </WindowContent>
            </Window>
        );
    }
}
