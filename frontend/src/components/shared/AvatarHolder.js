import React from 'react';
import { Avatar } from 'react95';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../../store/actions/user.action';


export function AvatarHolder({ userId = null, ...props }) {
    const users = useSelector((state) => state.users);

    let user = {};
    if (userId) {
        if (users[userId])
            user = users[userId];
        else
            getUserInfo(userId);
    }

    const color = user.color || { primary: '#fff', secondary: '#000' };
    return (
        <Avatar
            size={33}
            style={{
                background: `#${color.primary}`,
                color: `#${color.secondary}`,
                textShadow: '-1px -1px 0 #595959, 1px -1px 0 #595959, -1px 1px 0 #595959, 1px 1px 0 #595959',
            }}
            src={user.imageUrl}
            {...props}
        >
            {user && user.username
                ? user.username.charAt(0).toUpperCase()
                : '...'}
        </Avatar>
    );
}
