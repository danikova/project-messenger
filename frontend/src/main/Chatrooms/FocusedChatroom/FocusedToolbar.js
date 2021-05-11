import React, { useState } from 'react';
import { Button, Toolbar, TextField } from 'react95';
import { addUserToRoom, leaveRoom } from '../../../redux/actions/room.action';
import { Dialog } from '../../../shared/components';

export const FocusedToolbar = (props) => {
    const [value, setValue] = useState('');
    const [addDialog, setAddDialog] = useState(false);
    const [leaveDialog, setLeaveDialog] = useState(false);

    return (
        <Toolbar>
            <Button
                disabled={!props.roomId}
                variant='menu'
                size='sm'
                onClick={() => setAddDialog(true)}
            >
                add user
            </Button>
            <Button
                disabled={!props.roomId}
                variant='menu'
                size='sm'
                onClick={() => setLeaveDialog(true)}
            >
                leave room
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
                        />
                        <Button
                            onClick={() => {
                                addUserToRoom(props.roomId, value, () => {
                                    setAddDialog(false);
                                });
                            }}
                            style={{ marginLeft: '2px' }}
                        >
                            Add
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
                        You are about to leave this chat room, are you sure?
                    </div>
                    <Button
                        style={{ marginRight: '10px' }}
                        onClick={() => {
                            leaveRoom(props.roomId);
                            setLeaveDialog(false);
                        }}
                    >
                        Yes
                    </Button>
                    <Button onClick={() => setLeaveDialog(false)}>No</Button>
                </Dialog>
            ) : null}
        </Toolbar>
    );
};
