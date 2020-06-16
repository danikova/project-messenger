import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants/user.constant';

export function user(
    state = {
        data: {},
        token: null,
    },
    action,
) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            const token = action.data.token;
            delete action.data.token;
            return {
                token,
                data: { ...action.data },
            };
        case LOGIN_FAILURE:
            return {};
        default:
            return state;
    }
}
