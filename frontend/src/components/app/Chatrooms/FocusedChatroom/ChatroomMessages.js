import React from 'react';
import { Cutout, Button } from 'react95';
import styled from 'styled-components';

import { ChatLines } from './ChatLines';
import { connect } from 'react-redux';
import { loadOlderMessages } from '../../../../redux/actions/room.action';

const MessageCutout = styled(Cutout)`
    flex: 1 0;
    max-height: calc(100% - 78px);
    margin-bottom: 20px;
    position: relative;
`;

const LastLinePadding = styled.div`
    height: 10px;
`;

const ScrollToBottomButton = styled(Button)`
    position: absolute;
    bottom: 5px;
    left: 7px;
`;

export class ChatroomMessages extends React.Component {
    state = {
        onBottom: true,
        sticky: true,
    };

    componentDidMount() {
        if (this.container)
            this.container.addEventListener('scroll', this.onElementScroll);
        this.scrollToBottom();
    }

    componentWillUnmount() {
        if (this.container)
            this.container.removeEventListener('scroll', this.onElementScroll);
    }

    componentDidUpdate() {
        if (this.state.sticky) this.scrollContainer();
    }

    scrollToBottom = () => {
        this.scrollContainer();
        this.setState({ sticky: true, onBottom: true });
    };

    onElementScroll = (e) => {
        const element = e.target;
        this.evalScrollPosition(element);
    };

    loadOldMessages = () => {
        const { activeRoom } = this.props.rooms || {};
        const _id = activeRoom ? activeRoom._id : null;
        const messages = activeRoom ? activeRoom.messages : [];

        let oldScrollHeight = 0;
        if (this.container)
            oldScrollHeight =
                this.container.scrollHeight - this.container.scrollTop;

        if (_id && messages.length !== 0 && messages[0].number > 0) {
            loadOlderMessages(_id, messages[0].number, () => {
                this.container.scrollTop =
                    this.container.scrollHeight - oldScrollHeight;
            });
        }
    };

    scrollContainer() {
        if (this.container)
            this.container.scrollTop = this.container.scrollHeight;
    }

    evalScrollPosition(element) {
        const onBottom =
            element.scrollHeight - element.scrollTop === element.clientHeight;
        this.setState({
            onBottom,
            sticky: onBottom,
        });
    }

    activeRoomHasOlderMessages() {
        const { activeRoom } = this.props.rooms || {};
        const messages = activeRoom ? activeRoom.messages : [];
        try {
            return messages[0].number > 0;
        } catch {
            return false;
        }
    }

    render() {
        const { activeRoom } = this.props.rooms || {};
        const messages = activeRoom ? activeRoom.messages : [];
        return (
            <MessageCutout
                ref={(el) => (this.container = el ? el.firstChild : el)}
            >
                {this.activeRoomHasOlderMessages() && (
                    <Button fullWidth onClick={this.loadOldMessages}>
                        Load older messages
                    </Button>
                )}
                <ChatLines messages={messages} currentUser={this.props.user} />
                <LastLinePadding />
                {!this.state.onBottom && (
                    <ScrollToBottomButton onClick={this.scrollToBottom}>
                        Scroll to Bottom
                    </ScrollToBottomButton>
                )}
            </MessageCutout>
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

export default connect(mapStateToProps)(ChatroomMessages);
