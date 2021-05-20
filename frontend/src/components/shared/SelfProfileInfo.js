import React from 'react';
// import { Button, Toolbar } from 'react95';
import { ProfileInfo } from './ProfileInfo';

function CustomToolbar({ user }) {
    return (
        // <Toolbar>
        //     <Button variant='menu' size='sm'>
        //         File
        //     </Button>
        //     <Button variant='menu' size='sm'>
        //         Edit
        //     </Button>
        //     <Button variant='menu' size='sm' disabled>
        //         Save
        //     </Button>
        // </Toolbar>
        null
    );
}

export function SelfProfileInfo(props) {
    return <ProfileInfo {...props} Toolbar={CustomToolbar} />;
}
