import Axios from 'axios';
import { enqueueSnackbar } from '../store/actions/notifications.action';
import { logoutUser } from '../store/actions/user.action';

Axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const { data, status } = error.response;
        const { templateName, consoleLog } = (data && data.error) || {};
        if (templateName) enqueueSnackbar({ templateName });
        if (consoleLog) console.error(consoleLog);
        if (status === 401) logoutUser();
        return Promise.reject(error);
    },
);
