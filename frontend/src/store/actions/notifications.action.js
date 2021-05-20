import { store } from '..';
import {
    CLOSE_SNACKBAR,
    ENQUEUE_SNACKBAR,
    REMOVE_SNACKBAR,
} from '../constants/notifications.constant';

export const enqueueSnackbar = (notification) => {
    if (typeof notification === 'string')
        notification = { message: notification };
    const key = notification.options && notification.options.key;

    store.dispatch({
        type: ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    });
};

export const closeSnackbar = (key) =>
    store.dispatch({
        type: CLOSE_SNACKBAR,
        dismissAll: !key,
        key,
    });

export const removeSnackbar = (key) =>
    store.dispatch({
        type: REMOVE_SNACKBAR,
        key,
    });
