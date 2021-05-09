import React from 'react';
import { Cutout } from 'react95';
import styled from 'styled-components';

import ScrollToBottom from 'react-scroll-to-bottom';
import { ChatLines } from './ChatLines';

const MessageCutout = styled(Cutout)`
    flex: 1 0;
    max-height: calc(100% - 78px);
    margin-bottom: 20px;
`;

const LastLinePadding = styled.div`
    height: 10px;
`;

const FullHeightScrollToBottom = styled(ScrollToBottom)`
    height: 100%;
`;

export class ChatroomMessages extends React.Component {
    render() {
        return (
            <MessageCutout>
                <FullHeightScrollToBottom followButtonClassName='scroll-to-bottom'>
                    <ChatLines {...this.props} />
                    <LastLinePadding />
                </FullHeightScrollToBottom>
            </MessageCutout>
        );
    }
}
