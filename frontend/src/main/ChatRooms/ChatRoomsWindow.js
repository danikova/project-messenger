import React from 'react';
import { List } from 'react95';
import { ChatRoom } from './ChatRoom';
import { connect } from 'react-redux';

import styled from 'styled-components';
import {
    MaxSizeFlexWindow,
    FlexWindowHeader,
    FlexWindowContent,
} from '../../shared/components';

const FullHeightList = styled(List)`
    height: 100%;
    overflow-y: auto;
`;

export class ChatRoomsWindow extends React.Component {
    renderChatRooms() {
        const { rooms, activeRoom } = this.props.rooms;
        return (rooms || []).map((room) => {
            const active = activeRoom ? activeRoom._id === room._id : false;
            return (
                <ChatRoom key={room._id} {...room} active={active}></ChatRoom>
            );
        });
    }

    render() {
        return (
            <MaxSizeFlexWindow>
                <FlexWindowHeader>
                    <span>chatRooms.exe</span>
                </FlexWindowHeader>
                <FlexWindowContent>
                    <FullHeightList fullWidth>
                        {this.renderChatRooms()}
                    </FullHeightList>
                </FlexWindowContent>
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

export default connect(mapStateToProps)(ChatRoomsWindow);
