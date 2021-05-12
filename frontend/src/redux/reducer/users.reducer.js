import { GET_USER_SUCCESS } from '../constants/user.constant';

export function users(state = {}, action) {
    switch (action.type) {
        case GET_USER_SUCCESS:
            if (action.data._id)
                return {
                    ...state,
                    [action.data._id]: {
                        ...(state[action.data._id] || {}),
                        ...action.data,
                    },
                };
            return state;
        default:
            return state;
    }
}
