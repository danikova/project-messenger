export const FRONTEND_LOGIN_URL = `/authentication`;
export const FRONTEND_REGISTER_URL = `${FRONTEND_LOGIN_URL}/register`;

export const FRONTEND_CHATROOMS_URL = `/cr`;
export const FRONTEND_CHATROOMS_FOCUSED_WITH_MATCH_URL = `${FRONTEND_CHATROOMS_URL}/:roomId`;
export const FRONTEND_CHATROOMS_FOCUSED_URL = `${FRONTEND_CHATROOMS_URL}/{roomId}`;

export const FRONTEND_PROFILE_URL = `/profile`;
export const FRONTEND_PROFILE_SETTINGS_URL = `${FRONTEND_PROFILE_URL}/settings`;

export const API_AUTH_ROOT_URL = `/auth`;
export const API_LOGIN_URL = `${API_AUTH_ROOT_URL}/login`;
export const API_GOOGLE_LOGIN_URL = `${API_AUTH_ROOT_URL}/google-login`;
export const API_REGISTER_URL = `${API_AUTH_ROOT_URL}/register`;

export const API_ROOT_URL = `/api`;
export const API_ROOMS_URL = `${API_ROOT_URL}/rooms`;
export const API_ROOM_DETAIL_URL = `${API_ROOT_URL}/rooms/{roomId}`;
export const API_ROOM_DETAIL_MESSAGE_FROM_URL = `${API_ROOM_DETAIL_URL}/messages-from`;
export const API_ROOM_DETAIL_ADD_USER_URL = `${API_ROOM_DETAIL_URL}/add-user`;
export const API_ROOM_DETAIL_REMOVE_SELF_URL = `${API_ROOM_DETAIL_URL}/remove-self`;
export const API_USERS_URL = `${API_ROOT_URL}/users`;
export const API_USER_SELF_URL = `${API_USERS_URL}/self`;
export const API_USER_DETAIL_URL = `${API_USERS_URL}/{userId}`;

export const API_COMMUNICATION_SOCKET_URL = '/comm/socket';
