import React from 'react';
import { Fieldset, Avatar } from 'react95';
import styled from 'styled-components';
import { MessageCutout } from './FocusedChatRoomWindow';

const ChatLineWrapper = styled.div`
    display: flex;
    padding: 5px 0 0 5px;
    ${(props) => (props.currentUser ? 'flex-direction: row-reverse;' : '')}
`;

const ChatAvatarWrapper = styled.div`
    flex: 0 0 40px;
    padding-top: 10px;
`;

const ChatAvatar = styled(Avatar)`
    margin: auto;
`;

const LineContent = styled(Fieldset)`
    margin: ${(props) => (props.label ? '10px' : '0')} 0 0 0;
    min-width: 70px;
    max-width: 70%;
    padding: 7px;
    display: inline-table;
    line-height: 16px;
`;

export class ChatRoomMessages extends React.Component {
    render() {
        return (
            <MessageCutout>
                <ChatLineWrapper currentUser>
                    <ChatAvatarWrapper>
                        <ChatAvatar
                            style={{
                                background: '#249',
                            }}
                        >
                            DA
                        </ChatAvatar>
                    </ChatAvatarWrapper>
                    <LineContent label='danikova'>
                        asdasda ds asd a sd a sd a sd asdasda ds asd a sd a sd a
                        sd asdasda ds asd a sd a sd a sd asdasda ds asd a sd a
                        sd a sd asdasda ds asd a sd a sd a sd asdasda ds asd a
                        sd a sd a sd asdasda ds asd a sd a sd a sd asdasda ds
                        asd a sd a sd a sd asdasda ds asd a sd a sd a sd asdasda
                        ds asd a sd a sd a sd asdasda ds asd a sd a sd a sd
                        asdasda ds asd a sd a sd a sd asdasda ds asd a sd a sd a
                        sd asdasda ds asd a sd a sd a sd asdasda ds asd a sd a
                        sd a sd asdasda ds asd a sd a sd a sd asdasda ds asd a
                        sd a sd a sd
                    </LineContent>
                </ChatLineWrapper>
                <ChatLineWrapper>
                    <ChatAvatarWrapper>
                        <Avatar
                            style={{
                                background: '#249',
                            }}
                        >
                            DA
                        </Avatar>
                    </ChatAvatarWrapper>
                    <LineContent label='danikova'>
                        asdasda ds asd a sd a sd a sd asdasda ds asd a sd a sd a
                        sd asdasda ds asd a sd a sd a sd asdasda ds asd a sd a
                        sd a sd asdasda ds asd a sd a sd a sd asdasda ds asd a
                        sd a sd a sd asdasda ds asd a sd a sd a sd asdasda ds
                        asd a sd a sd a sd asdasda ds asd a sd a sd a sd asdasda
                        ds asd a sd a sd a sd asdasda ds asd a sd a sd a sd
                        asdasda ds asd a sd a sd a sd asdasda ds asd a sd a sd a
                        sd asdasda ds asd a sd a sd a sd asdasda ds asd a sd a
                        sd a sd asdasda ds asd a sd a sd a sd asdasda ds asd a
                        sd a sd a sd
                    </LineContent>
                </ChatLineWrapper>
                <ChatLineWrapper>
                    <ChatAvatarWrapper></ChatAvatarWrapper>
                    <LineContent>asd asd as d</LineContent>
                </ChatLineWrapper>
                <ChatLineWrapper>
                    <ChatAvatarWrapper></ChatAvatarWrapper>
                    <LineContent>?</LineContent>
                </ChatLineWrapper>
                <ChatLineWrapper>
                    <ChatAvatarWrapper></ChatAvatarWrapper>
                    <LineContent>asdjkabs haksdhakj hskj hdjk</LineContent>
                </ChatLineWrapper>
            </MessageCutout>
        );
    }
}
