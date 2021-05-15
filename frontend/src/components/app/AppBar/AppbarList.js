import { useSnackbar } from 'notistack';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { List, ListItem, Divider } from 'react95';
import {
    FRONTEND_CHATROOMS_FOCUSED_URL,
    FRONTEND_CHATROOMS_URL,
    FRONTEND_PROFILE_URL,
} from '../../../routes';
import { historyPush } from '../../../shared/history.service';
import { logoutUser } from '../../../store/actions/user.action';
import UrlTemplate from 'url-template';
import { useSelector } from 'react-redux';

export function AppbarList(props) {
    const rooms = useSelector((state) => state.rooms);
    const { activeRoom } = rooms;
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
            <ListItem onClick={() => historyPush(FRONTEND_PROFILE_URL)}>
                <span role='img' aria-label='👨‍💻'>
                    👨‍💻
                </span>
                <FormattedMessage id='appbar.startBtn.List.profile' />
            </ListItem>
            <ListItem
                onClick={() => {
                    if (activeRoom && activeRoom._id)
                        historyPush(
                            UrlTemplate.parse(
                                FRONTEND_CHATROOMS_FOCUSED_URL,
                            ).expand({ roomId: activeRoom._id }),
                        );
                    else historyPush(FRONTEND_CHATROOMS_URL);
                }}
            >
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
