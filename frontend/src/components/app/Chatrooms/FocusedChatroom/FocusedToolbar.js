import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Toolbar, TextField } from 'react95';
import { addUserToRoom, leaveRoom } from '../../../../redux/actions/room.action';
import { Dialog } from '../../../shared/components';

export const FocusedToolbar = (props) => {
    const [value, setValue] = useState('');
    const [addDialog, setAddDialog] = useState(false);
    const [leaveDialog, setLeaveDialog] = useState(false);
    const intl = useIntl();

    return (
        <Toolbar>
            <Button
                disabled={!props.roomId}
                variant='menu'
                size='sm'
                onClick={() => setAddDialog(true)}
            >
                <FormattedMessage id='chatrooms.focusedChatroom.addUser.btnText' />
            </Button>
            <Button
                disabled={!props.roomId}
                variant='menu'
                size='sm'
                onClick={() => setLeaveDialog(true)}
            >
                <FormattedMessage id='chatrooms.focusedChatroom.leaveRoom.btnText' />
            </Button>
            {addDialog ? (
                <Dialog
                    title='addUser.exe'
                    onCloseClick={() => setAddDialog(false)}
                >
                    <Toolbar>
                        <TextField
                            value={value}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter')
                                    addUserToRoom(props.roomId, value, () => {
                                        setAddDialog(false);
                                    });
                            }}
                            onChange={(e) => setValue(e.target.value)}
                            fullWidth
                            placeholder={intl.formatMessage({
                                id: 'chatrooms.focusedChatroom.addUser.dialog.TextField.placeholder',
                            })}
                        />
                        <Button
                            onClick={() => {
                                addUserToRoom(props.roomId, value, () => {
                                    setAddDialog(false);
                                });
                            }}
                            style={{ marginLeft: '2px' }}
                        >
                            <FormattedMessage id='chatrooms.focusedChatroom.addUser.dialog.btnText' />
                        </Button>
                    </Toolbar>
                </Dialog>
            ) : null}
            {leaveDialog ? (
                <Dialog
                    title='leaveRoom.exe'
                    onCloseClick={() => setLeaveDialog(false)}
                >
                    <div style={{ marginBottom: '10px' }}>
                        <FormattedMessage id='chatrooms.focusedChatroom.leaveRoom.dialog.description' />
                    </div>
                    <Button
                        style={{ marginRight: '10px' }}
                        onClick={() => {
                            leaveRoom(props.roomId);
                            setLeaveDialog(false);
                        }}
                    >
                        <FormattedMessage id='chatrooms.focusedChatroom.leaveRoom.dialog.yes.BtnText' />
                    </Button>
                    <Button onClick={() => setLeaveDialog(false)}>
                        <FormattedMessage id='chatrooms.focusedChatroom.leaveRoom.dialog.no.BtnText' />
                    </Button>
                </Dialog>
            ) : null}
        </Toolbar>
    );
};
