import React from 'react';
import { TextField, Button } from 'react95';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import {
    MaxHeightGrid,
    MaxSizeFlexWindow,
    FlexWindowHeader,
    FlexWindowContent,
} from '../../../shared/styled-components';
import ChatroomMessages from './ChatroomMessages';
import { connect } from 'react-redux';
import { FocusedToolbar } from './FocusedToolbar';
import {
    getRoomDetail,
    pushActiveMessage,
} from '../../../../store/actions/room.action';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

const ContentWrapper = styled.div`
    height: 100%;
    max-height: 100% !important;
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
    max-height: calc(100% - 93px);
`;

export class FocusedChatroomWindow extends React.Component {
    constructor(props) {
        super(props);
        this.textArea = React.createRef();
    }

    componentDidUpdate(oldProps) {
        if (this.props.focusedRoomId !== oldProps.focusedRoomId)
            getRoomDetail(this.props.focusedRoomId);
    }

    state = { value: '', processing: false };

    componentDidMount() {
        getRoomDetail(this.props.focusedRoomId);
    }

    onTextAreaChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    };

    onTextAreaEnterPress = (e) => {
        if (e.key === 'Enter') {
            this.onSendButtonClick();
        }
    };

    onSendButtonClick = () => {
        const { activeRoom } = this.props.rooms || {};
        if (activeRoom && !this.state.processing && this.state.value.trim()) {
            pushActiveMessage(this.state.value, () => {
                this.setState({ value: '', processing: false });
                this.textArea.focus();
            });
            this.setState({ processing: true });
        }
    };

    render() {
        const { activeRoom } = this.props.rooms || {};
        const name = activeRoom ? activeRoom.name : null;
        const _id = activeRoom ? activeRoom._id : null;
        const disabled = (activeRoom ? false : true) || this.state.processing;
        const disabledSend = disabled || (this.state.value ? false : true);
        return (
            <MaxSizeFlexWindow key={_id}>
                {name && (
                    <Helmet>
                        <title>
                            {this.props.intl.formatMessage(
                                {
                                    id: 'helmet.chatrooms.activeRoom.title',
                                },
                                { activeRoomName: name },
                            )}
                        </title>
                    </Helmet>
                )}
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
                </FlexWindowHeader>
                <FocusedToolbar roomId={_id} />
                <FlexWindowContentWithoutTopPadding>
                    <ContentWrapper>
                        <ChatroomMessages />
                        <InputField>
                            <MaxHeightGrid container>
                                <Grid item xs={10} md={11}>
                                    <TextField
                                        autoFocus
                                        multiline
                                        rows={2}
                                        ref={(el) => (this.textArea = el)}
                                        disabled={disabled}
                                        value={this.state.value}
                                        onChange={this.onTextAreaChange}
                                        onKeyPress={this.onTextAreaEnterPress}
                                        placeholder={this.props.intl.formatMessage(
                                            {
                                                id: 'chatrooms.focusedChatroom.newMessage.TextField.placeholder',
                                            },
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={2} md={1}>
                                    <SendButton
                                        disabled={disabledSend}
                                        onClick={this.onSendButtonClick}
                                    >
                                        <FormattedMessage id='chatrooms.focusedChatroom.newMessage.btnText' />
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
    const { rooms } = state;
    return {
        rooms,
    };
};

export default injectIntl(connect(mapStateToProps)(FocusedChatroomWindow));
