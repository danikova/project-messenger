import React from 'react';
import { ChatroomWrapperGrid } from '../../shared/styled-components';
import { Grid } from '@material-ui/core';
import ChatroomsWindow from './ChatroomsWindow';
import FocusedChatroomWindow from './FocusedChatroom/FocusedChatroomWindow';
import { pushMessage, readRoomList } from '../../../store/actions/room.action';
import { getSelf } from '../../../store/actions/user.action';
import { withSocket } from '../SocketWrapper';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { FRONTEND_CHATROOMS_FOCUSED_URL } from '../../../routes';
import UrlTemplate from 'url-template';
import { connect } from 'react-redux';

export class Chatrooms extends React.Component {
    onNewMessage = (data) => {
        const { roomId, message } = data;
        pushMessage(roomId, message);
    };

    onRefreshRoom = (data) => {
        readRoomList();
    };

    componentDidMount() {
        getSelf(() => {
            readRoomList();
        });
        this.props.socket.on('newMessage', this.onNewMessage);
        this.props.socket.on('refreshRoom', this.onRefreshRoom);
    }

    componentWillUnmount() {
        this.props.socket.off('newMessage', this.onNewMessage);
        this.props.socket.off('refreshRoom', this.onRefreshRoom);
    }

    render() {
        const user = this.props.user;
        const { roomId } = this.props.match.params;
        if (!roomId && user.data && user.data.openChatroom)
            return (
                <Redirect
                    to={UrlTemplate.parse(
                        FRONTEND_CHATROOMS_FOCUSED_URL,
                    ).expand({ roomId: user.data.openChatroom })}
                />
            );

        return (
            <ChatroomWrapperGrid container spacing={2}>
                <Helmet>
                    <title>
                        {this.props.intl.formatMessage({
                            id: 'helmet.chatrooms.title',
                        })}
                    </title>
                </Helmet>
                <Grid item xs={5} sm={4} md={3}>
                    <ChatroomsWindow />
                </Grid>
                <Grid item xs={7} sm={8} md={9}>
                    <FocusedChatroomWindow focusedRoomId={roomId} />
                </Grid>
            </ChatroomWrapperGrid>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state;
    return {
        user,
    };
};

export default injectIntl(withSocket(connect(mapStateToProps)(Chatrooms)));
