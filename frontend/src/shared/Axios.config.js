import Axios from 'axios';
import { forgetUser } from '../redux/actions/user.action';

Axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401) forgetUser();
        return Promise.reject(error);
    },
);
