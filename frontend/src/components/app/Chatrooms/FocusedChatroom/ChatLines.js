import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Fieldset } from 'react95';
import styled from 'styled-components';
import { AvatarHolder } from '../../../shared/AvatarHolder';
import { FormattedMessage } from 'react-intl';

const ServerLineWrapper = styled.div`
    padding: 10px 0 0 5px;
    font-size: 12px;
    color: gray;
    text-align: center;
`;

const ChatLineWrapper = styled.div`
    display: flex;
    padding: 5px 0 0 5px;
    ${(props) =>
        props.reverse
            ? 'flex-direction: row-reverse;' +
              'legend {' +
              'left: initial;' +
              'right: 0.5rem;' +
              '}'
            : ''}
`;

const ChatAvatarWrapper = styled.div`
    flex: 0 0 40px;
`;

const ChatAvatar = styled(AvatarHolder)`
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

export function ChatLines(props) {
    const users = useSelector((state) => state.users);
    const { messages, currentUser } = props;
    let userId = '';
    return (messages || []).map((message) => {
        const userChange = userId !== message.userId;
        userId = message.userId;
        if (!message.userId)
            return (
                <ServerLineWrapper key={message._id}>
                    {message.message}
                    <FormattedMessage
                        id={message.serviceMessage.templateName}
                        values={message.serviceMessage.templateVariables}
                    />
                </ServerLineWrapper>
            );
        return (
            <ChatLineWrapper
                key={message._id}
                reverse={currentUser._id === userId}
                title={moment(message.sent).fromNow()}
            >
                <ChatAvatarWrapper>
                    {userChange && <ChatAvatar userId={userId} />}
                </ChatAvatarWrapper>
                <LineContent
                    label={
                        userChange &&
                        ((users[userId] && users[userId].username) || '...')
                    }
                >
                    {message.message}
                </LineContent>
            </ChatLineWrapper>
        );
    });
}
