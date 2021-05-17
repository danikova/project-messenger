import React from 'react';
import { Button, Toolbar } from 'react95';
import { useIntl } from 'react-intl';
import { ProfileInfo } from './ProfileInfo';

function CustomToolbar({ user }) {
    const intl = useIntl();
    return (
        <Toolbar>
            <Button variant='menu' size='sm'>
                File
            </Button>
            <Button variant='menu' size='sm'>
                Edit
            </Button>
            <Button variant='menu' size='sm' disabled>
                Save
            </Button>
        </Toolbar>
    );
}

export function SelfProfileInfo(props) {
    return <ProfileInfo {...props} Toolbar={CustomToolbar} />;
}
