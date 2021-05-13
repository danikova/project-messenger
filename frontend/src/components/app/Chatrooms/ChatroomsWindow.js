import React, { useState } from 'react';
import { Cutout, Button, Toolbar, TextField } from 'react95';
import { Chatroom } from './Chatroom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
    MaxSizeFlexWindow,
    FlexWindowHeader,
    FlexWindowContent,
} from '../../shared/styled-components';
import { Dialog } from '../../shared/Dialog';
import { createNewRow } from '../../../redux/actions/room.action';
import { withSnackbar } from 'notistack';
import { FormattedMessage, useIntl } from 'react-intl';

const FullHeghtCutout = styled(Cutout)`
    height: calc(100% - 51px);
    overflow-y: auto;
`;

const CreateNewRoomButton = styled(Button)`
    border: dotted;
    margin-bottom: 10px;
`;

const ListWindowContent = styled(FlexWindowContent)`
    max-height: calc(100% - 70px);
`;

const CreateNewRoomDialog = (props) => {
    const [value, setValue] = useState('');
    const intl = useIntl();

    return (
        <Dialog title={'createNewRoom.exe'} onCloseClick={props.closeDialog}>
            <Toolbar>
                <TextField
                    onKeyPress={(e) => {
                        if (e.key === 'Enter')
                            createNewRow(value, () => {
                                props.closeDialog && props.closeDialog();
                            });
                    }}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    fullWidth
                    placeholder={intl.formatMessage({
                        id: 'chatrooms.roomList.createNewRoom.dialog.TextField.placeholder',
                    })}
                />
                <Button
                    onClick={() => {
                        createNewRow(value, () => {
                            props.closeDialog && props.closeDialog();
                        });
                    }}
                    style={{ marginLeft: '2px' }}
                >
                    <FormattedMessage id='chatrooms.roomList.createNewRoom.dialog.btnText' />
                </Button>
            </Toolbar>
        </Dialog>
    );
};

export class ChatroomsWindow extends React.Component {
    state = { createNewRoomDialog: false };

    renderChatrooms() {
        if (!this.props.rooms) return null;
        const { user } = this.props;
        const { rooms, activeRoom } = this.props.rooms;
        return (rooms || []).map((room) => {
            const active = activeRoom ? activeRoom._id === room._id : false;
            return (
                <Chatroom
                    key={room._id}
                    {...room}
                    active={active}
                    currentUser={user && user.data}
                ></Chatroom>
            );
        });
    }

    render() {
        return (
            <MaxSizeFlexWindow>
                <FlexWindowHeader>
                    <span>chatrooms.exe</span>
                </FlexWindowHeader>
                <ListWindowContent>
                    {this.state.createNewRoomDialog ? (
                        <CreateNewRoomDialog
                            closeDialog={() => {
                                this.setState({
                                    createNewRoomDialog: false,
                                });
                            }}
                        ></CreateNewRoomDialog>
                    ) : null}
                    <CreateNewRoomButton
                        fullWidth
                        size='lg'
                        onClick={() => {
                            this.setState({ createNewRoomDialog: true });
                        }}
                    >
                        <FormattedMessage id='chatrooms.roomList.createNewRoom.btnText' />
                    </CreateNewRoomButton>
                    <FullHeghtCutout>{this.renderChatrooms()}</FullHeghtCutout>
                </ListWindowContent>
            </MaxSizeFlexWindow>
        );
    }
}

const mapStateToProps = (state) => {
    const { rooms, user } = state;
    return {
        user,
        rooms,
    };
};

export default withSnackbar(connect(mapStateToProps)(ChatroomsWindow));
