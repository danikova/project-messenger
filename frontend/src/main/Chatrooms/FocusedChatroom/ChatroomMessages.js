import React from 'react';
import { Fieldset, Avatar, Cutout } from 'react95';
import styled from 'styled-components';

import ScrollToBottom from 'react-scroll-to-bottom';

const ServerLineWrapper = styled.div`
    padding: 10px 0 0 5px;
    font-size: 12px;
    color: gray;
    text-align: center;
`;

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

const LastLinePadding = styled.div`
    height: 10px;
`;

const FullHeightScrollToBottom = styled(ScrollToBottom)`
    height: 100%;
`;

export class ChatroomMessages extends React.Component {
    state = { users: {}, users_init: false };

    getUsers() {
        const users_keys = Object.keys(this.state.users);
        if (
            (!this.state.users_init && this.props.users.length) ||
            this.props.users.length !== users_keys.length
        ) {
            const users = {};
            for (const user of this.props.users) users[user._id] = user;
            this.setState({ users, users_init: true });
            return users;
        }
        return this.state.users;
    }

    renderChatLines() {
        const { messages, currentUser: cu } = this.props;
        const users = this.getUsers();
        let currentUser = '';
        return (messages || []).map((message) => {
            const user = users[message.user];
            const userChange = user && currentUser !== user._id;
            currentUser = (user && user._id) || '';
            if (!message.user)
                return <ServerLineWrapper>{message.message}</ServerLineWrapper>;
            return (
                <ChatLineWrapper
                    key={message._id}
                    currentUser={cu._id === user._id}
                >
                    <ChatAvatarWrapper>
                        {userChange ? (
                            <ChatAvatar
                                style={{
                                    background: user
                                        ? `#${user.color.primary}`
                                        : '#fff',
                                    color: user
                                        ? `#${user.color.secondary}`
                                        : '#000',
                                    textShadow:
                                        '-1px -1px 0 #595959, 1px -1px 0 #595959, -1px 1px 0 #595959, 1px 1px 0 #595959',
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
                <FullHeightScrollToBottom followButtonClassName='scroll-to-bottom'>
                    {this.renderChatLines()}
                    <LastLinePadding />
                </FullHeightScrollToBottom>
            </MessageCutout>
        );
    }
}
