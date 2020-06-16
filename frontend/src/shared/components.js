import React from 'react';
import styled from 'styled-components';
import { Button, Window, WindowHeader, WindowContent } from 'react95';
import { Grid } from '@material-ui/core';

export const MaxHeightGrid = styled(Grid)`
    height: 100%;
`;

export const MaxSizeFlexWindow = styled(Window)`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const FlexWindowHeader = styled(WindowHeader)`
    flex: 0 1;
`;

export const FlexWindowContent = styled(WindowContent)`
    flex: 1 1;
`;

const DialogBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
`;

const CenteredWindow = styled(Window)`
    z-index: 110;
    width: 500px;
    margin: auto;
    display: block;
    margin-top: 100px;
`;

export const Dialog = (props) => {
    return (
        <DialogBackground>
            <CenteredWindow style={{ width: 500 }}>
                <WindowHeader
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <span>{props.title}</span>
                    <Button
                        style={{ marginRight: '-6px', marginTop: '1px' }}
                        size={'sm'}
                        square
                        onClick={() =>
                            props.onCloseClick && props.onCloseClick()
                        }
                    >
                        <span
                            style={{
                                fontWeight: 'bold',
                                transform: 'translateY(-1px)',
                            }}
                        >
                            x
                        </span>
                    </Button>
                </WindowHeader>
                <WindowContent>{props.children}</WindowContent>
            </CenteredWindow>
        </DialogBackground>
    );
};
