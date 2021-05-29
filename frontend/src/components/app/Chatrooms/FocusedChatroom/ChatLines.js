import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Fieldset } from 'react95';
import styled from 'styled-components';
import { AvatarHolder } from '../../../shared/AvatarHolder';
import { FormattedMessage } from 'react-intl';
import {
    ProfileTooltip,
    RetroTooltip,
} from '../../../shared/styled-components';
import { ProfileInfo } from '../../../shared/ProfileInfo';
import { useLocale } from '../../../../lang/LocaleWrapper';
import ReactHtmlParser from 'react-html-parser';
import { FileCarousel } from './FileCarousel';

const getFileType = (file) =>
    file.mimetype.startsWith('image') ? 'image' : 'file';

const ServerLineWrapper = styled.div`
    padding: 10px 0 0 5px;
    font-size: 12px;
    color: gray;
    text-align: center;
`;

const ChatLineWrapper = styled.div`
    display: flex;
    padding: 5px 5px 0 5px;
    ${(props) =>
        props.reverse
            ? `flex-direction: row-reverse;
              legend {
              left: initial;
              right: 0.5rem;
              }`
            : ''}
`;

const ChatAvatarWrapper = styled.div`
    flex: 0 0 40px;
    display: flex;
    align-items: flex-end;
    justify-content: ${(props) => (props.reverse ? 'flex-end' : 'flex-start')};
    flex-direction: row;
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
    const { locale } = useLocale();
    const users = useSelector((state) => state.users);
    const { messages, currentUser } = props;
    let userId = '';
    return (messages || []).map((message) => {
        const userChange = userId !== message.userId;
        userId = message.userId;
        const reverseLine = currentUser._id === userId;
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
            <ChatLineWrapper key={message._id} reverse={reverseLine}>
                <ChatAvatarWrapper reverse={reverseLine}>
                    {userChange && (
                        <ProfileTooltip
                            title={<ProfileInfo userId={userId} />}
                            placement={
                                reverseLine ? 'bottom-end' : 'bottom-start'
                            }
                            interactive
                        >
                            <div>
                                <AvatarHolder userId={userId} />
                            </div>
                        </ProfileTooltip>
                    )}
                </ChatAvatarWrapper>
                <LineContent
                    label={
                        userChange &&
                        ((users[userId] && users[userId].username) || '...')
                    }
                >
                    <FileCarousel
                        files={message.files || []}
                        getSrc={(file, setSrc) => {
                            if (getFileType(file) === 'image') setSrc(file.uri);
                        }}
                        getType={getFileType}
                        onItemClick={(file) => {
                            if (getFileType(file) === 'file') {
                                const link = document.createElement('a');
                                link.download = file.name;
                                link.href = file.uri;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }
                        }}
                    />
                    <RetroTooltip
                        title={
                            <h1>
                                {moment(message.sent).locale(locale).fromNow()}
                            </h1>
                        }
                        placement={reverseLine ? 'left' : 'right'}
                        enterDelay={1000}
                        enterNextDelay={200}
                    >
                        <div>{ReactHtmlParser(message.message)}</div>
                    </RetroTooltip>
                </LineContent>
            </ChatLineWrapper>
        );
    });
}
