import React from 'react';
import { TextArea, Button, Avatar } from 'react95';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import {
    MaxHeightGrid,
    MaxSizeFlexWindow,
    FlexWindowHeader,
    FlexWindowContent,
} from '../../../shared/components';
import { ChatroomMessages } from './ChatroomMessages';
import { connect } from 'react-redux';
import { socket } from '../../../redux/actions/socket.action';
import { FocusedToolbar } from './FocusedToolbar';
import { pushActiveMessage } from '../../../redux/actions/room.action';

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

const FlexWindowContentWithoutTopPadding = styled(FlexWindowContent)`
    padding-top: 3px;
`;

const NameWrapper = styled.p`
    display: inline;
    margin-right: 10px;
`;

const CurrentUserAvatar = styled(Avatar)`
    color: black;
    display: inline-flex;
`;

export class FocusedChatroomWindow extends React.Component {
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
        const _id = activeRoom ? activeRoom._id : null;
        const messages = activeRoom ? activeRoom.messages : [];
        const users = activeRoom ? activeRoom.users : [];
        const disabled = (activeRoom ? false : true) || this.state.processing;
        const disabledSend = disabled || (this.state.value ? false : true);
        return (
            <MaxSizeFlexWindow key={_id}>
                <FlexWindowHeader
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <span>
                        {name
                            ? `${name} (focusedChatroom.exe)`
                            : 'focusedChatroom.exe'}
                    </span>
                    {this.props.user && this.props.user.username ? (
                        <span>
                            <NameWrapper>
                                {this.props.user.username}
                            </NameWrapper>
                            <CurrentUserAvatar
                                style={{
                                    background: `#${this.props.user.color.primary}`,
                                    color: `#${this.props.user.color.secondary}`,
                                    textShadow:
                                        '-1px -1px 0 #595959, 1px -1px 0 #595959, -1px 1px 0 #595959, 1px 1px 0 #595959',
                                }}
                                src={this.props.user.imageUrl}
                            >
                                {this.props.user.username
                                    .charAt(0)
                                    .toUpperCase()}
                            </CurrentUserAvatar>
                        </span>
                    ) : null}
                </FlexWindowHeader>
                <FocusedToolbar roomId={_id} />
                <FlexWindowContentWithoutTopPadding>
                    <ContentWrapper>
                        <ChatroomMessages
                            currentUser={this.props.user}
                            users={users}
                            messages={messages}
                        ></ChatroomMessages>
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
                </FlexWindowContentWithoutTopPadding>
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

export default connect(mapStateToProps)(FocusedChatroomWindow);