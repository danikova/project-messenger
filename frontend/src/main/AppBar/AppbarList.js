import { useSnackbar } from 'notistack';
import React from 'react';
import {
    List,
    ListItem,
    Divider
} from 'react95';
import { forgetUser } from '../../redux/actions/user.action';
import { history } from '../../Router';


export function AppbarList(props) {
    const { enqueueSnackbar } = useSnackbar();

    return (
        <List
            style={{
                position: 'absolute',
                left: '0',
                top: '100%',
            }}
            onClick={props.toolbarClose}
        >
            <ListItem onClick={() => history.push('/profile')}>
                <span role='img' aria-label='👨‍💻'>
                    👨‍💻
                </span>
                Profile
            </ListItem>
            <ListItem onClick={() => history.push('/chatrooms')}>
                <span role='img' aria-label='📁'>
                    📁
                </span>
                Chatrooms
            </ListItem>
            <Divider />
            <ListItem
                onClick={() => {
                    forgetUser();
                    enqueueSnackbar(`Successful logout`, true);
                }}
            >
                <span role='img' aria-label='🔙'>
                    🔙
                </span>
                Logout
            </ListItem>
        </List>
    );
}
