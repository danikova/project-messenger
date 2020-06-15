import React from 'react';
import { TextArea, Button } from 'react95';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import {
    MaxHeightGrid,
    MaxSizeFlexWindow,
    FlexWindowHeader,
    FlexWindowContent,
} from '../../shared/components';
import { ChatRoomMessages } from './ChatRoomMessages';
import { connect } from 'react-redux';
import { pushActiveMessage } from '../../redux/actions/room.action';

const ContentWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const InputField = styled.div`
    flex: 0 0;
`;

const SendButton = styled(Button)`
    height: 100%;
    width: 100%;
`;

export class FocusedChatRoomWindow extends React.Component {
    state = { value: '' };

    componentDidUpdate(oldProps) {
        if (oldProps.socket !== this.props.socket) {
            this.props.socket.on('pushMessageSuccess', () => {
                pushActiveMessage(this.state.value);
                this.setState({ value: '' });
            });
        }
    }

    onTextAreaChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    };

    onTextAreaEnterPress = (e) => {
        console.log(e.keyCode);
        if (e.key === 'Enter') {
            this.onSendButtonClick();
        }
    };

    onSendButtonClick = () => {
        const { activeRoom } = this.props.rooms || {};
        if (activeRoom)
            this.props.socket.emit('pushMessage', {
                roomId: activeRoom._id,
                message: this.state.value,
            });
    };

    render() {
        const { activeRoom } = this.props.rooms || {};
        const name = activeRoom ? activeRoom.name : null;
        const messages = activeRoom ? activeRoom.messages : [];
        const users = activeRoom ? activeRoom.users : [];
        console.log(users);
        return (
            <MaxSizeFlexWindow>
                <FlexWindowHeader>
                    <span>
                        {name
                            ? `${name} (focusedChatRoom.exe)`
                            : 'focusedChatRoom.exe'}
                    </span>
                </FlexWindowHeader>
                <FlexWindowContent>
                    <ContentWrapper>
                        <ChatRoomMessages
                            currentUser={this.props.user}
                            users={users}
                            messages={messages}
                        ></ChatRoomMessages>
                        <InputField>
                            <MaxHeightGrid container>
                                <Grid item xs={10} md={11}>
                                    <TextArea
                                        value={this.state.value}
                                        onChange={this.onTextAreaChange}
                                        onKeyPress={this.onTextAreaEnterPress}
                                        placeholder='Type in here..'
                                    />
                                </Grid>
                                <Grid item xs={2} md={1}>
                                    <SendButton
                                        disabled={activeRoom ? false : true}
                                        onClick={this.onSendButtonClick}
                                    >
                                        send
                                    </SendButton>
                                </Grid>
                            </MaxHeightGrid>
                        </InputField>
                    </ContentWrapper>
                </FlexWindowContent>
            </MaxSizeFlexWindow>
        );
    }
}

const mapStateToProps = (state) => {
    const { user, rooms, socket } = state;
    return {
        user,
        rooms,
        socket,
    };
};

export default connect(mapStateToProps)(FocusedChatRoomWindow);
