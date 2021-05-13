import React from 'react';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../../store/actions/user.action';


export function NameHolder({ userId = null, ...props }) {
    const users = useSelector((state) => state.users);

    let user = {};
    if (userId) {
        if (users[userId])
            user = users[userId];
        else
            getUserInfo(userId);
    }

    return <span {...props}>{user && user.username}</span>;
}
