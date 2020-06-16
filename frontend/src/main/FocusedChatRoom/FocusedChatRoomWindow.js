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
import { socket } from '../../redux/actions/socket.action';

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
    constructor(props) {
        super(props);
        this.textArea = null;
    }

    state = { value: '', processing: false };

    onPushMessageSuccess = () => {
        pushActiveMessage(this.state.value);
        this.setState({ value: '', processing: false });
    };

    componentDidMount() {
        socket.on('pushMessageSuccess', this.onPushMessageSuccess);
        this.textArea = document.getElementById(
            'text-area-for-focused-chatroom',
        );
    }

    componentWillUnmount() {
        socket.off('pushMessageSuccess', this.onPushMessageSuccess);
    }

    onTextAreaChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    };

    onTextAreaEnterPress = (e) => {
        if (e.key === 'Enter') {
            this.onSendButtonClick();
            setTimeout(() => {
                this.textArea.focus();
            }, 0);
        }
    };

    onSendButtonClick = () => {
        const { activeRoom } = this.props.rooms || {};
        if (activeRoom && !this.state.processing && this.state.value.trim()) {
            socket.emit('pushMessage', {
                roomId: activeRoom._id,
                message: this.state.value,
            });
            this.setState({ processing: true });
        }
    };

    render() {
        const { activeRoom } = this.props.rooms || {};
        const name = activeRoom ? activeRoom.name : null;
        const messages = activeRoom ? activeRoom.messages : [];
        const users = activeRoom ? activeRoom.users : [];
        const disabled = (activeRoom ? false : true) || this.state.processing;
        const disabledSend = disabled || (this.state.value ? false : true);
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
                                        id={'text-area-for-focused-chatroom'}
                                        disabled={disabled}
                                        value={this.state.value}
                                        onChange={this.onTextAreaChange}
                                        onKeyPress={this.onTextAreaEnterPress}
                                        placeholder='Type in here..'
                                    />
                                </Grid>
                                <Grid item xs={2} md={1}>
                                    <SendButton
                                        disabled={disabledSend}
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
    const { user, rooms } = state;
    return {
        user: user.data,
        rooms,
    };
};

export default connect(mapStateToProps)(FocusedChatRoomWindow);
