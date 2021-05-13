import React from 'react';
import { ChatroomWrapperGrid } from '../../shared/styled-components';
import { Grid } from '@material-ui/core';
import ChatroomsWindow from './ChatroomsWindow';
import FocusedChatroomWindow from './FocusedChatroom/FocusedChatroomWindow';
import {
    openRoom,
    pushMessage,
    readRoomList,
} from '../../../store/actions/room.action';
import { store } from '../../../store';
import { getSelf } from '../../../store/actions/user.action';
import { withSocket } from '../SocketWrapper';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

export class Chatrooms extends React.Component {
    onNewMessage = (data) => {
        const { roomId, message } = data;
        pushMessage(roomId, message);
    };

    onRefreshRoom = (data) => {
        const { roomId } = data;
        const { rooms } = store.getState();
        readRoomList();
        if (rooms.activeRoom && rooms.activeRoom._id === roomId) {
            openRoom(roomId);
        }
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
                    <ChatroomsWindow></ChatroomsWindow>
                </Grid>
                <Grid item xs={7} sm={8} md={9}>
                    <FocusedChatroomWindow></FocusedChatroomWindow>
                </Grid>
            </ChatroomWrapperGrid>
        );
    }
}

export default injectIntl(withSocket(Chatrooms));
