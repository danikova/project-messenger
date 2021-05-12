import { useSnackbar } from 'notistack';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { List, ListItem, Divider } from 'react95';
import { history } from '../../../shared/history.service';
import { logoutUser } from '../../../redux/actions/user.action';

export function AppbarList(props) {
    const { enqueueSnackbar } = useSnackbar();
    const intl = useIntl();

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
                <FormattedMessage id='appbar.startBtn.List.profile' />
            </ListItem>
            <ListItem onClick={() => history.push('/chatrooms')}>
                <span role='img' aria-label='📁'>
                    📁
                </span>
                <FormattedMessage id='appbar.startBtn.List.chatrooms' />
            </ListItem>
            <Divider />
            <ListItem
                onClick={() => {
                    logoutUser();
                    enqueueSnackbar(
                        intl.formatMessage({
                            id: 'auth.logout',
                        }),
                    );
                }}
            >
                <span role='img' aria-label='🔙'>
                    🔙
                </span>
                <FormattedMessage id='appbar.startBtn.List.logout' />
            </ListItem>
        </List>
    );
}
