import React from 'react';
import { Fieldset, Avatar, Cutout } from 'react95';
import styled from 'styled-components';

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

const MessageCutout = styled(Cutout)`
    flex: 1 0;
    margin-bottom: 20px;
`;

const OuterLinesWrapper = styled.div`
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
`;

const InnerLinesWrapper = styled.div`
    height: 0;
`;

const LastLinePadding = styled.div`
    height: 10px;
`;

export class ChatRoomMessages extends React.Component {
    state = { users: {}, users_init: false };

    getUsers() {
        if (!this.state.users_init && this.props.users.length) {
            const users = {};
            for (const user of this.props.users) users[user._id] = user;
            this.setState({ users, users_init: true });
            return users;
        }
        return this.state.users;
    }

    renderChatLines() {
        const { messages } = this.props;
        const users = this.getUsers();
        let currentUser = '';
        return (messages || []).map((message) => {
            const user = users[message.user];
            const userChange = user && currentUser !== user._id;
            currentUser = (user && user._id) || '';
            return (
                <ChatLineWrapper key={message._id} currentUser>
                    <ChatAvatarWrapper>
                        {userChange ? (
                            <ChatAvatar
                                style={{
                                    background: user
                                        ? `#${user.color.primary}`
                                        : '#fff',
                                }}
                            >
                                {user
                                    ? user.username.charAt(0).toUpperCase()
                                    : '...'}
                            </ChatAvatar>
                        ) : null}
                    </ChatAvatarWrapper>
                    <LineContent
                        label={user && userChange ? user.username : null}
                    >
                        {message.message}
                    </LineContent>
                </ChatLineWrapper>
            );
        });
    }

    render() {
        return (
            <MessageCutout>
                <OuterLinesWrapper>
                    <InnerLinesWrapper>
                        {this.renderChatLines()}
                        <LastLinePadding />
                    </InnerLinesWrapper>
                </OuterLinesWrapper>
            </MessageCutout>
        );
    }
}
