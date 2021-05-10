import React from 'react';
import { Cutout, Button } from 'react95';
import styled from 'styled-components';

import { ChatLines, ServerLineWrapper } from './ChatLines';
import { connect } from 'react-redux';
import { RandomProgress } from '../../../shared/components';

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
        loadOldMessages: false,
        onTop: false,
        onBottom: true,
        sticky: true,
    };

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        if (this.state.sticky) this.scrollContainer();
    }

    scrollToBottom = () => {
        this.scrollContainer();
        this.setState({ sticky: true, onBottom: true, onTop: false });
    };

    onElementScroll = (e) => {
        const element = e.target;
        this.evalScrollPosition(element);
    };

    onLoadOldMessages = () => {
        console.log('loading...');
    };

    scrollContainer() {
        if (this.container && this.container.firstChild)
            this.container.firstChild.scrollTop = this.container.firstChild.scrollHeight;
    }

    evalScrollPosition(element) {
        const onTop = element.scrollTop < 10;
        const onBottom =
            element.scrollHeight - element.scrollTop === element.clientHeight;
        this.setState(
            {
                onBottom,
                onTop,
                sticky: onBottom,
            },
            () => {
                if (this.state.onTop && !this.state.loadOldMessages) {
                    if (this.container && this.container.firstChild)
                        this.container.firstChild.scrollTop = 0;
                    this.onLoadOldMessages();
                    this.setState({ loadOldMessages: true });
                }
            },
        );
    }

    render() {
        const { activeRoom } = this.props.rooms || {};
        const messages = activeRoom ? activeRoom.messages : [];
        return (
            <MessageCutout
                onScroll={this.onElementScroll}
                ref={(el) => (this.container = el)}
            >
                {this.state.loadOldMessages && (
                    <div>
                        <RandomProgress />
                        <ServerLineWrapper>
                            Loading older messages ...
                        </ServerLineWrapper>
                    </div>
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
