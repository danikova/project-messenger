import React, { useState } from 'react';
import { List, Button, Toolbar, TextField } from 'react95';
import { ChatRoom } from './ChatRoom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
    MaxSizeFlexWindow,
    FlexWindowHeader,
    FlexWindowContent,
    Dialog,
} from '../../shared/components';
import { createNewRow } from '../../redux/actions/room.action';
import { withSnackbar } from 'notistack';

const FullHeightList = styled(List)`
    height: 100%;
    overflow-y: auto;
`;

const CreateNewRoomButton = styled(Button)`
    border: dotted;
    margin-bottom: 10px;
`;

const ListWindowContent = styled(FlexWindowContent)`
    max-height: 100%;
`;

const CreateNewRoomDialog = (props) => {
    const [value, setValue] = useState('');

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
                    width={400}
                />
                <Button
                    onClick={() => {
                        createNewRow(value, () => {
                            props.closeDialog && props.closeDialog();
                        });
                    }}
                    style={{ marginLeft: '2px' }}
                >
                    Create
                </Button>
            </Toolbar>
        </Dialog>
    );
};

export class ChatRoomsWindow extends React.Component {
    state = { createNewRoomDialog: false };

    renderChatRooms() {
        if (!this.props.rooms) return null;
        const { user } = this.props;
        const { rooms, activeRoom } = this.props.rooms;
        return (rooms || []).map((room) => {
            const active = activeRoom ? activeRoom._id === room._id : false;
            return (
                <ChatRoom
                    key={room._id}
                    {...room}
                    active={active}
                    currentUser={user && user.data}
                ></ChatRoom>
            );
        });
    }

    render() {
        return (
            <MaxSizeFlexWindow>
                <FlexWindowHeader
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <span>chatRooms.exe</span>
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
                    <FullHeightList fullWidth>
                        <CreateNewRoomButton
                            fullWidth
                            size='lg'
                            onClick={() => {
                                this.setState({ createNewRoomDialog: true });
                            }}
                        >
                            Create new room
                        </CreateNewRoomButton>
                        {this.renderChatRooms()}
                    </FullHeightList>
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

export default withSnackbar(connect(mapStateToProps)(ChatRoomsWindow));
