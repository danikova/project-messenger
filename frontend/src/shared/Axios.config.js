import Axios from 'axios';
import { logoutUser } from '../redux/actions/user.action';

Axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401) logoutUser();
        return Promise.reject(error);
    },
);
