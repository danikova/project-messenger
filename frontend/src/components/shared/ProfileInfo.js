import React from 'react';
import { Window, WindowContent } from 'react95';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { AvatarHolder } from './AvatarHolder';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../../store/actions/user.action';

const FloatingWindow = styled(Window)`
    min-width: 300px;
`;

const ProfilDataContainer = styled.div`
    display: flex;
`;

const AvatarWrapperGrid = styled.div`
    flex: 0 0 70px;
    * {
        font-size: 29px;
    }
`;

const NoWrapGrid = styled.div`
    flex-grow: 1;
    line-height: 20px;
    white-space: nowrap !important;
    margin-right: 25px;
    .data-abel {
        font-weight: bold;
    }
`;

export function ProfileInfo({ userId, Toolbar, ...props }) {
    const intl = useIntl();
    const users = useSelector((state) => state.users);

    let user = {};
    if (userId) {
        if (users[userId]) user = users[userId];
        else getUserInfo(userId);
    }

    return (
        <FloatingWindow>
            {Toolbar && <Toolbar user={user} />}
            <WindowContent>
                <ProfilDataContainer>
                    <AvatarWrapperGrid>
                        <AvatarHolder size={50} userId={user._id} />
                    </AvatarWrapperGrid>
                    <NoWrapGrid>
                        {user.username && (
                            <p>
                                <span className='data-abel'>username:</span>{' '}
                                {user.username}
                            </p>
                        )}
                        {user.email && (
                            <p>
                                <span className='data-abel'>email:</span>{' '}
                                {user.email}
                            </p>
                        )}
                    </NoWrapGrid>
                </ProfilDataContainer>
            </WindowContent>
        </FloatingWindow>
    );
}
