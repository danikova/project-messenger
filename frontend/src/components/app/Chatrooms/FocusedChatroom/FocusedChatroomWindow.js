import React from 'react';
import styled from 'styled-components';
import {
    MaxSizeFlexWindow,
    FlexWindowHeader,
    FlexWindowContent,
} from '../../../shared/styled-components';
import { connect } from 'react-redux';
import { FocusedToolbar } from './FocusedToolbar';
import { getRoomDetail } from '../../../../store/actions/room.action';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { FocusedChatroomInputField } from './FocusedChatroomInputField';
import ChatroomMessages from './ChatroomMessages';

const FlexWindowContentWithoutTopPadding = styled(FlexWindowContent)`
    padding-top: 3px;
    max-height: calc(100% - 93px);
    height: calc(100% - 93px);
    display: flex;
    flex-flow: column;

    .chatroom-messages-wrapper {
        flex: 2;
        overflow: auto;
    }

    .input-field-wrapper {
    }
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

    componentDidMount() {
        getRoomDetail(this.props.focusedRoomId);
    }

    render() {
        const { activeRoom } = this.props.rooms || {};
        const name = activeRoom ? activeRoom.name : null;
        const _id = activeRoom ? activeRoom._id : null;
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
                    <ChatroomMessages className='chatroom-messages-wrapper' />
                    <div className='input-field-wrapper'>
                        <FocusedChatroomInputField
                            focusedRoomId={_id}
                        />
                    </div>
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
