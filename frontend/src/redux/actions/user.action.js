import Axios from 'axios';

export const LOGIN_SUCCESS = 'api/user.login.success';
export const LOGIN_FAILURE = 'api/user.login.failure';

export async function loginWithCredentials(username, password) {
    return (dispatch) => {
        try {
            debugger;
            const resp = Axios({
                data: {
                    username,
                    password,
                },
            });
            dispatch({
                type: LOGIN_SUCCESS,
                data: { ...resp },
            });
        } catch (e) {
            dispatch({
                type: LOGIN_FAILURE,
            });
        }
    };
}
