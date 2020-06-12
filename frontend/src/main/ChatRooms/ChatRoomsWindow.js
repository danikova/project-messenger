import React from 'react';
import { Window, WindowHeader, WindowContent, List } from 'react95';
import { ChatRoom } from './ChatRoom';

import styled from 'styled-components';

const FullHeightList = styled(List)`
    height: 100%;
    overflow-y: auto;
`;

export class ChatRoomsWindow extends React.Component {
    render() {
        const chatRoomProps = {
            name: 'danikova and lofasz',
            color: '#249',
            lastMessage: {
                user: 'danikova',
                message:
                    'asd asd asd a sd  asegfas df as d f asd f as df as d f',
            },
        };

        return (
            <Window className={'chat-rooms window'}>
                <WindowHeader className={'windowHeader'}>
                    <span>chatRooms.exe</span>
                </WindowHeader>
                <WindowContent className={'windowContent'}>
                    <FullHeightList fullWidth>
                        <ChatRoom active {...chatRoomProps}></ChatRoom>
                        <ChatRoom {...chatRoomProps}></ChatRoom>
                        <ChatRoom {...chatRoomProps}></ChatRoom>
                        <ChatRoom {...chatRoomProps}></ChatRoom>
                    </FullHeightList>
                </WindowContent>
            </Window>
        );
    }
}
