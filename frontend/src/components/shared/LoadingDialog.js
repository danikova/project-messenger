import React, { useEffect, useState } from 'react';
import { Progress } from 'react95';
import { FormattedMessage } from 'react-intl';
import { Dialog } from './Dialog';


export function LoadingDialog() {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setPercent((previousPercent) => {
                if (previousPercent === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(previousPercent + diff, 100);
            });
        }, 500);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Dialog title='websocketConnection.exe'>
            <Progress variant='tile' value={Math.floor(percent)} />
            <h1>
                <FormattedMessage
                    id={'appbar.websocket.waitingForConnection.msg'} />
            </h1>
        </Dialog>
    );
}
