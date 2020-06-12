import React from 'react';
import { Button, Avatar } from 'react95';

import styled from 'styled-components';

const ChatRoomButton = styled(Button)`
    justify-content: start !important;
    padding: 0;
`;

const ButtonContent = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
`;

const AvatarWrapper = styled.div`
    flex: 0 0;
    padding: 3px;
`;

const DetailsWrapper = styled.div`
    flex: 1 0;
    padding-left: 5px;
    padding: 3px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ChatRoomName = styled.div`
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const LastMessage = styled.div`
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export class ChatRoom extends React.Component {
    state = {
        capitalName: '',
        avatarLetters: '',
    };

    componentDidUpdate(oldProps) {
        this.generateCapitalizedName(oldProps);
    }

    componentDidMount() {
        this.generateCapitalizedName({});
    }

    generateCapitalizedName(oldProps) {
        if (oldProps.name !== this.props.name) {
            let avatarLetters = '';
            const nameWords = this.props.name.split(' ');
            for (let i = 0; i < nameWords.length; i++) {
                const word = nameWords[i];
                nameWords[i] = word.charAt(0).toUpperCase() + word.slice(1);
                if (avatarLetters.length < 2)
                    avatarLetters += nameWords[i].charAt(0);
            }
            this.setState({
                capitalName: nameWords.join(' '),
                avatarLetters: avatarLetters,
            });
        }
    }

    lastMessageString() {
        return `${this.props.lastMessage.user}: ${this.props.lastMessage.message}`;
    }

    render() {
        return (
            <ChatRoomButton fullWidth size='lg' active={this.props.active}>
                <ButtonContent>
                    <AvatarWrapper>
                        <Avatar
                            style={{
                                background: this.props.color,
                            }}
                        >
                            {this.state.avatarLetters}
                        </Avatar>
                    </AvatarWrapper>
                    <DetailsWrapper>
                        <ChatRoomName>{this.state.capitalName}</ChatRoomName>
                        <LastMessage>{this.lastMessageString()}</LastMessage>
                    </DetailsWrapper>
                </ButtonContent>
            </ChatRoomButton>
        );
    }
}
