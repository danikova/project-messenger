import React from 'react';
import { Cutout, TextArea, Button } from 'react95';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import {
    MaxHeightGrid,
    MaxSizeFlexWindow,
    FlexWindowHeader,
    FlexWindowContent,
} from '../../shared/components';
import { ChatRoomMessages } from './ChatRoomMessages';

const ContentWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const MessageCutout = styled(Cutout)`
    flex: 1 0;
    margin-bottom: 20px;
    padding-top: 10px;
`;

const InputField = styled.div`
    flex: 0 0;
`;

const SendButton = styled(Button)`
    height: 100%;
    width: 100%;
`;

export class FocusedChatRoomWindow extends React.Component {
    render() {
        return (
            <MaxSizeFlexWindow>
                <FlexWindowHeader>
                    <span>focusedChatRoom.exe</span>
                </FlexWindowHeader>
                <FlexWindowContent>
                    <ContentWrapper>
                        <ChatRoomMessages></ChatRoomMessages>
                        <InputField>
                            <MaxHeightGrid container>
                                <Grid item xs={10} md={11}>
                                    <TextArea placeholder='Type in here..' />
                                </Grid>
                                <Grid item xs={2} md={1}>
                                    <SendButton>send</SendButton>
                                </Grid>
                            </MaxHeightGrid>
                        </InputField>
                    </ContentWrapper>
                </FlexWindowContent>
            </MaxSizeFlexWindow>
        );
    }
}
