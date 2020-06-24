import React from 'react';
import { Button, Avatar } from 'react95';

import styled from 'styled-components';
import { openRoom } from '../../redux/actions/room.action';

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
        const { messages: m, currentUser: cu } = this.props;
        if (m.length !== 0) {
            if (!m[0].user) return m[0].message;
            if (cu && cu._id === m[0].user._id) return `You: ${m[0].message}`;
            return `${m[0].user.username}: ${m[0].message}`;
        }
        return '';
    }

    render() {
        return (
            <ChatRoomButton
                fullWidth
                size='lg'
                active={this.props.active}
                onClick={() => {
                    openRoom(this.props._id);
                }}
            >
                <ButtonContent>
                    <AvatarWrapper>
                        <Avatar
                            style={{
                                background: `#${this.props.color.primary}`,
                                color: `#${this.props.color.secondary}`,
                                textShadow:
                                    '-1px -1px 0 #595959, 1px -1px 0 #595959, -1px 1px 0 #595959, 1px 1px 0 #595959',
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
