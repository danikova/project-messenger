import React from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { removeSnackbar } from '../../store/actions/notifications.action';
import { useIntl } from 'react-intl';

let displayed = [];

const Notifier = () => {
    const notifications = useSelector((store) => store.notifications || []);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const intl = useIntl();

    const storeDisplayed = (id) => {
        displayed = [...displayed, id];
    };

    const removeDisplayed = (id) => {
        displayed = [...displayed.filter((key) => id !== key)];
    };

    React.useEffect(() => {
        notifications.forEach(
            ({
                key,
                message,
                options = {},
                dismissed = false,
                templateName = null,
                templateVariables = {},
            }) => {
                if (dismissed) {
                    closeSnackbar(key);
                    return;
                }

                if (displayed.includes(key)) return;

                if (templateName)
                    try {
                        message = intl.formatMessage(
                            { id: templateName },
                            templateVariables,
                        );
                    } catch {}

                enqueueSnackbar(message, {
                    key,
                    ...options,
                    onClose: (event, reason, myKey) => {
                        if (options.onClose) {
                            options.onClose(event, reason, myKey);
                        }
                    },
                    onExited: (event, myKey) => {
                        removeSnackbar(myKey);
                        removeDisplayed(myKey);
                    },
                });
                storeDisplayed(key);
            },
        );
    }, [notifications, closeSnackbar, enqueueSnackbar, intl]);

    return null;
};

export default Notifier;
