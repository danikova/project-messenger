import React from 'react';
import {
    Button,
    Window
} from 'react95';
import { closeSnackbar } from '../../store/actions/notifications.action';
import { DialogWindowHeader, MarginRightSpan, DialogCloseSpan } from './styled-components';


export function CustomSnackbar(props) {
    return (
        <Window>
            <DialogWindowHeader>
                <MarginRightSpan>{props.message}</MarginRightSpan>
                <Button
                    onClick={() => {
                        closeSnackbar(props.id);
                    }}
                >
                    <DialogCloseSpan>x</DialogCloseSpan>
                </Button>
            </DialogWindowHeader>
        </Window>
    );
}
